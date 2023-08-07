// const Auth = require('../models/authModel');
const jwt = require('jsonwebtoken');

const isAuthenticated = (req, res, next) => {
    const token = req.headers.authorization;
    const rep = token.replace("Bearer ", "")
    
    if (!rep) {
      return res.status(401).json({ message: 'Unauthorized Token' });
    }
    jwt.verify(rep, 'rezabelajar', (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Unauthorized Auth' });
      }

      // Set informasi pengguna yang terverifikasi dalam objek req.user
      req.email = decoded;
      next();
    });
}

module.exports = { isAuthenticated }