import { AutoBrowserOperation } from "./auto_browser_operation";
import { checkEnvVar } from "./check_env";
import { csvParse } from "./csv_parse";
require("dotenv").config();

async function main() {
  try {
    const envVar = checkEnvVar();
    const forametedAttendance = csvParse("sample.csv");

    await AutoBrowserOperation(forametedAttendance, envVar);
  } catch (error) {
    console.log(`エラー発生 ${error}`);
    process.exit(1);
  }
}
main();
