import { chromium } from "playwright";
import { selectMenu } from "./type";

require("dotenv").config();

export async function AutoBrowserOperation(
  attendance: {
    [key: string]: {
      startTime: string;
      endTime: string;
    };
  },
  envVar: {
    kotLoginId: string;
    kotLoginPassword: string;
  }
) {
  // 勤怠打刻画面のselect情報
  const selectMenu: selectMenu = {
    startWork: "1",
    endWork: "2",
    startRest: "3",
    endRest: "4",
  };

  const browser = await chromium.launch({ headless: false, slowMo: 500 });
  const page = await browser.newPage();

  // KOTのログイン処理
  await page.goto("https://s2.kingtime.jp/admin");
  await page.fill("#login_id", envVar.kotLoginId);
  await page.fill("#login_password", envVar.kotLoginPassword);
  await page.click("#login_button");

  // ログインに成功しているか判定
  if (!(await page.$(".htBlock-header_logoutButton"))) {
    throw new Error(
      `KOT Login failed\nlogin_id: ${process.env.KOT_LOGIN_ID}\nlogin_password: ${process.env.KOT_LOGIN_PASSWORD}`
    );
  }

  for (const property in attendance) {
    // 入力済みの出勤時刻を取得
    const displayEndWorkTime: string = await page
      .locator(`.start_end_timerecord >> nth=${Number(property) * 2 + 1}`)
      .innerText()
      .then((value) => {
        return value.replace("編 ", "").replace(":", "").trim();
      });
    // 入力済みの退勤時刻を取得
    const displayStartWorkTime: string = await page
      .locator(`.start_end_timerecord >> nth=${Number(property) * 2}`)
      .innerText()
      .then((value) => {
        return value.replace("編 ", "").replace(":", "").trim();
      });

    const matchStartWorkTime =
      displayStartWorkTime === attendance[property].startTime;
    const matchEndWorkTime =
      displayEndWorkTime === attendance[property].endTime;

    // 出勤時刻、退勤時刻がCSVと一致した場合は打刻編集画面への遷移は不要
    if (matchStartWorkTime && matchEndWorkTime) continue;

    // 打刻編集画面への遷移
    await page.click(`.htBlock-selectOther >> nth=${Number(property) - 1}`);
    await page
      .locator(`select >> nth=${property}`)
      .selectOption({ label: "打刻編集" });

    // 既に勤怠が入力済みの場合
    if ((await page.$$(".htBlock-checkboxL")).length > 0) {
      const fame = page.mainFrame();
      for (let n = 0; n <= 3; n++) {
        const inputValue = await fame.inputValue(
          `#recording_type_code >> nth=${n}`
        );

        // 休憩開始開始、終了時刻は際打刻はしない想定
        if (
          inputValue === selectMenu.startRest ||
          inputValue === selectMenu.endRest
        )
          continue;

        // 出勤時刻の入力
        if (inputValue === selectMenu.startWork) {
          // 入力済みの出勤時刻とCSVの出勤時刻が一致しない場合再入力
          if (!matchStartWorkTime) {
            //入力値をクリア
            await page.fill(`.recording_timestamp_time >> nth=${n}`, "");
            await page.fill(
              `.recording_timestamp_time >> nth=${n}`,
              attendance[property].startTime
            );
          }
        }

        // 退勤時刻の入力
        if (inputValue === selectMenu.endWork) {
          // 入力済みの退勤時刻とCSVの退勤時刻が一致しない場合再入力
          if (!matchEndWorkTime) {
            //入力値をクリア
            await page.fill(`.recording_timestamp_time >> nth=${n}`, "");
            await page.fill(
              `.recording_timestamp_time >> nth=${n}`,
              attendance[property].endTime
            );
          }
        }
      }

      // 打刻登録ボタンをクリック
      await page.click("#button_01 >> nth=1");
    } else {
      // 新たに勤怠を入力する場合
      // 出勤時刻の入力
      await page
        .locator("#recording_type_code_1")
        .selectOption({ label: "出勤" });
      await page.fill(
        "#recording_timestamp_time_1",
        attendance[property].startTime
      );

      // 退勤時刻の入力
      await page
        .locator("#recording_type_code_2")
        .selectOption({ label: "退勤" });
      await page.fill(
        "#recording_timestamp_time_2",
        attendance[property].endTime
      );

      // 休憩開始時刻の入力
      await page
        .locator("#recording_type_code_3")
        .selectOption({ label: "休憩開始" });
      await page.fill("#recording_timestamp_time_3", "1200");

      // 休憩終了時刻の入力
      await page
        .locator("#recording_type_code_4")
        .selectOption({ label: "休憩終了" });
      await page.fill("#recording_timestamp_time_4", "1300");

      // 打刻登録ボタンをクリック
      await page.click("#button_01 >> nth=1");
    }
  }

  await page.screenshot({ path: `result.png`, fullPage: true });

  await browser.close();
}
