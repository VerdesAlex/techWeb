// import auth from './auth-controller.mjs';
import user from './controllers/user-controller.mjs';
import project from './controllers/project-controller.mjs';
import task from './controllers/task-controller.mjs';
// import admin from './controllers/admin-controller.mjs'; // Import the admin controller
// import auth from './controllers/auth-controller.mjs';
// import auth from './auth-controller.mjs';

import admin from './admin-router.mjs'
import api from './api-router.mjs'
import auth from './auth-router.mjs'


export default {
  auth,
  user,
  project,
  task,
  admin, // Add the admin controller
  api
};