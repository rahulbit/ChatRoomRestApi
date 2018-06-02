const  nodemailer = require('nodemailer')
const response = require('./../../app/libs/responseLib')

let sendWelcomeMail = (userInfo)=>{

    let transporter = nodemailer.createTransport({
        host:mail.google.com,
        port:587,
        secure:fase,
        auth:{
            user:'rahulparmark1993@gmail.com',
            pass:'1234'
        },
        tls:{
            rejectUnauthorized:false
        }
    });

    let mailOptions={
        from:'rahulparmark1993@gmail.com',
        to:userInfo.email,
        text : 'Welcome to chat room'
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent:', info.messageId);   
        console.log('Preview URL: ', nodemailer.getTestMessageUrl(info));
  
        res.send('contact', {msg:'Email has been sent'});
    });
    
}

let sendResetPassMail = (userInfo)=>{

    let transporter = nodemailer.createTransport({
        host:mail.google.com,
        port:587,
        secure:fase,
        auth:{
            user:'rahulparmark1993@gmail.com',
            pass:'1234'
        },
        tls:{
            rejectUnauthorized:false
        }
    });

    let mailOptions={
        from:'rahulparmark1993@gmail.com',
        to:userInfo.email,
        text : 'Click on the link to get the password',
        html:  '<a href="#">reset password</a>'
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent:', info.messageId);   
        console.log('Preview URL: ', nodemailer.getTestMessageUrl(info));
  
        res.send('contact', {msg:'Email has been sent'});
    });
    
}

module.exports={
    sendWelcomeMail:sendWelcomeMail,
    sendResetPassMail:sendResetPassMail
}