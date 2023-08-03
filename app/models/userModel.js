const connection = require('../../connection')
const format = require('../tools/FormatDate')

const getUsers = (callback) => {
         const sql = `SELECT * FROM user`
    connection.query(sql, (err, results) => {
        if (err) {
          return callback(err, null);
        }
        return callback(null, results);
      });
  };


const insertUsers = (nama_lengkap, email, role, nip, password, status, createdBy, callback) => {
         const createdAt = new Date().toISOString();
         const sql = `INSERT INTO user 
                     (nama_lengkap, 
                     email, 
                     role, 
                     nip, 
                     password, 
                     status,
                     created,
                     createdBy) VALUES 
                     ('${nama_lengkap}', 
                     '${email}', 
                     '${role}', 
                     '${nip}', 
                     '${password}', 
                     '${status}',
                     '${format.ISOString(createdAt)}',
                     '${createdBy}')`
    connection.query(sql, (err, results) => {
        if (err) {
          return callback(err, null);
        }
        return callback(null, results);
      });
  };

  module.exports = {getUsers, insertUsers}