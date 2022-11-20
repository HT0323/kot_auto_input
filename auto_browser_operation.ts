import { chromium } from "playwright";
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
    // 打刻編集画面への遷移
    await page.click(`.htBlock-selectOther >> nth=${Number(property) - 1}`);
    await page
      .locator(`select >> nth=${property}`)
      .selectOption({ label: "打刻編集" });

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

  await page.screenshot({ path: `result.png`, fullPage: true });

  await browser.close();
}
