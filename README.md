[![Open in Visual Studio Code](https://img.shields.io/static/v1?logo=visualstudiocode&label=&message=Open%20in%20Visual%20Studio%20Code&labelColor=2c2c32&color=007acc&logoColor=007acc)](https://open.vscode.dev/HT0323/kot_auto_input)
[![Prettier And Test](https://github.com/HT0323/kot_auto_input/actions/workflows/main.yml/badge.svg)](https://github.com/HT0323/kot_auto_input/actions/workflows/main.yml)



<img align="right" width="159px" src="https://user-images.githubusercontent.com/30143121/199495713-1889f27a-efd5-4a07-aec9-5af8c7921aef.gif">

# kot_auto_input

KOT(KING OF TIME)の勤怠入力を手動で入力するのが煩わしいので自動で勤怠を入力できるようにしました。

# Requirement

- Node.js

# Setup

1. git clone 後にモジュールをインストール

```bash
npm install
```

2. 環境変数の設定

   `.env.example` をコピーし `.env` ファイルを作成する。

   コピーした `.env` ファイルの `KOT_LOGIN_ID` , `KOT_LOGIN_PASSWORD` に自身の `KOT` のログインアカウント情報を加える。

# Usage

```bash
npx ts-node main.ts
```

# License
MIT