[![Open in Visual Studio Code](https://img.shields.io/static/v1?logo=visualstudiocode&label=&message=Open%20in%20Visual%20Studio%20Code&labelColor=2c2c32&color=007acc&logoColor=007acc)](https://open.vscode.dev/HT0323/kot_auto_input)
[![Prettier And Test](https://github.com/HT0323/kot_auto_input/actions/workflows/main.yml/badge.svg)](https://github.com/HT0323/kot_auto_input/actions/workflows/main.yml)
[![npm version](https://img.shields.io/npm/v/npm.svg)](https://npm.im/npm)


<img align="right" width="159px" src="https://user-images.githubusercontent.com/30143121/199495713-1889f27a-efd5-4a07-aec9-5af8c7921aef.gif">

#  AUTO KING OF TIME

Do you want to do something about the double management of attendance reports?<br>
If your attendance management tool is KING OF TIME, this tool may be the solution.

勤怠報告書の二重管理を何とかしたいと思いませんか？<br>
勤怠管理ツールが「KING OF TIME」なら、このツールで解決できるかもしれません。<br>

# Description
毎日、毎週、毎月入力が必要な報告書。<br>

SESエンジニアにとってはよくある<br>
現場と自社で別々の勤怠管理方法であることが多く<br>
更には別々の提出方法が存在することさえあります。<br>

そんな社内でのささいな問題を<br>
このツールが少しでも役に立てればと思い作成しています。<br>

# Demo


# Requirement

▶︎　Node.js
▶︎　Playwright
▶︎　Mocha

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