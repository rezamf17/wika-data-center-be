// Import dependencies
const express = require('express');
const app = express();
const ProjectController = require('./app/controllers/projectController')
const UserController = require('./app/controllers/userController')

// Set up middleware
app.use(express.json()); // Parse incoming JSON data
app.use(express.urlencoded({ extended: true })); // Parse incoming URL-encoded data

// Import routes
// ... Add more routes here as needed

// Connect routes
app.get('/project', ProjectController.getProjects);
app.post('/project', ProjectController.insertProjects);
app.put('/project/:id', ProjectController.updateProjects);
app.delete('/project/:id', ProjectController.deleteProjects);

//user

app.get('/user', UserController.getUsers)
app.post('/user', UserController.insertUsers)
app.put('/user', UserController.updateUsers)
app.delete('/user', UserController.deleteUsers)
// ... Connect other routes here as needed

// Error handling middleware (optional)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});