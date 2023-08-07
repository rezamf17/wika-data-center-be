const connection = require('../../connection')

const loginQuery = (email, callback) => {
    const sql = `SELECT * FROM user WHERE email = '${email}'`
    connection.query(sql, (err, results) => {
      if (err) {
        return callback(err, null);
      }
      return callback(null, results);
    });
}

const getAllRole = (callback) => {
    const sql = `SELECT * FROM role`
    connection.query(sql, (err, results) => {
      if (err) {
        return callback(err, null);
      }
      return callback(null, results);
    });
}

module.exports = { loginQuery , getAllRole}