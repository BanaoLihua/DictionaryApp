function doGet(e) {

let dataList = [];
//スクレイピングしたいWebページのURLを変数で定義する
let url = `https://www.ctrans.org/search.php?word=${e.parameter.word}`;

//URLに対しフェッチを行ってHTMLデータを取得する
let html = UrlFetchApp.fetch(url).getContentText();
//Parserライブラリを使用して条件を満たしたHTML要素を抽出する
let data = Parser.data(html)
.from('<span class="pyn">')
.to('</span>')
.build();
//ログ出力でスクレイピング結果を表示する
for (const content in data) {
  dataList.push(data[content].replace(/<("[^"]*"|'[^']*'|[^'">])*>/g,''));
}
const dataListText = dataList.join('');
console.log(dataListText)

return ContentService.createTextOutput(dataListText).setMimeType(ContentService.MimeType.TEXT);;

}