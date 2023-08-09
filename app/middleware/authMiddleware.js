// const Auth = require('../models/authModel');
const jwt = require('jsonwebtoken');

const isAuthenticated = (req, res, next) => {
  // console.log(req.headers)
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized Token' });
    }
    const rep = token.replace("Bearer ", "")
    
    jwt.verify(rep, 'rezabelajar', (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Unauthorized Auth' });
      }

      // Set informasi pengguna yang terverifikasi dalam objek req.user
      req.id_role = decoded;
      // console.log('decoded',decoded)
      next();
    });
}

const hasPermission = (permission) => {
  return (req, res, next) => {
    const permissions = req.id_role.id_role;
    if (permission.includes(permissions)) {
      return next();
    }

    res.status(403).json({ message: 'Forbidden' });
  };
}

module.exports = { isAuthenticated, hasPermission }