const model = require('../models/index');
const newsModel = model.News;
const userModel = model.User;
const responseData = require('../helpers/response');
const moment = require('moment');


const newsController = {
  createNews: async (req, res) => {
    try {
      const checkToken = req.headers.authorization.replace('Bearer ', '');
      const checkingUserData = await userModel.findOne({token: checkToken});
      if (checkingUserData) {
        const info = {
          headline: req.body.headline,
          news_content: req.body.news_content,
          user_id: checkingUserData._id,
        };

        const addNews = await newsModel.create(info);
        responseData.sendResponse(res, 'News Created Successfully', addNews);
      } else {
        responseData.messageResponse(res, 'Invalid Authentication Provided');
      }
    } catch (error) {
      responseData.errorResponse(res, error);
    }
  },

  updateNews: async (req, res) => {
    try {
      const checkToken = req.headers.authorization.replace('Bearer ', '');
      const checkingUserData = await userModel.findOne({token: checkToken});
      if (checkingUserData) {
        const {headline, news_content} = req.body;

        const query = {};
        if (headline) query.headline = headline;
        if (news_content) query.news_content = news_content;

        const updateNewsData = await newsModel.findByIdAndUpdate(
            {_id: req.params.id},
            {
              $set: {
                ...query,
              },
            },
            {new: true},
        );

        responseData.sendResponse(res, 'News Updated Successfully', updateNewsData);
      } else {
        responseData.messageResponse(res, 'Invalid Authentication Provided');
      }
    } catch (error) {
      responseData.errorResponse(res, error);
    }
  },


  getNewsDetails: async (req, res) => {
    try {
      const checkToken = req.headers.authorization.replace('Bearer ', '');
      const checkingUserData = await userModel.findOne({token: checkToken});
      if (checkingUserData) {
        const getData = await newsModel.find({user_id: checkingUserData._id, is_deleted: false});
        if (getData.length != 0) {
          responseData.sendResponse(res, 'News Details', getData);
        } else {
          responseData.messageResponse(res, 'No Data Found');
        }
      } else {
        responseData.messageResponse(res, 'Invalid Authentication Provided');
      }
    } catch (error) {
      responseData.errorResponse(res, error);
    }
  },


  filterTodayNews: async(req, res) => {
    try {
        const todayDateStart = moment().startOf('day').format();
        const todayDateEnd = moment().endOf('day').format();
        const newsData = await newsModel.aggregate([
            {
                "$match": {
                  "createdAt": {
                    "$gte": ISODate(new Date(new Date() - day * 60 * 60 * 24 * 1000))
                  }     
                }
            },
        ])
        console.log('newsData :', newsData);
    } catch (error) {
        responseData.errorResponse(res, error);
    }
  }
};


module.exports = newsController;
