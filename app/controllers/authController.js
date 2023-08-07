const Auth = require('../models/authModel')
const response = require('../response/projectResponse')
const bcrypt = require('bcrypt');

exports.loginUser = (req, res) => {
    const { email, password } = req.body
    Auth.loginQuery(email, (err, user) => {
        bcrypt.compare(password, user[0].password, (err, result) => {
            if (err) {
                console.error('Error comparing passwords:', err);
                return res.status(500).json({ message: 'Terjadi kesalahan saat login.' });
            }
            
            if (result) {
              response(200, [], 'Login Success', res);
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