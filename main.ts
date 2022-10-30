import { chromium } from "playwright";
require("dotenv").config();

(async () => {
  const browser = await chromium.launch({ headless: false, slowMo: 500 });
  const page = await browser.newPage();

  // KOTのログイン処理
  await page.goto("https://s2.kingtime.jp/admin");
  await page.fill("#login_id", process.env.KOT_LOGIN_ID || "");
  await page.fill("#login_password", process.env.KOT_LOGIN_PASSWORD || "");
  await page.click("#login_button");

  // 打刻編集画面への遷移
  await page.click(".htBlock-selectOther >> nth=3");
  await page.locator("select >> nth=4").selectOption({ label: "打刻編集" });

  // 出勤時刻の入力
  await page.locator("#recording_type_code_1").selectOption({ label: "出勤" });
  await page.fill("#recording_timestamp_time_1", "1000");

  // 退勤時刻の入力
  await page.locator("#recording_type_code_2").selectOption({ label: "退勤" });
  await page.fill("#recording_timestamp_time_2", "1900");

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

  await page.waitForTimeout(1000);
  await page.screenshot({ path: `example.png` });

  await browser.close();
})();
