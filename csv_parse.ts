import { readFileSync } from "fs";
import { parse } from "csv-parse/sync";
import { csvFormat, csvInputDay, csvInputMonth } from "./type";

export const csvParse = (fileName: string, lastDate: number): csvInputMonth => {
  // CSVファイルのパース開始行を指定
  const startLine = 8;

  // csvファイルの内容を読み込み
  const targetData = readFileSync(fileName, { encoding: "utf-8" });

  // csvファイルをパース
  const targetRecords: csvFormat = parse(targetData, {
    from_line: startLine,
    to_line: startLine + lastDate,
    columns: true,
  });

  // オブジェクトを空のオブジェクトに詰めていく
  const kotInputMonth: csvInputMonth = {};

  // CSVの情報をKOTに入力する情報に変換して代入していく
  for (const targetRecord of targetRecords) {
    // 出勤した日だけを作成したいため、開始と終了の時間両方が入っているものにフィルタ
    if (targetRecord["開始時間"] === "" || targetRecord["終了時間"] === "")
      continue;
    const kotInputDay: csvInputDay = {
      startTime: targetRecord["開始時間"].replace(":", ""),
      endTime: targetRecord["終了時間"].replace(":", ""),
    };
    kotInputMonth[targetRecord["日付"]] = kotInputDay;
  }
  return kotInputMonth;
};
