const connection = require('../../connection')
const format = require('../tools/FormatDate')

const insertFile = (id_project, filename, createdBy, updatedBy, callback) => {
  const createdAt = new Date().toISOString();
  const sql = `INSERT INTO file 
                (id_project, 
                file_name,
                created,
                createdBy,
                updated,
                updatedBy 
                ) VALUES 
                ('${id_project}', 
                '${filename}', 
                '${format.ISOString(createdAt)}', 
                '${createdBy}',
                '${format.ISOString(createdAt)}',
                '${updatedBy}')`
  console.log("SQL :", sql);
  connection.query(sql, (err, results) => {
    if (err) {
      return callback(err, null);
    }
    return callback(null, results);
  });
};

const getDetailFile = (id_project, callback) => {
  const sql = `SELECT * FROM file WHERE id_project = ${id_project}`
  connection.query(sql, (err, results) => {
    if (err) {
      return callback(err, null);
    }
    return callback(null, results);
  });
}
module.exports = { insertFile, getDetailFile }