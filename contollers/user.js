const { findOne } = require('../model/user');
const User = require('../model/user');
const EmailVerificationToken = require('../model/emailVerificationToken');
const { isValidObjectId } = require('mongoose');
const { generate_OTP, generateMailTransporter } = require('../utils/mail');
const { sendError, sendMessages, generateRandomBytes } = require('../utils/helper');
const PasswordResetToken = require('../model/passwordResetToken');

const createUser = async (req,res) =>{
    const {name, email, password} = req.body;
    console.log(email_id = email);
    const oldUser = await User.findOne({email});
    

    if(oldUser) return sendError(res,"this Email is Already exist !");

    const newUser = new User({name, email, password});
    await newUser.save();

    //generate 6 digit otp
    let OTP = generate_OTP();

    //store otp inside db
    const newEmailVerificationToken = new EmailVerificationToken({
        owner: newUser._id,
        token : OTP
    });

    await newEmailVerificationToken.save();
    //send otp to user

    var transport = generateMailTransporter();

    transport.sendMail({
        from:'bhushanwardha@gmail.com',
        to : newUser.email,
        subject:"Email Verification OTP",
        html:`
        <p>your verification code is</p>
        <h1>${OTP}</h1>
        `
    });

    sendMessages(res,"OTP send to your Email, Please verify your email!!");
    }

    const verifyEmail = async (req,res) =>{
       const {userId, OTP} = req.body;

       if(!isValidObjectId(userId)) return sendError(res,"Invalid User!");

       const user = await User.findById(userId);
       if (!user) return sendError(res,"User does not exist!"); 

       if (user.isVerified) return sendError(res,"User is already verified");

       const token = await EmailVerificationToken.findOne({owner : userId});
       if (!token) return sendError(res,"Token not found!",404);

       const isMatched = await token.compareToken(OTP);
       if (!isMatched) return sendError(res,"Please enter a valid OTP");

       user.isVerified = true;
       await user.save();

       await EmailVerificationToken.findByIdAndDelete(token._id);

       var transport = generateMailTransporter();

    transport.sendMail({
        from:'bhushanwardha@gmail.com',
        to : user.email,
        subject:"Email Verification RESULT",
        html:`
        
        <h1>Your Email is Verified</h1>
        `
    });
    sendMessages(res,"Your Email is Verified");
   
    }

    const resendEmailVerificationToken = async (req,res) => {
        const {userId} = req.body;
        
        const user = await User.findById(userId);
        console.log("id",user);
        if (!user) return sendError(res,"User does not exist!");

        if (user.isVerified) return sendError(res,"Email Id is Already verified! ");

        const alreadyHasToken= await EmailVerificationToken.findOne({owner : userId});

        if (alreadyHasToken) return sendError(res,"You can resend tOTP only after 10 min");

        //generate 6 digit otp
        let OTP = generate_OTP();
        //store otp inside db
        const newEmailVerificationToken = new EmailVerificationToken({
        owner: user._id,
        token : OTP
        });

        await newEmailVerificationToken.save();
        //send otp to user

        // var transport = generateMailTransporter();

        // transport.sendMail({
        //     from:'bhushanwardha@gmail.com',
        //     to : user.email,
        //     subject:"Email Verification OTP",
        //     html:`
        //     <p>your verification code is</p>
        //     <h1>${OTP}</h1>
        //     `
        // });
        sendMessages(res,"OTP send to your Email, Please verify your email!!");

    }

    const forgetPassword = async (req,res) =>{
        const {email} = req.body;
        if(!email) return sendError(res,"email is missing !");

        const user = await User.findOne({email});
        if(!user) return sendError(res, "User not found!", 404);

        const alreadyHasToken = await PasswordResetToken.findOne({owner : user._id});
        if(alreadyHasToken) return sendError(res,"You can Only Try For OTP after one hours");

        const token = await generateRandomBytes();

        const newPasswordResetToken = await PasswordResetToken({owner:user._id,token:token});
        await newPasswordResetToken.save();

        const passwordResetUrl = `http://localhost:3000/reset-password?token=${token}$id=${user._id}`;

        var transport = generateMailTransporter();

         transport.sendMail({
        from:'bhushanwardha@gmail.com',
        to : user.email,
        subject:"resetPasswordLink",
        html:`
        <p>Click here to reset Password link</p>
        <a href='${passwordResetUrl}'> Change Password</>
        `
        });

        sendMessages(res,"Password reset link send to your mail");
    }

module.exports = {
    createUser,
    verifyEmail,
    resendEmailVerificationToken,
    forgetPassword
};