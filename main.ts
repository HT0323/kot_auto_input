import { chromium } from "playwright";
require("dotenv").config();

(async () => {
  // 毎日の勤怠情報を保持する、今は固定値だがCSVファイルから読み込んだ値で作成できるようにする。
  let attendance: {
    /** 日付 */
    [key: string]: {
      /** 勤務開始時刻 */
      startTime: string;

      /** 勤務終了時刻 */
      endTime: string;
    };
  } = {
    "3": {
      startTime: "1000",
      endTime: "1930",
    },
    "4": {
      startTime: "1000",
      endTime: "1930",
    },
    "5": {
      startTime: "1000",
      endTime: "1930",
    },
    "6": {
      startTime: "1000",
      endTime: "1930",
    },
    "7": {
      startTime: "1000",
      endTime: "1930",
    },
    "11": {
      startTime: "1000",
      endTime: "1930",
    },
    "12": {
      startTime: "1000",
      endTime: "1930",
    },
    "13": {
      startTime: "1000",
      endTime: "1930",
    },
    "14": {
      startTime: "1000",
      endTime: "1930",
    },
    "17": {
      startTime: "1000",
      endTime: "1930",
    },
    "18": {
      startTime: "1000",
      endTime: "1930",
    },
    "19": {
      startTime: "1000",
      endTime: "1900",
    },
    "20": {
      startTime: "1000",
      endTime: "1900",
    },
    "21": {
      startTime: "1000",
      endTime: "1900",
    },
    "24": {
      startTime: "1000",
      endTime: "1900",
    },
    "25": {
      startTime: "1000",
      endTime: "1900",
    },
    "26": {
      startTime: "1000",
      endTime: "1900",
    },
    "27": {
      startTime: "1000",
      endTime: "1930",
    },
    "28": {
      startTime: "1000",
      endTime: "1900",
    },
    "31": {
      startTime: "1000",
      endTime: "1900",
    },
  };

  const browser = await chromium.launch({ headless: false, slowMo: 500 });
  const page = await browser.newPage();

  // KOTのログイン処理
  await page.goto("https://s2.kingtime.jp/admin");
  await page.fill("#login_id", process.env.KOT_LOGIN_ID || "");
  await page.fill("#login_password", process.env.KOT_LOGIN_PASSWORD || "");
  await page.click("#login_button");

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

  await page.screenshot({ path: `example.png` });

  await browser.close();
})();
