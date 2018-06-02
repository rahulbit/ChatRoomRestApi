const express = require('express');
const router = express.Router();
const userController = require("./../../app/controllers/userController");
const appConfig = require("./../../config/appConfig")
const auth = require('./../middlewares/auth')
const chatRoomController = require('./../../app/controllers/chatRoomController')

module.exports.setRouter = (app) => {

    let baseUrl = `${appConfig.apiVersion}/users`;
    let baseurl = `${appConfig.apiVersion}/chatRoom`;


    app.post(`${baseUrl}/signup`, userController.signUpFunction);

    
    app.post(`${baseUrl}/login`, userController.loginFunction);

    
    app.post(`${baseUrl}/logout`, auth.isAuthorized, userController.logout);

       
    app.post(`${baseurl}/createRoom`, chatRoomController.createChatRoom);
      

     
    app.put(`${baseurl}/editRoom/:chatRoomId`, chatRoomController.editChatRoom);


    app.post(`${baseurl}/deleteRoom/:chatRoomId`,  chatRoomController.deleteChatRoom);
    

    app.get(`${baseurl}/listAll`,  chatRoomController.listAllRoom);
    

   app.get(`${baseurl}/forgot`,  chatRoomController.forgotPassword);

   

}
