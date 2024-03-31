const connection = require('../../connection')
const format = require('../tools/FormatDate')

const getUsers = (search, status, callback) => {
  const sql = `SELECT * FROM user 
  WHERE (role_code LIKE '%${search}%' OR
         email LIKE '%${search}%' OR
         nama_lengkap LIKE '%${search}%' OR
         nip LIKE '%${search}%' OR
         nomor_hp LIKE '%${search}%')
        AND
        status LIKE '%${status}%'`;
         console.log('sql get userts',sql)
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

const updateUsers = (id, role_code, email, nama_lengkap, nip, password, nomor_hp, status, updatedBy, callback) => {
         const createdAt = new Date().toISOString();
         const sql = `UPDATE user SET 
         role_code = '${role_code}', 
         email = '${email}',
         nama_lengkap = '${nama_lengkap}', 
         nip = '${nip}', 
         password = '${password}', 
         nomor_hp = '${nomor_hp}',  
         status = '${status}',
         updated = '${format.ISOString(createdAt)}',
         updatedBy = '${updatedBy}'
         WHERE id = ${id}`
    connection.query(sql, (err, results) => {
        if (err) {
          return callback(err, null);
        }
        return callback(null, results);
      });
  };

const updateUsersWithoutPassword = (id, role_code, email, nama_lengkap, nip, nomor_hp, status, updatedBy, callback) => {
         const createdAt = new Date().toISOString();
         const sql = `UPDATE user SET 
         role_code = '${role_code}', 
         email = '${email}',
         nama_lengkap = '${nama_lengkap}', 
         nip = '${nip}', 
         nomor_hp = '${nomor_hp}',  
         status = '${status}',
         updated = '${format.ISOString(createdAt)}',
         updatedBy = '${updatedBy}'
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

  const userByRoleCode = (role_code, callback) => {
    const sql = `SELECT * FROM user WHERE role_code = '${role_code}'`
    connection.query(sql, (err, results) => {
      if (err) {
        return callback(err, null);
      }
      return callback(null, results);
    });
  }

  module.exports = {getUsers, insertUsers, updateUsers, updateUsersWithoutPassword, deleteUser, checkNIP, checkEmail, userByRoleCode}