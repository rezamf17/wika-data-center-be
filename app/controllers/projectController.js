const Project = require('../models/projectModel')
const db = require('../../connection')
const response = require('../response/projectResponse')

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
    Project.insertProjects(project_name, document_title, document_category, department, type, industry, createdBy,(err, projects) => {
        if (err) {
          console.error('Error inserted projects:', err.message);
          return res.status(500).json({ error: 'Failed to insert projects.' });
        }
        response(200, [], 'Success', res);
      });
};