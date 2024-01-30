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

const updateFile = (id, id_project, file_name, created, createdBy, updatedBy, callback) => {
  const createdAt = new Date().toISOString();
  const sql = `UPDATE file SET
  id_project = '${id_project}', 
  file_name = '${file_name}', 
  created = '${created}', 
  createdBy = '${createdBy}', 
  updated = '${format.ISOString(createdAt)}', 
  updatedBy = '${updatedBy}'
  WHERE id = ${id}`
  // console.log(sql)
  connection.query(sql, (err, results) => {
    if (err) {
      return callback(err, null);
    }
    return callback(null, results);
  });
}

const getImageDelete = (id, callback) => {
  const sql = `SELECT * FROM file WHERE id = ${id}`
  console.log('SQL getimage delete', sql);
  connection.query(sql, (err, results) => {
    if (err) {
      return callback(err, null);
    }
    return callback(null, results);
  });
}

const deleteFile = (id, callback) => {
  const sql =  `DELETE FROM file WHERE id = ${id}`
  connection.query(sql, (err, results) => {
    if (err) {
      return callback(err, null);
    }
    return callback(null, results);
  });
}
module.exports = { insertFile, getDetailFile, updateFile, getImageDelete, deleteFile }