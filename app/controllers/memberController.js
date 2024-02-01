const response = require('../response/projectResponse')
const Member = require('../models/memberModel')

exports.insertMember = (req, res) => {
	const { id_project, id_user, createdBy, updatedBy } = req.body
	Member.insertMemberValidation(id_user, (err, member) => {
		// console.log('insert member', member[0].role_code);
		if (member[0].role_code != 'MP') {
			return res.status(500).json({ code : "22", message: 'Gagal Insert Member' });
		}
	})
	Member.insertMember(id_project, id_user, createdBy, updatedBy, (err, member) => {
		if (err) {
			console.error('Error inserted member:', err.message);
		}
		// console.log("projects value: ",projects);
		response(200, [], 'Success', res);
	});
}