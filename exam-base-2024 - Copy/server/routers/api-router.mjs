import express from 'express'
import controllers from './controllers/index.mjs'
import middleware from '../middleware/index.mjs'

const apiRouter = express.Router()
apiRouter.use(middleware.auth)

// project endpoints
apiRouter.get('/users/:uid/projects', controllers.project.getAllProjects)
apiRouter.get('/users/:uid/projects/:pid', controllers.project.getOneOwnedProject)
apiRouter.post('/users/:uid/projects', controllers.project.createOwnedProject)
apiRouter.put('/users/:uid/projects/:pid', middleware.getPermMiddleware('pid', ['write']), controllers.project.updateOwnedProject)
apiRouter.delete('/users/:uid/projects/:pid', middleware.getPermMiddleware('pid', ['write']), controllers.project.deleteOwnedProject)

// task endpoints
apiRouter.get('/users/:uid/projects/:pid/tasks', controllers.task.getAllTasksForProject)
apiRouter.get('/users/:uid/projects/:pid/tasks/:tid', controllers.task.getOneTaskForProject)
apiRouter.post('/users/:uid/projects/:pid/tasks', middleware.getPermMiddleware('pid', ['write']), controllers.task.createOwnedTaskForProject)
apiRouter.put('/users/:uid/projects/:pid/tasks/:tid', middleware.getPermMiddleware('pid', ['write']), controllers.task.updateOwnedTaskForProject)
apiRouter.delete('/users/:uid/projects/:pid/tasks/:tid', middleware.getPermMiddleware('pid', ['write']), controllers.task.deleteOwnedTaskForProject)
apiRouter.post('/users/:uid/projects/:pid/tasks/:tid/assignments', middleware.getPermMiddleware('pid', ['write']), controllers.task.assignTaskToUser)
apiRouter.put('/users/:uid/projects/:pid/tasks/:tid/status', middleware.assignedTaskMiddleware, controllers.task.updateAssignedTaskStatus)

// get user profile
apiRouter.get('/users/:uid/profile', controllers.user.getUserProfile)

// suggest user based on email
apiRouter.get('/users/suggestions', controllers.user.suggestUser)


apiRouter.get('/users/:uid/teams', controllers.team.getAllTeams);
apiRouter.post('/users/:uid/teams', controllers.team.createTeam);
apiRouter.put('/users/:uid/teams/:tid', controllers.team.updateTeam);
apiRouter.delete('/users/:uid/teams/:tid', controllers.team.deleteTeam);

export default apiRouter
