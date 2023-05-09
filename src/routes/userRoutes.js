const {userController} = require('../controller/index');

const authentication = require('../middleware/userAuth');

const userRoutes = (app) => {
  app.post('/signup', (req, res, next) => userController.signup(req, res, next));
  app.post('/login', (req, res, next) => userController.login(req, res, next));
};

module.exports = userRoutes;
