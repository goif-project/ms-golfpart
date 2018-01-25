## 変更箇所

* index.pug → page3.pug
* page1.pug,page2.pugの追加
* page1,page2のcss,jsの追加
* app.jsの追加記入
（agoを最後に読み込まないとpage1とかでエラーをはく）

## 流れ

1. page1.htmlでスタート！
2. page2.htmlでキャラ選択
3. page3.htmlでゴルフ（page2のキャラ選番号はpostできる）
4. page4.html(name.html)で名前入力(hiddenとかでスコア保存？？) ← 未作成
5. 名前・スコアをデータベースに登録 ← node-expressにて作成中。。。
6. score.htmlで結果・ランキング表示 ← node-expressにて作成中。。。

## 0107追加
`npm start`のwebで見るとindexの画像が表示されない
→移行するmonacaには画像があるので、大丈夫！！
[monaca追加済みgithub](https://github.com/goif-project/monaca-golf-play)

tsts
