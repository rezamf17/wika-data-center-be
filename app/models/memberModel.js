const connection = require('../../connection')
const format = require('../tools/FormatDate')

const getMember = (projectName, status, departemen, callback) => {
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

module.exports = { insertMember, insertMemberValidation, insertExistMember }	