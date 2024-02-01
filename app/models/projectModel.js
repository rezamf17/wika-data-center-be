const connection = require('../../connection')
const format = require('../tools/FormatDate')

const getProjects = (projectName, status, departemen, callback) => {
         const sql = `SELECT * FROM project WHERE 
                projectName LIKE '%${projectName}%'
                AND status LIKE '%${status}%' 
                AND departemen LIKE '%${departemen}%'`
                // console.log('print sql',sql)
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
              // console.log('insert project model', sql);
    connection.query(sql, (err, results) => {
      // console.log('res',results)
        if (err) {
          return callback(err, null);
        }
        return callback(null, results);
      });
  };

const updateProjects = (id, projectName, status, departemen, startProject, endProject, description, created, createdBy, updated, updatedBy, callback) => {
  const createdAt = new Date().toISOString();
  const sql = `UPDATE project SET
  projectName = '${projectName}', 
                status = '${status}', 
                departemen = '${departemen}', 
                startProject = '${startProject}', 
                endProject = '${endProject}',
                description = '${description}',
                created = '${format.ISOString(createdAt)}',
                createdBy = '${createdBy}',
                updated = '${format.ISOString(createdAt)}',
                updatedBy = '${updatedBy}'
                WHERE id = ${id}`
                console.log(sql)
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