const Auth = require('../models/authModel')
const response = require('../response/projectResponse')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const generateToken = (user) => {
    const payload = {
      email: user.email,
      role: user.id_role // asumsikan Anda memiliki atribut role dalam model user
    };
  
    const token = jwt.sign(payload, 'rezabelajar', { expiresIn: '1h' }); // Ganti 'secretKey' dengan kunci rahasia yang aman
    return token;
  };

exports.loginUser = (req, res) => {
    const { email, password } = req.body
    const token = generateToken(req.body)
    Auth.loginQuery(email, (err, user) => {
        bcrypt.compare(password, user[0].password, (err, result) => {
            if (err) {
                console.error('Error comparing passwords:', err);
                return res.status(500).json({ message: 'Terjadi kesalahan saat login.' });
            }
            
            if (result) {
              res.status(200).json({
                message : "Login Success",
                token : token
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