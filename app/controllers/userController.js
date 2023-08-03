const User = require('../models/userModel')
const response = require('../response/projectResponse')
const bcrypt = require('bcrypt');

exports.getUsers = (req, res) => {
    // const {  } = req.query
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

exports.insertUsers = async (req, res) => {
  const { nama_lengkap, email, role, nip, password, status, createdBy } = req.body
  const hashPassword = await bcrypt.hash(password, 10)
  User.insertUsers(nama_lengkap, email, role, nip, hashPassword, status, createdBy, (err) => {
    if (err) {
      console.error('Error inserted users:', err.message);
      return res.status(500).json({ error: 'Failed to insert users.' });
    }
    response(200, [], 'Success', res);
  })
}