import { chromium } from "playwright";
import { KotPage } from "./pageObject/kot_page";
import { csvInputMonth, kotAccountInfo, selectMenu } from "./type";

require("dotenv").config();

export async function AutoBrowserOperation(
  attendance: csvInputMonth,
  envVar: kotAccountInfo
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
  const kotPage = new KotPage(page);

  // 画面遷移
  await kotPage.goto();

  // KOTのログイン処理
  await kotPage.login(envVar);

  // ログインに成功しているか判定
  const isLogin = await kotPage.loginCheck();
  if (!isLogin) {
    throw new Error(
      `KOT Login failed\nlogin_id: ${envVar.kotLoginId}\nlogin_password: ${envVar.kotLoginPassword}`
    );
  }

  for (const property in attendance) {
    // 入力済みの出勤時刻を取得
    const displayEndWorkTime: string = await kotPage.getStartWorkTime(property);

    // 入力済みの退勤時刻を取得
    const displayStartWorkTime: string = await kotPage.getEndWorkTime(property);

    const matchStartWorkTime =
      displayStartWorkTime === attendance[property].startTime;
    const matchEndWorkTime =
      displayEndWorkTime === attendance[property].endTime;

    // 出勤時刻、退勤時刻がCSVと一致した場合は打刻編集画面への遷移は不要
    if (matchStartWorkTime && matchEndWorkTime) continue;

    // 打刻編集画面への遷移
    await kotPage.moveEditEngraving(property);

    // 打刻削除ボタンが存在するかチェック
    const isDeleteEngravingButton = await kotPage.deleteEngravingButtonCheck();

    // 既に勤怠が入力済みの場合(打刻削除ボタンが存在する)
    if (isDeleteEngravingButton) {
      for (let n = 0; n <= 3; n++) {
        const inputValue = await kotPage.getSelectInput(n);

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
            await kotPage.reInputStartEndWorkTime(
              n,
              attendance[property].startTime
            );
          }
        }

        // 退勤時刻の入力
        if (inputValue === selectMenu.endWork) {
          // 入力済みの退勤時刻とCSVの退勤時刻が一致しない場合再入力
          if (!matchEndWorkTime) {
            await kotPage.reInputStartEndWorkTime(
              n,
              attendance[property].endTime
            );
          }
        }
      }

      // 打刻登録ボタンをクリック
      await kotPage.clickRecordingRegister();
    } else {
      // 新たに勤怠を入力する場合
      // 出勤時刻の入力
      await kotPage.inputStartWorkTime(attendance[property].startTime);

      // 退勤時刻の入力
      await kotPage.inputEndWorkTime(attendance[property].endTime);

      // 休憩開始時刻の入力
      await kotPage.inputStartRestTime();

      // 休憩終了時刻の入力
      await kotPage.inputEndResetTime();

      // 打刻登録ボタンをクリック
      await kotPage.clickRecordingRegister();
    }
  }

  await page.screenshot({ path: `result.png`, fullPage: true });
  await browser.close();
}
