const {newsController} = require('../controller/index');

const authentication = require('../middleware/userAuth');

const newsRoutes = (app) => {
  app.post('/create-news', authentication, (req, res, next) => newsController.createNews(req, res, next));
  app.put('/update-news/:id', authentication, (req, res, next) => newsController.updateNews(req, res, next));
  app.get('/get-news-by-user-auth', authentication, (req, res, next) => newsController.getNewsDetails(req, res, next));
  app.get('/filter-news', (req, res, next) => newsController.filterTodayNews(req, res, next));
};

module.exports = newsRoutes;
