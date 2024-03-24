// Import dependencies
const express = require('express');
const app = express();
const ProjectController = require('./app/controllers/projectController')
const MemberController = require('./app/controllers/memberController')
const FileController = require('./app/controllers/fileController')
const UserController = require('./app/controllers/userController')
const AuthController = require('./app/controllers/authController')
const AuthMiddleware = require('./app/middleware/authMiddleware')
const bodyParser = require('body-parser')
const cors = require('cors');

app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
app.use(cors());
// Parse application/json
app.use(bodyParser.json({ limit: '10mb' }));
// Import routes
// ... Add more routes here as needed

// projects
app.get('/project', ProjectController.getProjects);
app.get('/project/:id', ProjectController.getProjectDetail);
app.post('/project', ProjectController.insertProjects);
app.put('/project/:id', ProjectController.updateProjects);
app.delete('/project/:id', ProjectController.deleteProjects);
// app.get('/project', AuthMiddleware.isAuthenticated, AuthMiddleware.hasPermission([2, 3, 4]), ProjectController.getProjects);
// app.post('/project', AuthMiddleware.isAuthenticated, AuthMiddleware.hasPermission([2, 3, 4]), ProjectController.insertProjects);
// app.put('/project/:id', AuthMiddleware.isAuthenticated, AuthMiddleware.hasPermission([2, 4]), ProjectController.updateProjects);
// app.delete('/project/:id', AuthMiddleware.isAuthenticated, AuthMiddleware.hasPermission([2, 4]), ProjectController.deleteProjects);

//user

app.get('/user', UserController.getUsers)
app.post('/user', UserController.insertUsers)
app.put('/user', UserController.updateUsers)
app.delete('/user', UserController.deleteUsers)
// app.get('/user', AuthMiddleware.isAuthenticated, AuthMiddleware.hasPermission([1, 4]), UserController.getUsers)
// app.post('/user', AuthMiddleware.isAuthenticated, AuthMiddleware.hasPermission([1, 4]), UserController.insertUsers)
// app.put('/user', AuthMiddleware.isAuthenticated, AuthMiddleware.hasPermission([1, 4]), UserController.updateUsers)
// app.delete('/user', AuthMiddleware.isAuthenticated, AuthMiddleware.hasPermission([1, 4]), UserController.deleteUsers)

//file
app.get('/file/:id', FileController.getDetailFile)
app.put('/file/:id', FileController.updateFile)
app.delete('/file/:id', FileController.deleteFile)

//member
app.post('/member', MemberController.insertMember)
app.get('/member', MemberController.getMember)
app.put('/member', MemberController.updateMember)
app.delete('/member', MemberController.deleteMember)

// authentication
app.post('/login', AuthController.loginUser)
app.get('/logout', AuthController.logoutUser)

// Error handling middleware (optional)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Start the server
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});