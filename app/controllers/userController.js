const User = require('../models/userModel')
const response = require('../response/projectResponse')

exports.getUsers = (req, res) => {
    // const { project_name, document_title, document_category, department, type, industry } = req.query
    User.getUsers((err, users) => {
        if (err) {
          console.error('Error fetching users:', err.message);
          return res.status(500).json({ error: 'Failed to fetch users.' });
        }
        resUser = []
        users.map((user) => {
            resUser.push({
                id : user.id,
                nama_lengkap : user.nama_lengkap,
                email : user.email,
                role : user.role,
                nip : user.nip
            })
        })
        response(200, resUser, 'Success', res);
      });
};