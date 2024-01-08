const connection = require('../../connection')
const format = require('../tools/FormatDate')

const getProjects = (projectName, status, departemen, callback) => {
         const sql = `SELECT * FROM project WHERE 
                projectName LIKE '%${projectName}%'
                AND status LIKE '%${status}%' 
                AND departemen LIKE '%${departemen}%'`
                console.log('print sql',sql)
    connection.query(sql, (err, results) => {
        if (err) {
          return callback(err, null);
        }
        return callback(null, results);
      });
  };

const insertProjects = (projectName, status, departemen, startProject, endProject, description, created, createdBy, updated, updatedBy, callback) => {
  const createdAt = new Date().toISOString();
  const sql = `INSERT INTO project 
              (projectName, 
              status, 
              departemen, 
              startProject, 
              endProject, 
              description, 
              created, 
              createdBy, 
              updated, 
              updatedBy) VALUES 
              ('${projectName}', 
              '${status}', 
              '${departemen}', 
              '${startProject}', 
              '${endProject}', 
              '${description}', 
              '${created}', 
              '${createdBy}', 
              '${updated}', 
              '${updatedBy}')`
    connection.query(sql, (err, results) => {
      console.log('res',results)
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