const express = require('express');
const app = express();

const db = require('./modules/mysql_conn');


app.listen(8001, () => {
	console.log("http://localhost:8001");
});

app.get("/save", (req, res) => {
	var comment = req.query.comment;
	var wdate = new Date();
	var sql = "INSERT INTO sample SET comment=?, wdate=?";
	var values = [comment, wdate];
	db.conn.getConnection((err, connect) => {
		if(err) {
			res.send('에러가 발생하였습니다.');
		}
		else {
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
		}
	});
});

app.get("/delete", (req, res) => {
	var sql = "DELETE FROM sample WHERE id=?";
	var values = [req.query.id];
	db.conn.getConnection((err, connect) => {
		if(err) {
			console.log(err);
			res.send("DB 접속 오류가 발생했습니다.");
		}
		else {
			connect.query(sql, values, (err2, result) => {
				console.log(result);
				console.log(result.changedRows);
				if(result.affectedRows > 0) {
					res.send("데이터가 삭제되었습니다.");
					console.log(result);
					conn.release();
				}
				else {
					res.send("삭제가 실패했습니다.");
					console.log(err);
					conn.release();
				}
			});
		}
	});
});