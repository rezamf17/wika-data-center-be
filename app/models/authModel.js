const connection = require('../../connection')

const loginQuery = (nip, callback) => {
    const sql = `SELECT * FROM user WHERE nip = '${nip}'`
    // const sql = `SELECT user.id, user.role_code, user.nip, user.nama_lengkap, user.nip, user.status, user.password
    // FROM user
    // JOIN role ON user.id_role = role.id WHERE nip = '${nip}'`
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