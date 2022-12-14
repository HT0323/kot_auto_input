import { Frame, Locator, Page } from "@playwright/test";
import { kotAccountInfo } from "../type";

export class KotPage {
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
  readonly inputtedArea: Locator;

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
    this.inputtedArea = page.locator(".htBlock-checkboxL");
  }

  /** ??????????????????????????? */
  async goto() {
    await this.page.goto("https://s2.kingtime.jp/admin");
  }

  /** ???????????? */
  async login(envVar: kotAccountInfo) {
    await this.loginIdArea.fill(envVar.kotLoginId);
    await this.loginPasswordArea.fill(envVar.kotLoginPassword);
    await this.loginButton.click();
  }

  /** ???????????????????????? */
  async loginCheck(): Promise<boolean> {
    const innerTexts = await this.logoutButton.allInnerTexts();
    return !!innerTexts.length;
  }

  /** ??????????????????????????? */
  async getStartWorkTime(day: string): Promise<string> {
    const displayEndWorkTime: string = await this.startEndWorkTime
      .nth(Number(day) * 2 + 1)
      .innerText()
      .then((value: string) => {
        return value.replace("??? ", "").replace(":", "").trim();
      });
    return displayEndWorkTime;
  }

  /** ??????????????????????????? */
  async getEndWorkTime(day: string): Promise<string> {
    const displayEndWorkTime: string = await this.startEndWorkTime
      .nth(Number(day) * 2)
      .innerText()
      .then((value: string) => {
        return value.replace("??? ", "").replace(":", "").trim();
      });
    return displayEndWorkTime;
  }

  /** ??????????????????????????? */
  async moveEditEngraving(day: string) {
    await this.selectMenu.nth(Number(day) - 1).click();
    await this.page
      .locator(`select >> nth=${day}`)
      .selectOption({ label: "????????????" });
  }

  /** ???????????????????????????????????????????????? */
  async getSelectInput(selectMenuIndex: number): Promise<string> {
    const inputValue = await this.recordingType
      .nth(selectMenuIndex)
      .inputValue();
    return inputValue;
  }

  /** ????????????????????????????????? */
  async reInputStartEndWorkTime(selectMenuIndex: number, workTime: string) {
    //?????????????????????
    this.recordingTimeStamp.nth(selectMenuIndex).fill("");
    this.recordingTimeStamp.nth(selectMenuIndex).fill(workTime);
  }

  /** ???????????? */
  async clickRecordingRegister() {
    await this.recordingRegister.click();
  }

  /** ?????????????????????????????? */
  async inputStartWorkTime(workTime: string) {
    await this.startWorkArea.selectOption({ label: "??????" });
    await this.startWorkTimeArea.fill(workTime);
  }

  /** ?????????????????????????????? */
  async inputEndWorkTime(workTime: string) {
    await this.endWorkArea.selectOption({ label: "??????" });
    await this.endWorkTimeArea.fill(workTime);
  }

  /** ???????????????????????????????????? */
  async inputStartRestTime() {
    await this.startResetArea.selectOption({ label: "????????????" });
    await this.startResetTimeArea.fill("1200");
  }

  /** ???????????????????????????????????? */
  async inputEndResetTime() {
    await this.endResetArea.selectOption({ label: "????????????" });
    await this.endResetTimeArea.fill("1300");
  }

  /**?????????????????????????????????????????????????????? */
  async deleteEngravingButtonCheck(): Promise<number> {
    const existInputtedArea = await this.inputtedArea.count();
    return existInputtedArea;
  }
}
