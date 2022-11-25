import { readFileSync } from 'fs';
import { parse } from 'csv-parse/sync';

// csvファイルの内容を読み込み
const targetData = readFileSync('sample.csv', {encoding: 'utf-8'});

// csvファイルをパース
const targetRecords = parse(targetData, {from_line: 8, columns: true});

// 結果の表示
for (const targetRecord of targetRecords) {
    console.log(targetRecord);
}


/* 
{
  '日付': '3',
  '(曜日)': '月',
  '開始時間': '10:00',
  '終了時間': '19:30',
  '休憩時間': '1:00',
  '作業時間': '8:30',
  '作業内容': 'FooBar',
  '': ''
}
*/