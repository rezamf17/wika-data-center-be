const connection = require('../../connection')
const format = require('../tools/FormatDate')

const insertFile = (id_project, filename, createdBy,callback) => {
    const createdAt = new Date().toISOString();
    const sql = `INSERT INTO file 
                (id_project, 
                file_name,
                created,
                createdBy 
                ) VALUES 
                ('${id_project}', 
                '${filename}', 
                '${format.ISOString(createdAt)}', 
                '${createdBy}')`
                console.log("SQL :",sql);
      connection.query(sql, (err, results) => {
          if (err) {
            return callback(err, null);
          }
          return callback(null, results);
        });
    };

module.exports = { insertFile }