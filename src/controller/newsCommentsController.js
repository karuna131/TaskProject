const model = require('../models/index');
const newsModel = model.News;
const userModel = model.User;
const newsCommentsModel = model.NewsComments;
const responseData = require('../helpers/response');

const newsCommentController = {
  createComment: async (req, res) => {
    try {
      const checkToken = req.headers.authorization.replace('Bearer ', '');
      const checkingUserData = await userModel.findOne({token: checkToken});
      if (checkingUserData) {
        const info = {
          news_id: req.body.news_id,
          user_id: checkingUserData._id,
          comments: req.body.comments,
        };

        const addNewsComment = await newsCommentsModel.create(info);
        responseData.sendResponse(res, 'News Comment Created Successfully', addNewsComment);
      } else {
        responseData.messageResponse(res, 'Invalid Authentication Provided');
      }
    } catch (error) {
      responseData.errorResponse(res, error);
    }
  },


  updateComment: async(req, res) => {
    try {
        const checkToken = req.headers.authorization.replace('Bearer ', '');
        const checkingUserData = await userModel.findOne({token: checkToken});
        if (checkingUserData) {
            const updateNewsComment = await newsCommentsModel.findOneAndUpdate({_id: req.params.id, user_id: checkingUserData._id}, {comments: req.body.comments});
            if(updateNewsComment){
                const updatedData = await newsCommentsModel.findOne({_id: req.params.id, user_id: checkingUserData._id});
                responseData.sendResponse(res, 'News Comment Updated Successfully', updatedData);
            }else{
                responseData.messageResponse(res, 'Not Found');
            }
        } else {
            responseData.messageResponse(res, 'Invalid Authentication Provided');
        }
        } catch (error) {
            responseData.errorResponse(res, error);
        }
    },


    getCommentList: async(req, res) => {
        try {
            const getData = await newsCommentsModel.find({news_id: req.params.id, is_deleted: false});
            if (getData.length != 0) {
            responseData.sendResponse(res, 'News Comments', getData);
            } else {
            responseData.messageResponse(res, 'No Data Found');
            }
          } catch (error) {
            responseData.errorResponse(res, error);
          }
    }
};


module.exports = newsCommentController;