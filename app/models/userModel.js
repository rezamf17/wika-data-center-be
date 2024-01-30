const connection = require('../../connection')
const format = require('../tools/FormatDate')

const getUsers = (role_code, nama_lengkap, email, nip, status, callback) => {
         const sql = `SELECT * FROM user WHERE role_code = '${role_code}'`
        //  console.log(sql)
    connection.query(sql, (err, results) => {
        if (err) {
          return callback(err, null);
        }
        return callback(null, results);
      });
  };


const insertUsers = (role_code, email, nama_lengkap, nip, password, no_hp, status, createdBy, updatedBy, callback) => {
         const createdAt = new Date().toISOString();
         const sql = `INSERT INTO user 
                     (role_code, 
                     email, 
                     nama_lengkap, 
                     nip, 
                     password,
                     nomor_hp,
                     status,
                     created,
                     createdBy,
                     updated,
                     updatedBy) VALUES 
                     ('${role_code}',
                     '${email}', 
                     '${nama_lengkap}', 
                     '${nip}', 
                     '${password}', 
                     '${no_hp}', 
                     '${status}',
                     '${format.ISOString(createdAt)}',
                     '${createdBy}',
                     '${format.ISOString(createdAt)}',
                     '${updatedBy}')`
                    //  console.log('SQL :',sql)
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
        //  console.log(sql)
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
  
  const checkNIP = (nip, callback) => {
    const sql = `SELECT * FROM user WHERE nip = '${nip}'`
    connection.query(sql, (err, results) => {
      if (err) {
        return callback(err, null);
      }
      return callback(null, results);
    });
  }

  const checkEmail = (email, callback) => {
    const sql = `SELECT * FROM user WHERE email = '${email}'`
    // console.log('sql :',sql)
    connection.query(sql, (err, results) => {
      if (err) {
        return callback(err, null);
      }
      return callback(null, results);
    });
  }

  module.exports = {getUsers, insertUsers, updateUsers, updateUsersWithoutPassword, deleteUser, checkNIP, checkEmail}