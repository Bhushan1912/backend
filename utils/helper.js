const crypto = require('crypto');

 // if node status code default is 401
 const sendError = (res,errorMessage,statusCode = 401) =>{
    return res.status(statusCode).json({error: errorMessage});
 }

 // if node status code default is 200
 const sendMessages = (res,statusMessage,statusCode = 200) =>{
    return res.status(statusCode).json({message: statusMessage});
 }

 // generate random number 
 const generateRandomBytes = () =>{
    return new Promise((resolve, reject) => {
        crypto.randomBytes(30, (err, buff) =>{
            if(err) reject(err);

            const buffString = buff.toString('hex');
            resolve(buffString);
        });   
    });
 }

 module.exports = {
    sendError,
    sendMessages,
    generateRandomBytes
 }