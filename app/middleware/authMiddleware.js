// const Auth = require('../models/authModel');
const jwt = require('jsonwebtoken');

const isAuthenticated = (req, res, next) => {
    const token = req.headers.authorization;
    
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    
    jwt.verify(token, 'rezabelajar', (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
      console.log(err)

      // Set informasi pengguna yang terverifikasi dalam objek req.user
      req.email = decoded;
      next();
    });
}

module.exports = { isAuthenticated }