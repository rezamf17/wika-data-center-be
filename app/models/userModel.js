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

const updateUsers = (id, nama_lengkap, email, role, nip, password, status, createdBy, callback) => {
         const createdAt = new Date().toISOString();
         const sql = `UPDATE user SET 
         nama_lengkap = '${nama_lengkap}', 
         email = '${email}',
         role = '${role}', 
         nip = '${nip}', 
         password = '${password}', 
         status = '${status}',
         created = '${format.ISOString(createdAt)}',
         createdBy = '${createdBy}'
         WHERE id = ${id}`
    connection.query(sql, (err, results) => {
        if (err) {
          return callback(err, null);
        }
        return callback(null, results);
      });
  };

const updateUsersWithoutPassword = (id, nama_lengkap, email, role, nip, status, createdBy, callback) => {
         const createdAt = new Date().toISOString();
         const sql = `UPDATE user SET 
         nama_lengkap = '${nama_lengkap}', 
         email = '${email}',
         role = '${role}', 
         nip = '${nip}',
         status = '${status}',
         created = '${format.ISOString(createdAt)}',
         createdBy = '${createdBy}'
         WHERE id = ${id}`
         console.log(sql)
    connection.query(sql, (err, results) => {
        if (err) {
          return callback(err, null);
        }
        return callback(null, results);
      });
  };

  const deleteUser = (id, callback) => {
    const sql = `DELETE FROM user WHERE id = ${id}`
      connection.query(sql, (err, results) => {
          if (err) {
            return callback(err, null);
          }
          return callback(null, results);
        });
    };

  module.exports = {getUsers, insertUsers, updateUsers, updateUsersWithoutPassword, deleteUser}