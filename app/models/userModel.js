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

  module.exports = {getUsers}