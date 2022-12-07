import { Frame, Locator, Page } from "@playwright/test";
import { kotAccountInfo } from "../type";

export class TodoPage {
  readonly page: Page;
  readonly frame: Frame;
  readonly loginIdArea: Locator;
  readonly loginPasswordArea: Locator;
  readonly loginButton: Locator;
  readonly logoutButton: Locator;
  readonly startEndWorkTime: Locator;
  readonly selectMenu: Locator;
  readonly recordingType: Locator;
  readonly recordingTimeStamp: Locator;
  readonly recordingRegister: Locator;
  readonly startWorkArea: Locator;
  readonly startWorkTimeArea: Locator;

  readonly endWorkArea: Locator;
  readonly endWorkTimeArea: Locator;
  readonly startResetArea: Locator;
  readonly startResetTimeArea: Locator;
  readonly endResetArea: Locator;
  readonly endResetTimeArea: Locator;

  constructor(page: Page) {
    this.page = page;
    this.frame = page.mainFrame();
    this.loginIdArea = page.locator("#login_id");
    this.loginPasswordArea = page.locator("#login_password");
    this.loginButton = page.locator("#login_button");
    this.logoutButton = page.locator(".htBlock-header_logoutButton");
    this.startEndWorkTime = page.locator(".start_end_timerecord");
    this.selectMenu = page.locator(".htBlock-selectOther");
    this.recordingType = this.frame.locator("#recording_type_code");
    this.recordingTimeStamp = page.locator(".recording_timestamp_time");
    this.recordingRegister = page.locator("#button_01 >> nth=1");
    this.startWorkArea = page.locator("#recording_type_code_1");
    this.startWorkTimeArea = page.locator("#recording_timestamp_time_1");
    this.endWorkArea = page.locator("#recording_type_code_2");
    this.endWorkTimeArea = page.locator("#recording_timestamp_time_2");
    this.startResetArea = page.locator("#recording_type_code_3");
    this.startResetTimeArea = page.locator("#recording_timestamp_time_3");
    this.endResetArea = page.locator("#recording_type_code_4");
    this.endResetTimeArea = page.locator("#recording_timestamp_time_4");
  }

  // 対象のページへ遷移
  async goto() {
    await this.page.goto("https://s2.kingtime.jp/admin");
  }

  // ログイン
  async login(envVar: kotAccountInfo) {
    await this.loginIdArea.fill(envVar.kotLoginId);
    await this.loginPasswordArea.fill(envVar.kotLoginPassword);
    await this.loginButton.click();
  }

  // ログインチェック
  async loginCheck(envVar: kotAccountInfo): Promise<boolean> {
    const innerTexts = await this.logoutButton.allInnerTexts();
    return !!innerTexts.length;
  }

  // 勤務開始時刻の取得
  async getStartWorkTime(day: string): Promise<string> {
    const displayEndWorkTime: string = await this.startEndWorkTime
      .nth(Number(day) * 2 + 1)
      .innerText()
      .then((value: string) => {
        return value.replace("編 ", "").replace(":", "").trim();
      });
    return displayEndWorkTime;
  }

  // 勤務終了時刻の取得
  async getEndWorkTime(day: string): Promise<string> {
    const displayEndWorkTime: string = await this.startEndWorkTime
      .nth(Number(day) * 2)
      .innerText()
      .then((value: string) => {
        return value.replace("編 ", "").replace(":", "").trim();
      });
    return displayEndWorkTime;
  }

  // 打刻編集画面に遷移
  async moveEditEngraving(day: string) {
    await this.selectMenu.nth(Number(day) - 1).click();
    await this.page
      .locator(`select >> nth=${day}`)
      .selectOption({ label: "打刻編集" });
  }

  // セレクトの選択されている値を取得
  async getSelectInput(selectMenuIndex: number): Promise<string> {
    const inputValue = await this.recordingType
      .nth(selectMenuIndex)
      .inputValue();
    return inputValue;
  }

  // 出勤、退勤時刻を再入力
  async reInputStartEndWorkTime(selectMenuIndex: number, workTime: string) {
    //入力値をクリア
    this.recordingTimeStamp.nth(selectMenuIndex).fill("");
    this.recordingTimeStamp.nth(selectMenuIndex).fill(workTime);
  }

  // 打刻登録
  async clickRecordingRegister() {
    await this.recordingRegister.click();
  }

  // 出勤時刻の入力
  async inputStartWorkTime(workTime: string) {
    await this.startWorkArea.selectOption({ label: "出勤" });
    await this.startWorkTimeArea.fill(workTime);
  }

  // 退勤時刻の入力
  async inputEndWorkTime(workTime: string) {
    await this.endWorkArea.selectOption({ label: "退勤" });
    await this.endWorkTimeArea.fill(workTime);
  }

  // 休憩開始時刻の入力
  async inputStartRestTime() {
    await this.startResetArea.selectOption({ label: "休憩開始" });
    await this.startResetTimeArea.fill("1200");
  }

  // 休憩終了時刻の入力
  async inputEndResetTime() {
    await this.endResetArea.selectOption({ label: "休憩終了" });
    await this.endResetTimeArea.fill("1300");
  }
}
