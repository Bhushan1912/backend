const nodemailer = require('nodemailer');

const CLIENT_ID = "991811859427-iikkiabvdv80ktnrl9toqvjkdphd2p20.apps.googleusercontent.com";

const CLIENT_SECRET = "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";




//we set default value 6, we can change it by pasing value at the time of function calling
const generate_OTP = (otp_length = 6) =>{
    let OTP = '';
    for(let i = 1 ; i <= otp_length ; i++){
        OTP = OTP + Math.round(Math.random()*9)
    }
    return OTP;
}

//for mail trap
// const generateMailTransporter = () =>
// nodemailer.createTransport({
//     host: "sandbox.smtp.mailtrap.io",
//     port: 2525,
//     auth: {
//         user: "e3adfb4fc7eec8",
//         pass: "b16735d256e661"
//     }
//   });

//for gmail
const generateMailTransporter = () =>
nodemailer.createTransport({
    service: "gmail",
    auth: {
        type: 'OAuth2',
        user: "mude.bhushan@gmail.com",
        clientId:CLIENT_ID,
        clientSecret:CLIENT_SECRET,
        accessToken:"ya29.a0AWY7Ckn8LAeuijKXtSHLZpnryCrXm5f9TNPBnKl98g9ZCH5yKU1-xW7UHHmGVi-18yeq8OMtdHbJfiPx3zN8lb4Q6EE105k48DntaeQ7K7es3tixLmn41t_CmtodJapJ5OfO-zbh1PWqX6wX8RaLBMUU2AWdaCgYKAToSARMSFQG1tDrpbqid_n3Ndmv1Q-7O0HP2Og0163"
    },
  });

module.exports = {
    generate_OTP,
    generateMailTransporter
}