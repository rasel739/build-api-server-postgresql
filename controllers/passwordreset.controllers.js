const db = require('../models');
const User = require("../models/signup")(db.sequelize, db.Sequelize);
const Token = require("../models/tokenschema")(db.sequelize,db.Sequelize);
const sendEmail = require("../utils/sendMail");
const crypto = require("crypto");
const bcrypt = require('bcrypt');
const saltRounds = 10;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;



const PasswordReset = async (req, res) => {
  // #swagger.tags = ['Reset password']
  /*    #swagger.parameters['obj'] = {
                in: 'body',
                description: 'Send reset password email.',
                schema: { $ref: '#/definitions/ResetPasswordSendEmail' }
        } */
 
  
  let email = await User.findOne({where: { email: req.body.email }});
  if (email == null) {
 
    return res.json({status: 'ok'});
  }
  
  await Token.update({
      used: 1
    },
    {
      where: {
        email: req.body.email
      }
  });
 
  //Create a random reset token
  let fpSalt = crypto.randomBytes(64).toString('hex');
 
  //token expires after one hour
  let expireDate = new Date(new Date().getTime() + (60 * 60 * 1000))
 
  //insert token data into DB
  await Token.create({
    email: req.body.email,
    expiration: expireDate,
    token: fpSalt,
    used: 0
  }).then((token) => {
    
    const link = `http://localhost:3000/resetPassword/${token.token}`;
   sendEmail(token.email, "Your password has been reset", link);

  }).catch((err) => {
    
    console.log(err)
  })
 
   
 
  return res.json({status: 'ok'});
  
  
     

    
};

const passwordResetConfirmation = async (req, res) => {
  // #swagger.tags = ['Reset password']
  /*    #swagger.parameters['obj'] = {
                in: 'body',
                description: 'Set new password.',
                schema: { $ref: '#/definitions/ResetPasswordSet' }
        } */
  
  //compare passwords
  // if (req.body.password1 !== req.body.password2) {
  //   return res.json({status: 'error', message: 'Passwords do not match. Please try again.'});
  // }
 
  /**
  * Ensure password is valid (isValidPassword
  * function checks if password is >= 8 chars, alphanumeric,
  * has special chars, etc)
  **/
  // if (!isValidPassword(req.body.password)) {
  //   return res.json({status: 'error', message: 'Password does not meet minimum requirements. Please try again.'});
  // }
 
  let record = await Token.findOne({
    where: {
      email: req.body.email,
      expiration: { [Op.gt]: Sequelize.fn('CURDATE')},
      token: req.body.token,
      used: 0
    }
  });
 
  if (record == null) {
    return res.json({status: 'error', message: 'Token not found. Please try the reset password process again.'});
  }
 
  let upd = await Token.update({
      used: 1
    },
    {
      where: {
        email: req.body.email
      }
  });
 
 bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
     User.update({
    password:hash,
    
  },
  {
    where: {
      email: req.body.email
    }
  });
 
  return res.json({status: 'ok', message: 'Password reset. Please login with your new password.'});
});
  
};

module.exports = { PasswordReset, passwordResetConfirmation };



