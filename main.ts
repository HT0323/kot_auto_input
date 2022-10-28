import { chromium } from "playwright";

(async () => {
  const browser = await chromium.launch({ headless: false, slowMo: 500 });
  const page = await browser.newPage();

  // KOTのログイン処理
  await page.goto("https://s2.kingtime.jp/admin");
  await page.fill("#login_id", process.env.KOT_LOGIN_ID || "");
  await page.fill("#login_password", process.env.KOT_LOGIN_PASSWORD || "");
  await page.click("#login_button");
  await page.waitForTimeout(2000);

  // 打刻編集画面への遷移
  await page.click(".htBlock-selectOther >> nth=2");
  await page.locator("select >> nth=2").selectOption({ label: "打刻編集" });

  await page.waitForTimeout(4000);
  await page.screenshot({ path: `example.png` });

  await browser.close();
})();
