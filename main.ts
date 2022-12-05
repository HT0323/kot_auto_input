import { AutoBrowserOperation } from "./auto_browser_operation";
import { checkEnvVar } from "./check_env";
import { csvParse } from "./csv_parse";
require("dotenv").config();

async function main() {
  try {
    const envVar = checkEnvVar();
    // 当月の最終日を指定
    const jstDate = new Date();
    const lastDate = new Date(
      jstDate.getFullYear(),
      jstDate.getMonth() + 1,
      0
    ).getDate();
    const forametedAttendance = csvParse("sample.csv", lastDate);
    console.log(forametedAttendance);

    await AutoBrowserOperation(forametedAttendance, envVar);
  } catch (error) {
    console.log(`エラー発生 ${error}`);
    process.exit(1);
  }
}
main();
