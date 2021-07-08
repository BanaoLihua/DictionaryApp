function doGet(e) {

let dataList = [];
//スクレイピングしたいWebページのURLを変数で定義する
let url = `https://ejje.weblio.jp/content/${e.parameter.word}`;

//URLに対しフェッチを行ってHTMLデータを取得する
let html = UrlFetchApp.fetch(url).getContentText();
//Parserライブラリを使用して条件を満たしたHTML要素を抽出する
let data = Parser.data(html)
.from('<div class=level0>')
.to('</div>')
.iterate();
//ログ出力でスクレイピング結果を表示する
console.log(data)
for (const content in data) {
  dataList.push(data[content].replace(/<("[^"]*"|'[^']*'|[^'">])*>/g,''));
}
const newDataList = dataList.map((word, key) => ({key, word}));
const json_data = JSON.stringify(newDataList);
console.log(json_data);

return ContentService.createTextOutput(json_data).setMimeType(ContentService.MimeType.JSON);;

}