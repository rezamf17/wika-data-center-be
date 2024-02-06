const Auth = require('../models/authModel')
const response = require('../response/projectResponse')
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const generateToken = (user, data) => {
  const payload = {
    nip: user.nip,
    data : data
  };
  // console.log('user payload',data)
  // console.log('user payload user',user)
  const token = jwt.sign(payload, 'rezabelajar', { expiresIn: '1h' });
  return token;
};

exports.loginUser = (req, res) => {
  const { nip, password } = req.body
  console.log('request body',req.body);
  Auth.loginQuery(nip, (err, user) => {
    // console.log('usr', user);
    const data = [
      {
        nama_lengkap: user[0].nama_lengkap,
        email: user[0].email,
        nip: user[0].nip,
        role_code: user[0].role_code,
        nomor_hp: user[0].nomor_hp,
      }
    ]
    const token = generateToken(req.body, data)
    bcryptjs.compare(password, user[0].password, (err, result) => {
      if (err) {
        console.error('Error comparing passwords:', err);
        return res.status(500).json({ message: 'Terjadi kesalahan saat login.' });
      }
      if (result) {
        res.status(200).json({
          message: "Login Success",
          token: token,
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