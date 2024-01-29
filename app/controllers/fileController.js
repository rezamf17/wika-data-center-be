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
  console.log('update req', req);
  const extension = file_name.split(';')[0].split('/')[1];
  const filename = Date.now() + '.' + extension;
  const imagePath = path.join(__dirname, 'uploads', filename);
  const base64Data = file_name.replace(/^data:image\/\w+;base64,/, '');
  const idProject = parseInt(id_project)
  fs.writeFile(imagePath, base64Data, { encoding: 'base64' }, function (err) {
    if (err) {
      console.error('Error saving image:', err);
      // return res.status(500).json({ message: 'Terjadi kesalahan saat menyimpan gambar.' });
    }
    File.updateFile(id, idProject, filename, created, createdBy, updatedBy, (err, file) => {
      if (err) {
        console.error('Error updated file:', err.message);
        return res.status(500).json({ error: 'Failed to updated file.' });
      }
      response(200, [], 'Success', res);
    });
  });

}