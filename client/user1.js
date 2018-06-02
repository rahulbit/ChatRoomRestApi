// connecting with sockets.
const socket = io('http://localhost:3000');

const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqd3RpZCI6IkgxOHBQM0NKWCIsImlhdCI6MTUyNzg1NTAzODQ1OCwiZXhwIjoxNTI3OTQxNDM4LCJzdWIiOiJhdXRoVG9rZW4iLCJpc3MiOiJlZENoYXQiLCJkYXRhIjp7Im1vYmlsZU51bWJlciI6OTg2NTc4MzQ1MjEsImVtYWlsIjoicmFqZWV2bHBhcm1hckBnbWFpbC5jb20iLCJsYXN0TmFtZSI6InBhcm1hciIsImZpcnN0TmFtZSI6InJhamVldiIsInVzZXJJZCI6InIxd2NQc1JKNyJ9fQ.InuTDGlnXyyyU53nczzeDE6Z5ejcgYlRTk-K3_BWqSo"
const userId = "r1wcPsRJ7"

const email = "rahulparmar@gmail.com"
const roomId ="abc123"

let chatMessage = {
  createdOn: Date.now(),
  receiverId: 'Hke5Ij0km',//putting user2's id here 
  receiverName: "Rahul Ranjan",
  senderId: userId,
  senderName: "rajeev parmar"
}

let chatSocket = () => {

  socket.on('verifyUser', (data) => {

    console.log("socket trying to verify user");

    socket.emit("set-user", email );

  });

  socket.on(userId, (data) => {

    console.log("you received a message from "+data.senderName)
    console.log(data.message)

  });

  socket.on("online-user-list", (data) => {

    console.log("Online user list is updated. some user can online or went offline")
    console.log(data)

  });

  socket.on("typing", (data) => {

    console.log(data+" is typing")
    
    
  });

  $("#send").on('click', function () {

    let messageText = $("#messageToSend").val()
    chatMessage.message = messageText;
    socket.emit("chat-msg",chatMessage)

  })

  $("#messageToSend").on('keypress', function () {

    socket.emit("typing","Mr Xyz")

  })




}// end chat socket function

chatSocket();
