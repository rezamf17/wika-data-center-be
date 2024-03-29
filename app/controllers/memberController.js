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
	Member.insertExistMember(id_project, id_user, (err, member) => {
		// console.log('insert exist member', member);
		if (member.length != 0) {
			return res.status(500).json({ code : "21", message: 'Member Telah Terdaftar' });
		}else{
			Member.insertMember(id_project, id_user, createdBy, updatedBy, (err, member) => {
				if (err) {
					console.error('Error inserted member:', err.message);
				}
				// console.log("projects value: ",projects);
				response(200, [], 'Insert Success', res);
			});
		}
	})
}

exports.updateMember = (req, res) => {
	const { id, id_project, id_user, createdBy, updatedBy } = req.body
	Member.insertMemberValidation(id_user, (err, member) => {
		// console.log('insert member', member[0].role_code);
		if (member[0].role_code != 'MP') {
			return res.status(500).json({ code : "22", message: 'Gagal Update Member' });
		}
		Member.insertExistMember(id_project, id_user, (err, member2) => {
			// console.log('insert exist member', member);
			if (member2.length != 0) {
				return res.status(500).json({ code : "21", message: 'Member Telah Terdaftar' });
			}else{
				Member.updateMember(id, id_user, id_project, createdBy, (err, member) => {
					if (err) {
						console.error('Error updated member:', err.message);
					}
					// console.log("projects value: ",projects);
					response(200, [], 'Update Success', res);
				});
			}
		})
	})
}

exports.deleteMember = (req, res) => {
  const { id } = req.body
  Member.deleteMember(id,(err, member) => {
      if (err) {
        console.error('Error deleted projects:', err.message);
        return res.status(500).json({ error: 'Failed to deleted member.' });
      }
      response(200, [], 'Delete Success', res);
    });
}

exports.getMember = (req, res) => {
	const { pj_proyek } = req.query 
	Member.getMember(pj_proyek, (err, member) => {
		if (err) {
			console.error('Error fetching member:', err.message);
			return res.status(500).json({ error: 'Failed to fetch member.' });
		  }
		  response(200, member, 'Success', res);
	})
}