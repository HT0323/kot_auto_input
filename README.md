[![Open in Visual Studio Code](https://img.shields.io/static/v1?logo=visualstudiocode&label=&message=Open%20in%20Visual%20Studio%20Code&labelColor=2c2c32&color=007acc&logoColor=007acc)](https://open.vscode.dev/HT0323/kot_auto_input)
[![Prettier And Test](https://github.com/HT0323/kot_auto_input/actions/workflows/main.yml/badge.svg)](https://github.com/HT0323/kot_auto_input/actions/workflows/main.yml)
[![npm version](https://img.shields.io/npm/v/npm.svg)](https://npm.im/npm)


<img align="right" width="159px" src="https://user-images.githubusercontent.com/30143121/199495713-1889f27a-efd5-4a07-aec9-5af8c7921aef.gif">

#  AUTO KING OF TIME

You don't want to manage double attendance management, do you? <br>
If your company's attendance management tool is "KING OF TIME", you may be able to solve it with this tool. <br>

---

勤怠管理を二重に管理をしていないでしょうか？ <br>
あなたの会社の勤怠管理ツールが「KING OF TIME」なら、このツールで解決できるかもしれません。 <br>

# Description

Reports that require daily, weekly and monthly input. <br>

common for SES engineers <br>
In many cases, there are separate attendance management methods for the site and the company <br>
In addition, there may even be separate submission methods. <br>

Such trivial problems in the company <br>
I am creating this tool in the hope that it will be of some help. <br>

---

毎日、毎週、毎月入力が必要な報告書。<br>

SESエンジニアにとってはよくある<br>
現場と自社で別々の勤怠管理方法であることが多く<br>
更には別々の提出方法が存在することさえあります。<br>

そんな社内でのささいな問題を<br>
このツールが少しでも役に立てればと思い作成しています。<br>

# Demo

[デモ動画](https://user-images.githubusercontent.com/30143121/209460736-1133db27-6d16-454b-ab06-88582105efb3.mp4
)

# Requirement

▶︎　Node.js<br>
▶︎　Playwright<br>
▶︎　Mocha<br>

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