const express = require('express');
const app = express();

const db = require('./modules/mysql_conn');


app.listen(8000, () => {
	console.log("http://localhost:8000");
});

app.get("/save", (req, res) => {
	var comment = req.query.comment;
	var wdate = new Date();
	var sql = "INSERT INTO sample SET comment=?, wdate=?";
	var values = [comment, wdate];
	db.conn.getConnection((err, connect) => {
		connect.query(sql, values, (err, result) => {
			if(err) {
				connect.release();
				res.send("에러가 발생하였습니다.");
			}
			else {
				connect.release();
				res.send("데이터가 저장되었습니다.");
			}
		})
	});
});