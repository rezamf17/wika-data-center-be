const connection = require('../../connection')

const loginQuery = (email, callback) => {
    // const sql = `SELECT * FROM user WHERE email = '${email}'`
    const sql = `SELECT user.id, user.id_role, user.email, user.nama_lengkap, user.nip, user.status, user.password, role.rolename as rolename
    FROM user
    JOIN role ON user.id_role = role.id WHERE email = '${email}'`
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