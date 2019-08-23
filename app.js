const port = 8000;
// node modules 또는 우리가 만든 js 파일: Module
const express = require('express'); // express 모듈을 요청
const app = express();  // express 실행
const bodyParser = require('body-parser');

app.listen(port, () => {
  console.log("connected " + port);
});

// Routing 작업
// 정적 페이지 처리
app.use("/", express.static('./public/'));
app.use(bodyParser.urlencoded({extended: false}));


app.get("/test", (req, res) => {
  res.send(`<h1>Hello Node.js</h1>`);
});


// 동적페이지 - get - query방식
app.get("/test2", (req, res) => {
  var books = [
    {id: 1, bookName: "홍길동전", desc: "아버지를 아버지라..."},
    {id: 2, bookName: "별주부전", desc: "용왕이 나의 간을..."},
    {id: 3, bookName: "구운몽전", desc: "한 여름밤의 꿈..."}
  ];
  var id = req.query.id;  // 주소줄로 요청이 들어온 변수에 접근
  var bookName = books[id].bookName; 
  var desc = books[id].desc; 
  var html = `
  <!doctype html>
  <html>
    <head>
      <meta charset="utf-8">
      <title>도서정보: ${bookName}</title>
    </head>
    <body style="text-align: center;">
      <div>
        <h1>${bookName}</h1>
      </div>
      <div>
        <h3>${desc}</h3>
      </div>
    </body>
  </html>`;
  res.send(html);
});

// 동적페이지 - post - bodyParser가 필요함
app.post("/test_input", (req, res) => {
  var bookName = req.body.bookName;
  // 데이터베이스 저장
  res.send(`${bookName}이(가) 잘 저장되었습니다.`);
});


// 동적페이지 - get - sementic방식
