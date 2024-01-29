const response = require('../response/projectResponse')
const File = require('../models/fileModel')

exports.getDetailFile = (req, res) => {
    const { id } = req.params
    File.getDetailFile(id, (err, file) => {
        if (file.length == 0) {
          return res.status(201).json({code : "80", error : "Data Tidak Ditemukan"})
        }
        if (err) {
          console.error('Error fetching projects:', err.message);
          return res.status(500).json({ error: 'Failed to fetch file.' });
        }
        response(200, file, 'Success', res);
      });
}