const Auth = require('../models/authModel')
const response = require('../response/projectResponse')
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const generateToken = (user, data) => {
  const payload = {
    email: user.email,
    id_role: data
  };
  // console.log('user payload',data)
  const token = jwt.sign(payload, 'rezabelajar', { expiresIn: '1h' });
  return token;
};

exports.loginUser = (req, res) => {
  const { email, password } = req.body
  Auth.loginQuery(email, (err, user) => {
    const token = generateToken(req.body, user[0].id_role)
    bcryptjs.compare(password, user[0].password, (err, result) => {
      if (err) {
        console.error('Error comparing passwords:', err);
        return res.status(500).json({ message: 'Terjadi kesalahan saat login.' });
      }
      if (res) {
        res.status(200).json({
          message: "Login Success",
          token: token,
          data: [
            {
              nama_lengkap: user[0].nama_lengkap,
              email: user[0].email,
              nip: user[0].nip,
              id_role: user[0].id_role,
            }
          ]
        })
      } else {
        res.status(401).json({ message: 'Username atau kata sandi salah.' });
      }
    });
    if (err) {
      console.error('Error fetching users:', err.message);
      return res.status(500).json({ error: 'Failed to fetch users.' });
    }
  });
};

exports.logoutUser = (req, res) => {
  res.json({ message: 'Logout berhasil' });
}