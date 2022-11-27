// CSVファイルを読み込んだ際の情報
export type csvFormat = {
  '日付': string;
  '(曜日)': string;
  '開始時間': string;
  '終了時間': string;
  '休憩時間': string;
  '作業時間': string;
  '作業内容': string;
}[];

// 1日あたりの出勤時間情報
export type csvInputDay = {
  startTime: string;
  endTime: string;
}

// 1ヶ月あたりの出勤時間情報
export type csvInputMonth = {
  [key: string]: csvInputDay;
}
