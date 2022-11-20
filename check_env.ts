/** 環境変数を未定義かチェックする*/
export const checkEnvVar = (): {
  kotLoginId: string;
  kotLoginPassword: string;
} => {
  const kotLoginId = process.env.KOT_LOGIN_ID || "";
  const kotLoginPassword = process.env.KOT_LOGIN_PASSWORD || "";

  if (!(kotLoginId !== "" && kotLoginPassword !== "")) {
    throw new Error(
      "undefined KOT_LOGIN_ID & KOT_LOGIN_PASSWORD environment variable"
    );
  }

  return { kotLoginId: kotLoginId, kotLoginPassword: kotLoginPassword };
};
