import { webkit } from "playwright";

(async () => {
  const browser = await webkit.launch();
  const page = await browser.newPage();

  // KOTのログイン処理
  await page.goto("https://s2.kingtime.jp/admin");
  await page.fill("#login_id", process.env.KOT_LOGIN_ID || "");
  await page.fill("#login_password", process.env.KOT_LOGIN_PASSWORD || "");
  await page.click("#login_button");
  await page.waitForTimeout(5000);

  await page.screenshot({ path: `example.png` });
  await browser.close();
})();
