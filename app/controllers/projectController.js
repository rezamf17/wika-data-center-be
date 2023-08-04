const Project = require('../models/projectModel')
const response = require('../response/projectResponse')
const multer = require('multer');
const fs = require('fs')
const path = require('path')
const File = require('../models/fileModel')


exports.getProjects = (req, res) => {
    const { project_name, document_title, document_category, department, type, industry } = req.query
    Project.getProjects(project_name, document_title, document_category, department, type, industry, (err, projects) => {
        if (err) {
          console.error('Error fetching projects:', err.message);
          return res.status(500).json({ error: 'Failed to fetch projects.' });
        }
        response(200, projects, 'Success', res);
      });
};

exports.insertProjects = (req, res) => {
    const { project_name, document_title, document_category, department, type, industry, createdBy } = req.body
    var image1 = req.body.image
    var idProject = 0
    Project.insertProjects(project_name, document_title, document_category, department, type, industry, createdBy,(err, projects) => {
      if (err) {
        console.error('Error inserted projects:', err.message);
        return res.status(500).json({ error: 'Failed to insert projects.' });
      }
      console.log("projects value: ",projects);
      idProject = projects.insertId
    });

    image1.forEach(el => {
    console.log(el.filename);
    // Mendapatkan extension file gambar dari base64 string (misalnya .png, .jpg, dll.)
    const extension = el.img.split(';')[0].split('/')[1];

    // Membuat nama unik untuk file gambar
    const filename = Date.now() + '.' + extension;

    // Menentukan path untuk menyimpan gambar di dalam folder "uploads"
    const imagePath = path.join(__dirname, 'uploads', filename);

    // Menghapus prefix "data:image/png;base64," dari image1 agar tersisa data gambar saja
    const base64Data = el.img.replace(/^data:image\/\w+;base64,/, '');
      // Menyimpan data gambar ke dalam file dengan path yang ditentukan
    fs.writeFile(imagePath, base64Data, { encoding: 'base64' }, function (err) {
      if (err) {
        console.error('Error saving image:', err);
        return res.status(500).json({ message: 'Terjadi kesalahan saat menyimpan gambar.' });
      }
      File.insertFile(idProject,filename,createdBy,(err, files) => {
        if (err) {
          console.error('Error inserted files:', err.message);
          return res.status(500).json({ error: 'Failed to insert files.' });
        }
     });
    });
    response(200, [], 'Success', res);    
  });


  
    // console.log(req)
    // Di sini, Anda dapat menyimpan image1 ke database atau menyimpannya sebagai file di server
    // Simpan gambar di dalam folder "uploads"

    
};

exports.updateProjects = (req, res) => {
    const {id, project_name, document_title, document_category, department, type, industry, createdBy } = req.body
    Project.updateProjects(id, project_name, document_title, document_category, department, type, industry, createdBy,(err, projects) => {
        if (err) {
          console.error('Error updated projects:', err.message);
          return res.status(500).json({ error: 'Failed to updated projects.' });
        }
        response(200, [], 'Success', res);
      });
};

exports.deleteProjects = (req, res) => {
    const { id } = req.body
    Project.deleteProjects(id,(err, projects) => {
        if (err) {
          console.error('Error deleted projects:', err.message);
          return res.status(500).json({ error: 'Failed to deleted projects.' });
        }
        response(200, [], 'Success', res);
      });
};