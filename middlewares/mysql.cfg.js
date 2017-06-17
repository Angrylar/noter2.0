const mysql = require('mysql2');
const pool = mysql.createPool({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'notebase'
})

let query = function (sql, arr) {
	return new Promise((resolve, reject) => {
		pool.execute(sql, arr, function (err, rows, fields) {
			console.log(sql)
			// console.log(fields);
			if (err) {
				console.log(err);
				reject(err);
			}
			else {
				console.log('else')
				// console.log(rows);
				resolve(rows);
			}
		});
	})
}

module.exports = { query }