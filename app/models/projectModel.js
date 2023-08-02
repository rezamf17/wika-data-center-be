const connection = require('../../connection')
const format = require('../tools/FormatDate')

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

const updateProjects = (id, project_name, document_title, document_category, department, type, industry, createdBy, callback) => {
  const createdAt = new Date().toISOString();
  const sql = `UPDATE project SET
                project_name = '${project_name}', 
                document_title = '${document_title}',
                document_category = '${document_category}', 
                department = '${department}', 
                type = '${type}', 
                industry = '${industry}',
                createdBy = '${createdBy}',
                created = '${format.ISOString(createdAt)}'
                WHERE id = ${id}`
    connection.query(sql, (err, results) => {
        if (err) {
          return callback(err, null);
        }
        return callback(null, results);
      });
  };

const deleteProjects = (id, callback) => {
  const sql = `DELETE FROM project WHERE id = ${id}`
    connection.query(sql, (err, results) => {
        if (err) {
          return callback(err, null);
        }
        return callback(null, results);
      });
  };

module.exports = {getProjects, insertProjects, updateProjects, deleteProjects}