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

[Demonstration video](https://user-images.githubusercontent.com/30143121/209460736-1133db27-6d16-454b-ab06-88582105efb3.mp4
)

# Requirement

▶︎　Node.js<br>
▶︎　Playwright<br>
▶︎　Mocha<br>

# Setup

The following procedure summarizes the preparations and preparations in advance<br>

1. Move this repository to your preferred working directory and git clone

2. Install modules to run the cloned code

``` bash
npm install
```

3. Create a `.env` file with the information necessary for your login with 'KING OF TIME' and set environment variables

   3-1. Copy `.env.example` to create `.env` file

   3-2. Add your 'KING OF TIME' login account information to `KOT_LOGIN_ID` and `KOT_LOGIN_PASSWORD` in the copied `.env` file

4. Output the separately managed attendance management file (a file containing attendance hours etc. outside the company) in CSV format <br>
   *If the format of your attendance report and the format do not match, there are examples on the `Wiki` tab in this GitHub, so please use that.

5. If you can match the format, change the CSV file name to `sample.csv`

6. Place the CSV file of 5. directly under the cloned PJ (directly under the `kot_auto_input` directory)

Now that the preparations have been completed, please proceed with the `Usage` item. <br>

---

事前に準備、用意する内容を以下の手順でまとめました <br>

1. このリポジトリをあなたの好きな作業ディレクトリに移動した後 `git clone` します

2. クローンしたコードを動かすためのモジュールをインストールします

```bash
npm install
```

3. 'KING OF TIME'でご自身のログインに必要な情報を `.env` ファイルを作成後、環境変数を設定します

    3-1. `.env.example` をコピーして `.env` ファイルを作成します

    3-2. コピーした `.env` ファイルの `KOT_LOGIN_ID` , `KOT_LOGIN_PASSWORD` に自身の 'KING OF TIME' のログインアカウント情報を加えます

4. 別で管理している勤怠管理のファイル(自社以外で出勤時間などを記入しているファイル)をCSV形式で出力します <br>
  ※もし、お手持ちの勤怠報告書とフォーマットが大きくずれて合わない場合には、このGitHub内の`Wiki`タブに例を載せていますのでそちらをご使用ください

5. フォーマットを合わせることができましたら、CSVのファイル名を `sample.csv` に変更してください

6. 5.のCSVファイルをクローンしたPJ直下(`kot_auto_input`ディレクトリ直下)に配置してください

以上で事前に準備する内容は完了ですので `Usage` の項目を実施してください。 <br>
# Usage

```bash
npx ts-node main.ts
```

# License
MIT