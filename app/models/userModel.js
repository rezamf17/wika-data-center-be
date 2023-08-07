const connection = require('../../connection')
const format = require('../tools/FormatDate')

const getUsers = (id_role, nama_lengkap, email, nip, status, callback) => {
         const sql = `SELECT user.id, user.id_role, user.email, user.nama_lengkap, user.nip, user.status, role.rolename as rolename
         FROM user
         JOIN role ON user.id_role = role.id
         AND nama_lengkap LIKE '%${nama_lengkap}%'
         AND id_role LIKE '%${id_role}%'
         AND email LIKE '%${email}%' 
         AND nip LIKE '%${nip}%' 
         AND status LIKE '%${status}%'`
         console.log(sql)
    connection.query(sql, (err, results) => {
        if (err) {
          return callback(err, null);
        }
        return callback(null, results);
      });
  };


const insertUsers = (id_role, nama_lengkap, email, nip, password, status, createdBy, callback) => {
         const createdAt = new Date().toISOString();
         const sql = `INSERT INTO user 
                     (id_role,
                     nama_lengkap, 
                     email, 
                     nip, 
                     password, 
                     status,
                     created,
                     createdBy) VALUES 
                     ('${id_role}',
                    '${nama_lengkap}', 
                     '${email}', 
                     '${nip}', 
                     '${password}', 
                     '${status}',
                     '${format.ISOString(createdAt)}',
                     '${createdBy}')`
                     console.log('SQL :',sql)
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