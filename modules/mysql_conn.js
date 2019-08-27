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