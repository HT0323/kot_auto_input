# kot_auto_input

KOT(KING OF TIME)の勤怠入力を手動で入力するのが煩わしので自動で勤怠を入力できるようにしました。

# Requirement

- Node.js

# Setup

1. cloen 後にモジュールをインストール

```bash
npm install
```

2. 環境変数の設定

   .env.example をコピーし.env ファイルを作成する。

   コピーした.env ファイルの KOT_LOGIN_ID, KOT_LOGIN_PASSWORD に自身の KOT のログインアカウント情報を加える。

# Usage

```bash
npx ts-node main.ts
```
