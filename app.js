const port = 8000;
// node modules 또는 우리가 만든 js 파일: Module
const express = require('express'); // express 모듈을 요청
const app = express();  // express 실행
const bodyParser = require('body-parser');  // post방식의 요청시 body를 해석하는 모듈
const db = require("./modules/mysql_conn");
const util = require("./modules/util");

// 서버를 실행한다.
app.listen(port, () => {
  console.log("connected " + port);
  console.log("http://localhost:8000");
});

// 정적 페이지 처리 및 초기 셋팅
app.set("view engine", "pug");  // pug를 view template engine 으로 지정
app.set("views", "./views");    // pug 파일이 존재하는 폴더를 지정
app.use("/", express.static('./public/'));   // 정적 html 파일 루트 지정
app.use(bodyParser.urlencoded({extended: false}));
app.locals.pretty = true; // res tag가 줄맞춤 되어 보이게 함


// Routing 작업
app.get("/test", (req, res) => {
  id = req.query.id;
  // 조건 ? 참일때 : 거짓일때 - 삼항조건문
  id ? res.send(`<h1>Hello Node.js</h1>`) : res.send(`<h1 style="color: red;">Require [id]</h1>`);
  /*
  if(id == "0") res.send(`<h1>Hello Node.js</h1>`);
  else res.send(`<h1 style="color: red;">Require [id]</h1>`);
  */
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
app.get(["/book", "/book/:id"], (req, res) => {
  var books = [
    {id: 1, bookName: "홍길동전", desc: "아버지를 아버지라..."},
    {id: 2, bookName: "별주부전", desc: "용왕이 나의 간을..."},
    {id: 3, bookName: "구운몽전", desc: "한 여름밤의 꿈..."}
  ];
  // req.query.id   -> get /book?id=1
  // req.body.id    -> post /book id=1
  // req.params.id  -> get /book/1
  var id = req.params.id;
  var vals = {
    bookName: books[id].bookName,
    sample: ["one", "two", "three", "four"]
  };
  res.render("sample", vals);
});

// view engine - gen coding (emmet)
// jade -> pug, ejs(jsp), jsx(react)

app.get("/include", (req, res) => {
  var sendValues = {
    docTitle: "Include 샘플페이지",
    cssName: "include"
  }
  res.render("include", sendValues);
});
/*
// Callback 버전
app.post("/board_save", (req, res) => {
  var comment = req.body.comment;
  var sql = "INSERT INTO sample SET comment=?, wdate=?";
  var d = new Date();
  var values = [comment, d];
  db.conn.getConnection((err, connect) => {
    if(err) res.send("접속이 실패했습니다.")
    else {
      connect.query(sql, values, (err, result) => {
        connect.release();
        if(err) res.send("에러가 발생했습니다.")
        else res.redirect("/board_list");
      });
    }
  });
});
*/

// async await
// async function sqlExec() { - 함수선언문
const sqlExec = async (sql, vals) => {
  const connect = await db.conn.getConnection(async a => a);
  const data = await connect.query(sql, vals);
  connect.release();
  return data;
}
app.post("/board_save", (req, res) => {
  const comment = req.body.comment;
  const sql = "INSERT INTO sample SET comment=?, wdate=?";
  const vals = [comment, util.dtChg(new Date())];
  sqlExec(sql, vals).then(data => {
    res.send(data);
    //res.redirect("/board_list");
  }).catch(data => {
    res.send(data);
  });
});


app.get("/board_list", (req, res) => {
  var sql = "SELECT * FROM sample ORDER BY id DESC";
  db.conn.getConnection((err, connect) => {
    if(err) res.send("에러가 발생했습니다.");
    else {
      connect.query(sql, (err, result) => {
        connect.release();
        if(err) res.send("에러가 발생했습니다.");
        else {
          // 2019-08-29 22:10:11
          var saveResult = [];
          var tmp = {};
          for(var v of result) {
            tmp = {};
            tmp.id = v.id;
            tmp.comment = v.comment;
            tmp.wdate = util.dtChg(new Date(v.wdate));
            saveResult.push(tmp);
          }
          var sendData = {board: saveResult};
          res.render("board_list", sendData);
        }
      });
    }
  });
});