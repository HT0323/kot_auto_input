/*
The MIT License (MIT)

Copyright (c) 2022 HT0323

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

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
    const formattedAttendance = csvParse("input.csv", lastDate);
    // console.log(formattedAttendance);

    await AutoBrowserOperation(formattedAttendance, envVar);
  } catch (error) {
    console.log(`エラー発生 ${error}`);
    process.exit(1);
  }
}
main();
