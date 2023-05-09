require('dotenv').config();
const model = require('../models/index');
const userModel = model.User;
const responseData = require('../helpers/response');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const helper = require('../helpers/functions');


const userController = {

  signup: async (req, res) => {
    try {
      const info = {
        email: req.body.email,
        password: req.body.password,
      };
      const isUserExist = await userModel.findOne({email: info.email});
      if (!isUserExist) {
        info.password = await helper.HasPass(req.body.password);
        const createUser = await userModel.create(info);

        const authToken = jwt.sign({_id: createUser._id}, process.env.USER_PRIVATE_KEY);
        await userModel.updateOne({email: info.email}, {token: authToken});

        const responseInfo = {
          email: createUser.email,
          password: createUser.password,
          token: authToken,
        };

        responseData.sendResponse(res, 'User Created Successfully', responseInfo);
      } else {
        responseData.messageResponse(res, 'This Email Is Already In Use.');
      };
    } catch (error) {
      responseData.errorResponse(res, error);
    }
  },


  login: async (req, res) => {
    try {
      const findExist = await userModel.findOne({email: req.body.email});
      if (findExist) {
        const checkingPassword = bcrypt.compareSync(req.body.password, findExist.password);
        if (checkingPassword) {
          if (!findExist.is_deleted) {
            const authToken = jwt.sign({_id: findExist._id}, process.env.USER_PRIVATE_KEY);
            await userModel.updateOne({email: req.body.email}, {token: authToken});
            const isUserData = await userModel.findOne({email: req.body.email}).select(['-deletedAt', '-is_deleted', '-createdAt', '-updatedAt', '-__v']);
            responseData.sendResponse(res, 'User Login Successfully', isUserData);
          } else {
            responseData.messageResponse(res, 'Account Not Exist');
          }
        } else {
          responseData.messageResponse(res, 'Please check your password again');
        }
      } else {
        responseData.messageResponse(res, 'Please check your email again');
      }
    } catch (error) {
      responseData.errorResponse(res, error);
    }
  },

};


module.exports = userController;
