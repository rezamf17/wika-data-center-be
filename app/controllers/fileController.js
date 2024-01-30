const response = require('../response/projectResponse')
const File = require('../models/fileModel')
const path = require('path')
const fs = require('fs')

exports.getDetailFile = (req, res) => {
  const { id } = req.params
  File.getDetailFile(id, (err, file) => {
    if (file.length == 0) {
      return res.status(201).json({ code: "80", error: "Data Tidak Ditemukan" })
    }
    if (err) {
      console.error('Error fetching projects:', err.message);
      return res.status(500).json({ error: 'Failed to fetch file.' });
    }
    response(200, file, 'Success', res);
  });
}

exports.updateFile = (req, res) => {
  const { id, id_project, file_name, created, createdBy, updatedBy, } = req.body
  // console.log('update req', req);
  const extension = file_name.split(';')[0].split('/')[1];
  const filename = Date.now() + '.' + extension;
  const imagePath = path.join(__dirname, 'uploads', filename);
  const base64Data = file_name.replace(/^data:image\/\w+;base64,/, '');
  const idProject = parseInt(id_project)
  fs.writeFile(imagePath, base64Data, { encoding: 'base64' }, function (err) {
    if (err) {
      console.error('Error saving image:', err);
      return res.status(500).json({ message: 'Terjadi kesalahan saat menyimpan gambar.' });
    }

    // Update file in the database
    File.updateFile(id, idProject, filename, created, createdBy, updatedBy, (err, file) => {
      if (err) {
        console.error('Error updating file:', err.message);
        return res.status(500).json({ error: 'Failed to update file.' });
      }
    })
  });
  File.getImageDelete(id, (err, getFile) => {
    // console.log('id gaess', getFile[0].file_name);
    if (err) {
      console.error('Error get File', err);
    }
    // Remove the old file from the server
    const oldImagePath = path.join(__dirname, 'uploads', getFile[0].file_name);
    fs.unlink(oldImagePath, (err) => {
      if (err) {
        console.error('Error deleting old image:', err);
      } else {
        console.log('Old image deleted successfully');
      }
    });
  });
  response(200, [], 'Success', res);
}

exports.deleteFile = (req, res) => {
  const { id } = req.body
  File.getImageDelete(id, (err, getFile) => {
    console.log('get file gaess', getFile);
    if (err) {
      return console.error('Error get File', err);
    }
    // Remove the old file from the server
    const oldImagePath = path.join(__dirname, 'uploads', getFile[0].file_name);
    fs.unlink(oldImagePath, (err) => {
      if (err) {
        console.error('Error deleting old image:', err);
      } else {
        console.log('Old image deleted successfully');
      }
    });
  });
  File.deleteFile(id, (err, file) => {
    if (err) {
      console.error('Error deleted file:', err.message);
      return res.status(500).json({ error: 'Failed to deleted file.' });
    }
  });
  response(200, [], 'Success', res);
}