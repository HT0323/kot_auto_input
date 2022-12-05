import { describe, it } from "mocha";
import { assert } from "chai"
import { csvParse } from "../csv_parse";

describe('【テストタイトル】csvParse関数を見るよ', () => {
    it('【テスト内容】本当にCSVファイル内の月末日までの勤怠情報を返す？', () => {
        assert.equal(csvParse("test/normal.csv", 31), {
          '3': { startTime: '1000', endTime: '1930' },
          '4': { startTime: '1000', endTime: '1930' },
          '5': { startTime: '1000', endTime: '1930' },
          '6': { startTime: '1000', endTime: '1930' },
          '7': { startTime: '1000', endTime: '1930' },
          '11': { startTime: '1000', endTime: '1930' },
          '12': { startTime: '1000', endTime: '1930' },
          '13': { startTime: '1000', endTime: '1930' },
          '14': { startTime: '1000', endTime: '1930' },
          '17': { startTime: '1000', endTime: '1930' },
          '18': { startTime: '1000', endTime: '1930' },
          '19': { startTime: '1000', endTime: '1900' },
          '20': { startTime: '1000', endTime: '1900' },
          '21': { startTime: '1000', endTime: '1900' },
          '24': { startTime: '1000', endTime: '1900' },
          '25': { startTime: '1000', endTime: '1900' },
          '26': { startTime: '1000', endTime: '1900' },
          '27': { startTime: '1000', endTime: '1930' },
          '28': { startTime: '1000', endTime: '1900' },
          '31': { startTime: '1000', endTime: '1900' }
        });
    });
})