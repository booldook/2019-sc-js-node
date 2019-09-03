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

module.exports = {
	mysql,
	conn
}