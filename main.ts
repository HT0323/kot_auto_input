import { AutoBrowserOperation } from "./auto_browser_operation";
require("dotenv").config();

async function main() {
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
    // "4": {
    //   startTime: "1000",
    //   endTime: "1930",
    // },
    // "5": {
    //   startTime: "1000",
    //   endTime: "1930",
    // },
    // "6": {
    //   startTime: "1000",
    //   endTime: "1930",
    // },
    // "7": {
    //   startTime: "1000",
    //   endTime: "1930",
    // },
    // "11": {
    //   startTime: "1000",
    //   endTime: "1930",
    // },
    // "12": {
    //   startTime: "1000",
    //   endTime: "1930",
    // },
    // "13": {
    //   startTime: "1000",
    //   endTime: "1930",
    // },
    // "14": {
    //   startTime: "1000",
    //   endTime: "1930",
    // },
    // "17": {
    //   startTime: "1000",
    //   endTime: "1930",
    // },
    // "18": {
    //   startTime: "1000",
    //   endTime: "1930",
    // },
    // "19": {
    //   startTime: "1000",
    //   endTime: "1900",
    // },
    // "20": {
    //   startTime: "1000",
    //   endTime: "1900",
    // },
    // "21": {
    //   startTime: "1000",
    //   endTime: "1900",
    // },
    // "24": {
    //   startTime: "1000",
    //   endTime: "1900",
    // },
    // "25": {
    //   startTime: "1000",
    //   endTime: "1900",
    // },
    // "26": {
    //   startTime: "1000",
    //   endTime: "1900",
    // },
    // "27": {
    //   startTime: "1000",
    //   endTime: "1930",
    // },
    // "28": {
    //   startTime: "1000",
    //   endTime: "1900",
    // },
    // "31": {
    //   startTime: "1000",
    //   endTime: "1900",
    // },
  };

       await AutoBrowserOperation(attendance);
}
main();
