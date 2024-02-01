const response = require('../response/projectResponse')
const Member = require('../models/memberModel')

exports.insertMember = (req, res) => {
	const { id_project, id_user, createdBy, updatedBy } = req.body
	// console.log('insert member', req.body);
	Member.insertMember(id_project, id_user, createdBy, updatedBy, (err, member) => {
		if (err) {
			console.error('Error inserted member:', err.message);
		}
		// console.log("projects value: ",projects);
	});
	response(200, [], 'Success', res);
}