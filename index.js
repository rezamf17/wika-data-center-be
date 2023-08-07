// Import dependencies
const express = require('express');
const app = express();
const ProjectController = require('./app/controllers/projectController')
const UserController = require('./app/controllers/userController')
const AuthController = require('./app/controllers/authController')
const AuthMiddleware = require('./app/middleware/authMiddleware')
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

// Parse application/json
app.use(bodyParser.json({ limit: '10mb' }));
// Import routes
// ... Add more routes here as needed

// projects
app.get('/project', ProjectController.getProjects);
app.post('/project', ProjectController.insertProjects);
app.put('/project/:id', ProjectController.updateProjects);
app.delete('/project/:id', ProjectController.deleteProjects);

//user

app.get('/user', AuthMiddleware.isAuthenticated, UserController.getUsers)
app.post('/user', UserController.insertUsers)
app.put('/user', UserController.updateUsers)
app.delete('/user', UserController.deleteUsers)

// authentication
app.post('/login', AuthController.loginUser)

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