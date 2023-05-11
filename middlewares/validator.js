const { check, validationResult } = require('express-validator');

const userValidator = [
    check("name").trim().not().isEmpty().withMessage("Name is Missing !"),
    check("email").isEmail().withMessage("Enter Proper Email Address"),
    check("password")
    .trim()
    .not()
    .isEmpty()
    .withMessage("password is Missing !")
    .isLength({min:5, max:20})
    .withMessage("password is between 5 to 20 character")
];

const validate = (req,res,next)=>{
    const error = validationResult(req).array();
    console.log(error);
    if(error.length){
        return res.json({error: error[0].msg})
    }
    next();
}

module.exports = {userValidator,validate}
