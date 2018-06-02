
const socketio = require('socket.io');
const mongoose = require('mongoose');
const shortid = require('shortid');
const logger = require('./loggerLib.js');
const events = require('events');
const eventEmitter = new events.EventEmitter();
const tokenLib = require("./tokenLib.js");
const check = require("./checkLib.js");
const redis = require('./redisLib.js')
const response = require('./responseLib')
const ChatModel = mongoose.model('Chat');

const userModel = mongoose.model('User')

let setServer = (server) => {

    let allOnlineUsers = [];
    let currentChatUser = [];

    let io = socketio.listen(server);

    let myIo = io.of('/')

    myIo.on('connection', (socket) => {



        socket.on('enter-chat-room', function (room, user) {



            userModel.findOne({ email: user.email }, (err, result) => {
                if (err) {
                    logger.error('some error occured', 'socketlib', 10)
                }
                else {
                    let currentUser = user.data;

                    socket.userId = currentUser.userId
                    let fullName = `${currentUser.firstName} ${currentUser.lastName}`
                    let key = currentUser.userId
                    let value = fullName

                    let setUserOnline = redis.setUser('onlineUsers', key, value, (err, result) => {
                        if (err) {
                            console.log(`some error occurred`)
                        } else {


                            redisLib.getAllUsersInAHash('onlineUsers', (err, result) => {

                                if (err) {
                                    console.log(err)
                                } else {

                                    console.log(`${fullName} is online`);

                                    socket.join(room)
                                    socket.to(room).broadcast.emit('online-user-list', result);


                                }
                            })
                        }
                    })





                }
            })





        })



        socket.on('disconnect', function (room) {
            console.log('user is disconnected')
            console.log(socket.userId)

            if (socket.userId) {
                redisLib.deleteUserFromHash('onlineUsers', socket.userId)
                redisLib.getAllUsersInAHash('onlineUsers', (err, result) => {
                    if (err) {
                        console.log(err)
                    } else {
                        socket.leave(room)
                        socket.to(room).broadcast.emit('online-user-list', result);


                    }
                })

            }

        })





        socket.on('chat-msg', (data) => {
            console.log("socket chat-msg called")
            console.log(data);
            data['chatId'] = shortid.generate()
            console.log(data);

           
            setTimeout(function () {
                eventEmitter.emit('save-chat', data);

            }, 2000)
            myIo.emit(data.receiverId, data)

        });

        socket.on('typing', (fullName) => {

            socket.to(socket.room).broadcast.emit('typing', fullName);

        });




    });

}




eventEmitter.on('save-chat', (data) => {



    let newChat = new ChatModel({

        chatId: data.chatId,
        senderName: data.senderName,
        senderId: data.senderId,
        receiverName: data.receiverName || '',
        receiverId: data.receiverId || '',
        message: data.message,
        chatRoom: data.chatRoom || '',
        createdOn: data.createdOn

    });

    newChat.save((err, result) => {
        if (err) {
            console.log(`error occurred: ${err}`);
        }
        else if (result == undefined || result == null || result == "") {
            console.log("Chat Is Not Saved.");
        }
        else {
            console.log("Chat Saved.");
            console.log(result);
        }
    });

});

module.exports = {
    setServer: setServer
}
