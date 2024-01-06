const User = require('../models/userModel')
const response = require('../response/projectResponse')
const bcryptjs = require('bcryptjs');

exports.getUsers = (req, res) => {
    const { id_role, nama_lengkap, email, nip, status } = req.query
    User.getUsers( id_role, nama_lengkap, email, nip, status, (err, users) => {
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
                role : user.rolename,
                nip : user.nip,
                status : user.status
            })
        })
        response(200, resUser, 'Success', res);
      });
};

exports.insertUsers = async (req, res) => {
  const { id_role, nama_lengkap, email, nip, password, status, createdBy } = req.body;
  const hashPassword = await bcryptjs.hash(password, 10);

  User.checkNIP(nip, (err, nipResult) => {
    if (err) {
      console.error('Error checking NIP:', err.message);
      return res.status(500).json({ error: 'Failed to check NIP.' });
    }
    console.log('nip1',nipResult.length)
    if (nipResult.length != 0) {
      return res.status(500).json({ code: 500, message: 'NIP is already used' });
    }

    User.checkEmail(email, (emailErr, emailResult) => {
      if (emailErr) {
        console.error('Error checking email:', emailErr.message);
        return res.status(500).json({ error: 'Failed to check email.' });
      }
      // console.log('email', emailResult)
      if (emailResult.length != 0) {
        return res.status(500).json({ code: 500, message: 'Email is already used' });
      }

      User.insertUsers(id_role, nama_lengkap, email, nip, hashPassword, status, createdBy, (insertErr) => {
        if (insertErr) {
          console.error('Error inserting users:', insertErr.message);
          return res.status(500).json({ error: 'Failed to insert users.' });
        }

        response(200, [], 'Success', res);
      });
    });
  });
};

exports.updateUsers = async (req, res) => {
  const {id, nama_lengkap, email, role, nip, password, status, createdBy } = req.body
  const hashPassword = await bcryptjs.hash(password, 10)
  if(password != ""){
    User.updateUsers(id, nama_lengkap, email, role, nip, hashPassword, status, createdBy, (err) => {
      if (err) {
        console.error('Error update users:', err.message);
        return res.status(500).json({ error: 'Failed to update users.' });
      }
      response(200, [], 'Success', res);
    })
  }else{
    User.updateUsersWithoutPassword(id, nama_lengkap, email, role, nip, status, createdBy, (err) => {
      if (err) {
        console.error('Error update users:', err.message);
        return res.status(500).json({ error: 'Failed to update users.' });
      }
      response(200, [], 'Success', res);
    })
  }
}

exports.deleteUsers = async (req, res) => {
  const { id } = req.body
  User.deleteUser(id,(err, projects) => {
      if (err) {
        console.error('Error deleted user:', err.message);
        return res.status(500).json({ error: 'Failed to deleted user.' });
      }
      response(200, [], 'Success', res);
    });
}