/*
// mysql버전 - async/await 안되는 callback 버전
const mysql = require('mysql');
const conn = mysql.createPool({
	host: "localhost",
	user: "root",
	password: "000000",
	port: 3306,
	database: "scjs",
	connectionLimit: 10
});

module.exports = {
	mysql,
	conn
}
*/

// async/await 버전
const mysql = require('mysql2/promise');
const conn = mysql.createPool({
	host: "localhost",
	user: "root",
	password: "000000",
	port: 3306,
	database: "scjs",
	connectionLimit: 10,
	waitForConnections: true,
	queueLimit: 0
});

// async await
// async function sqlExec() { - 함수선언문
const sqlExec = async (sql, vals) => {
  const connect = await conn.getConnection(async a => a);
  const data = await connect.query(sql, vals);
  connect.release();
  return data;
}
const sqlError = data => {
  console.log(data);
}

module.exports = {
	mysql,
	conn,
	sqlExec,
	sqlError
}