const check = require("./checkLib.js");
const redis = require('redis');

 let client = redis.createClient()

 client.on('connect', ()=>{
     console.log('redis lab succesfully connected')
 })

 let getAllUser =(name, callback)=>{
        client.HGETALL(name, (err, result)=>{
            if (err) {

                console.log(err);
                callback(err, null)
    
            } else if (check.isEmpty(result)) {
    
                console.log("online user list is empty");
                console.log(result)
    
                callback(null, {})
    
            } else {
    
                console.log(result);
                callback(null, result)
    
            }
        })
 }

 let setUser =(name , key , value, callback)=>{
     client.HSET(name ,[key, value],(err, result)=>{
        if (err) {
            console.log(err);
            callback(err, null)
        } else {

            console.log("user has been set in the hash map");
            console.log(result)
            callback(null, result)
        }
     })
 }

 let deleteUser =(name,key)=>{
       client.HDEL(name, key );
       return true;
 }

 module.exports={
     getAllUser:getAllUser,
     setUser:setUser,
     deleteUser:deleteUser
 }