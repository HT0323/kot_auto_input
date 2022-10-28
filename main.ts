import { webkit } from 'playwright'

(async () => {
  const browser = await webkit.launch()
  const page = await browser.newPage()
  await page.goto('https://s2.kingtime.jp/admin')
  await page.screenshot({ path: `example.png` })
  await browser.close()
})()
