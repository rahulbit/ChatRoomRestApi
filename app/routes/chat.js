const express = require('express');
const router = express.Router();
const chatController = require("./../../app/controllers/chatController");
const appConfig = require("./../../config/appConfig")
const auth = require('./../middlewares/auth')

module.exports.setRouter = (app) => {

  let baseUrl = `${appConfig.apiVersion}/chat`;

  app.get(`${baseUrl}/user`, auth.isAuthorized, chatController.getUsersChat);


  app.get(`${baseUrl}/group`, auth.isAuthorized, chatController.getGroupChat);

}
