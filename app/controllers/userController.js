const User = require('../models/userModel')
const response = require('../response/projectResponse')
const bcryptjs = require('bcryptjs');

exports.getUsers = (req, res) => {
    const { search, status } = req.query
    console.log('request get users',req.query);
    User.getUsers( search, status, (err, users) => {
        if (err) {
          console.error('Error fetching users:', err.message);
          return res.status(500).json({ error: 'Failed to fetch users.' });
        }
        resUser = []
        users.map((user) => {
          if (user.role_code != 'SU') {
            resUser.push({
                id : user.id,
                nama_lengkap : user.nama_lengkap,
                email : user.email,
                role_code : user.role_code,
                nip : user.nip,
                no_hp : user.nomor_hp,
                status : user.status
            })
          }
        })
        response(200, resUser, 'Success', res);
      });
};

exports.insertUsers = async (req, res) => {
  const { role_code, email, nama_lengkap, password, nip, no_hp, status, createdBy, updatedBy } = req.body;
  const hashPassword = await bcryptjs.hash(password, 10);
  // console.log('request insert user',req);

  User.checkNIP(nip, (err, nipResult) => {
    if (err) {
      console.error('Error checking NIP:', err.message);
      return res.json({code: "87", error: 'Failed to check NIP.' });
    }
    console.log('nip1',nipResult.length)
    if (nipResult.length != 0) {
      return res.json({ code: "88", message: 'NIP is already used' });
    }

    User.checkEmail(email, (emailErr, emailResult) => {
      if (emailErr) {
        console.error('Error checking email:', emailErr.message);
        return res.json({ code: "86", error: 'Failed to check email.' });
      }
      // console.log('email', emailResult)
      if (emailResult.length != 0) {
        return res.json({ code: "85", message: 'Email is already used' });
      }

      User.insertUsers(role_code, email, nama_lengkap, nip, hashPassword, no_hp, status, createdBy, updatedBy, (insertErr) => {
        if (insertErr) {
          console.error('Error inserting users:', insertErr.message);
          return res.json({code: "99", error: 'Failed to insert users.' });
        }

        response(200, [], 'Success', res);
      });
    });
  });
};

exports.updateUsers = async (req, res) => {
  const {id, role_code, email, nama_lengkap, nip, password, no_hp, status, updatedBy } = req.body
  const hashPassword = await bcryptjs.hash(password, 10)
  // console.log('request update users', req.body);
  if(password.length != 0){
    User.updateUsers(id, role_code, email, nama_lengkap, nip, hashPassword, no_hp, status, updatedBy, (err) => {
      if (err) {
        console.error('Error update users:', err.message);
        return res.status(500).json({ error: 'Failed to update users.' });
      }
      response(200, [], 'Success', res);
    })
  }else{
    User.updateUsersWithoutPassword(id, role_code, email, nama_lengkap, nip, no_hp, status, updatedBy, (err) => {
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