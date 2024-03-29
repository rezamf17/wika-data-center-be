const Project = require('../models/projectModel')
const response = require('../response/projectResponse')
const fs = require('fs')
const path = require('path')
const File = require('../models/fileModel')


exports.getProjects = (req, res) => {
    const { projectName, status, departemen } = req.query
    Project.getProjects(projectName, status, departemen, (err, projects) => {
        if (err) {
          console.error('Error fetching projects:', err.message);
          return res.status(500).json({ error: 'Failed to fetch projects.' });
        }
        response(200, projects, 'Success', res);
      });
};

exports.insertProjects = async (req, res) => {
    const { projectName, status, departemen, startProject, endProject, description, tempat_proyek, pj_proyek, created, createdBy, updated, updatedBy } = req.body
    let image1 = req.body.image
    let idProject = 0
    Project.insertProjects(projectName, status, departemen, startProject, endProject, description, tempat_proyek, pj_proyek, created, createdBy, updated, updatedBy,(err, projects) => {
      if (err) {
        console.error('Error inserted projects:', err.message);
        // return res.status(500).json({ error: 'Failed to insert projects.' });
      }
      // console.log("projects value: ",projects);
      idProject = projects.insertId
    });
    image1.forEach(el => {
      console.log('body image', el);
      // Mendapatkan extension file gambar dari base64 string (misalnya .png, .jpg, dll.)
      const extension = el.img.split(';')[0].split('/')[1];
      // console.log();

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
        // return res.status(500).json({ message: 'Terjadi kesalahan saat menyimpan gambar.' });
      }
      File.insertFile(idProject,filename,createdBy, updatedBy, (err) => {
        if (err) {
          console.error('Error inserted files:', err.message);
          // return res.status(500).json({ error: 'Failed to insert files.' });
        }
     });
    });
  });
  response(200, [], 'Success', res);
};

exports.updateProjects = (req, res) => {
    const {id, projectName, status, departemen, startProject, endProject, description, created, createdBy, updated, updatedBy } = req.body
    Project.updateProjects(id, projectName, status, departemen, startProject, endProject, description, created, createdBy, updated, updatedBy,(err, projects) => {
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

exports.getProjectDetail = (req, res) => {
    const { id } = req.params
    Project.getProjectsDetail(id,(err, projects) => {
      // console.log('project detail', projects.length);
        if (projects.length == 0) {
          return res.status(500).json({ code : "19", message: 'Project tidak ditemukan' });
        }
        if (err) {
          console.error('Error fetching projects:', err.message);
          return res.status(500).json({ error: 'Failed to fetch projects.' });
        }
        response(200, projects, 'Success', res);
      });
};