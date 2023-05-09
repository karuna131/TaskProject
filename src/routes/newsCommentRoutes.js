const {newsCommentController} = require('../controller/index');

const authentication = require('../middleware/userAuth');

const newsCommentRoutes = (app) => {
    app.post('/add-comment', authentication, (req, res, next) => newsCommentController.createComment(req, res, next));
    app.put('/update-comment/:id', authentication, (req, res, next) => newsCommentController.updateComment(req, res, next));
    app.get('/get-comments/:id', (req, res, next) => newsCommentController.getCommentList(req, res, next));
}

module.exports = newsCommentRoutes;