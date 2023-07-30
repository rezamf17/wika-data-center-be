const connection = require('../../connection')
const format = require('../tools/FormatDate')

// const getDataProject = (project_name, document_title, document_category, department, type, industry) => {
//     const sql = `SELECT * FROM project WHERE 
//             project_name LIKE '%${project_name}%' 
//             AND document_title LIKE '%${document_title}%' 
//             AND document_category LIKE '%${document_category}%' 
//             AND department LIKE '%${department}%' 
//             AND type Like '%${type}%' 
//             AND industry LIKE '%${industry}%'`
    
//     return sql
// }

const getProjects = (project_name, document_title, document_category, department, type, industry, callback) => {
         const sql = `SELECT * FROM project WHERE 
                project_name LIKE '%${project_name}%'
                AND document_title LIKE '%${document_title}%' 
                AND document_category LIKE '%${document_category}%' 
                AND department LIKE '%${department}%' 
                AND type Like '%${type}%' 
                AND industry LIKE '%${industry}%'`
    connection.query(sql, (err, results) => {
        if (err) {
          return callback(err, null);
        }
        return callback(null, results);
      });
  };

const insertProjects = (project_name, document_title, document_category, department, type, industry, createdBy, callback) => {
  const createdAt = new Date().toISOString();
  const sql = `INSERT INTO project 
              (project_name, 
              document_title, 
              document_category, 
              department, 
              type, 
              industry,
              createdBy,
              created) VALUES 
              ('${project_name}', 
              '${document_title}', 
              '${document_category}', 
              '${department}', 
              '${type}', 
              '${industry}',
              '${createdBy}',
              '${format.ISOString(createdAt)}')`
    connection.query(sql, (err, results) => {
        if (err) {
          return callback(err, null);
        }
        return callback(null, results);
      });
  };

module.exports = {getProjects, insertProjects}