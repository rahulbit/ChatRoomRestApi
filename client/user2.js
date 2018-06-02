// connecting with sockets.
const socket = io('http://localhost:3000');

const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RpZCI6InJrU3hEaEExWCIsImlhdCI6MTUyNzg1NDgyODc0MiwiZXhwIjoxNTI3OTQxMjI4LCJzdWIiOiJhdXRoVG9rZW4iLCJpc3MiOiJlZENoYXQiLCJkYXRhIjp7Im1vYmlsZU51bWJlciI6OTg3NjU0MzIxMCwiZW1haWwiOiJyYWh1bHBhcm1hckBnbWFpbC5jb20iLCJsYXN0TmFtZSI6IlJhbmphbiIsImZpcnN0TmFtZSI6IlJhaHVsICIsInVzZXJJZCI6IkhrZTVJajBrbSJ9fQ.fA16akJqfDuy9sFtIn7HycMCXKMwvXVN68PQpwr5S3Q"
const userId= "r1wcPsRJ7"
const email="rajeevparmar@gmail.com"
let chatMessage = {
  createdOn: Date.now(),
  receiverId: 'H1pOQGY9M',//putting user2's id here 
  receiverName: "rajeev parmar",
  senderId: userId,
  senderName: "Rahul Ranjan"
}

let chatSocket = () => {

  socket.on('verifyUser', (data) => {

    console.log("socket trying to verify user");

    socket.emit("set-user", email);

  });

  socket.on(userId, (data) => {

    console.log("you received a message from "+data.senderName)
    console.log(data.message)

  });

  socket.on("online-user-list", (data) => {

    console.log("Online user list is updated. some user can online or went offline")
    console.log(data)

  });


  $("#send").on('click', function () {

    let messageText = $("#messageToSend").val()
    chatMessage.message = messageText;
    socket.emit("chat-msg",chatMessage)

  })

  $("#messageToSend").on('keypress', function () {

    socket.emit("typing","Aditya Kumar")

  })

  socket.on("typing", (data) => {

    console.log(data+" is typing")
    
    
  });



}// end chat socket function

chatSocket();
