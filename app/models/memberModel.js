const connection = require('../../connection')
const format = require('../tools/FormatDate')

const getMember = (pj_proyek, callback) => {
  const sql = `SELECT proyek_member.id, user.nip, user.email, user.role_code, project.projectName, user.nama_lengkap, project.pj_proyek
				FROM proyek_member
				JOIN project ON project.id = proyek_member.id_project
				JOIN user ON user.id = proyek_member.id_user
				WHERE project.pj_proyek LIKE '%${pj_proyek}%'`
  // console.log('print sql',sql)
  connection.query(sql, (err, results) => {
    if (err) {
      return callback(err, null);
    }
    return callback(null, results);
  });
};

const insertMember = (id_project, id_user, createdBy, updatedBy, callback) => {
  const createdAt = new Date().toISOString();
  const sql = `INSERT INTO proyek_member
				(id_project, 
				id_user,
				created, 
				createdBy, 
				updated, 
				updatedBy) VALUES (
					'${id_project}', 
					'${id_user}',
					'${format.ISOString(createdAt)}', 
					'${createdBy}', 
					'${format.ISOString(createdAt)}', 
					'${updatedBy}'
					)`
  connection.query(sql, (err, results) => {
    // console.log('res',results)
    if (err) {
      return callback(err, null);
    }
    return callback(null, results);
  });
}

const updateMember = (id, id_user, id_project, updatedBy, callback) => {
  const createdAt = new Date().toISOString();
  const sql = `UPDATE proyek_member SET
                id_user = '${id_user}', 
                id_project = '${id_project}',
                updated = '${format.ISOString(createdAt)}',
                updatedBy = '${updatedBy}'
                WHERE id = ${id}`
                connection.query(sql, (err, results) => {
                  if (err) {
                    return callback(err, null);
                  }
                  return callback(null, results);
                });
}

const insertMemberValidation = (id, callback) => {
  const sql = `SELECT * FROM user WHERE id = ${id}`
  // console.log(sql);
  connection.query(sql, (err, results) => {
    if (err) {
      return callback(err, null);
    }
    return callback(null, results);
  });
}

const insertExistMember = (id_project, id_user, callback) => {
  const sql = `SELECT * FROM proyek_member WHERE id_project = ${id_project} AND id_user = ${id_user}`
  // console.log(sql);
  connection.query(sql, (err, results) => {
    if (err) {
      return callback(err, null);
    }
    return callback(null, results);
  });
}

const deleteMember = (id, callback) => {
  const sql = `DELETE FROM proyek_member WHERE id = ${id}`
    connection.query(sql, (err, results) => {
        if (err) {
          return callback(err, null);
        }
        return callback(null, results);
      });
  };

module.exports = { insertMember, insertMemberValidation, insertExistMember, getMember, updateMember, deleteMember }	