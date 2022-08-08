const db = require('../models');
const SignupSchema = require("../models/signup")(db.sequelize, db.Sequelize);
const Token = require("../models/tokenschema")(db.sequelize,db.Sequelize);
const sendEmail = require("../utils/sendMail");
const crypto = require("crypto");
const Joi = require("joi");
const bcrypt = require('bcrypt');
const saltRounds = 10;

const PasswordReset = async (req, res) => {
  // #swagger.tags = ['Reset password']
  /*    #swagger.parameters['obj'] = {
                in: 'body',
                description: 'Send reset password email.',
                schema: { $ref: '#/definitions/ResetPasswordSendEmail' }
        } */
  try {
    const schema = Joi.object({ email: Joi.string().email().required() });
    const { error } = schema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    await SignupSchema.findOne({ where: { email: req.body.email } }).then((user) => {
       if (!user)
        return res.status(400).send("user with given email doesn't exist");
       Token.findOne({ where: { userId: user.id } }).then((token) => {
        if (!token) {
      token = Token.create({
        userId: user.id,
        token: crypto.randomBytes(32).toString("hex"),
      })
      }
      const link = `http://localhost:3000/resetPassword/${user?.id}/${token?.token}`;
   sendEmail(user.email, "Your password has been reset", link);

    res.send("password reset link sent to your email account");
       }).catch((err) => {
        console.log(err)
      })
    
    }).catch((err) => {
      console.log(err.message)
    })
   

   
  
    
  } catch (error) {
    res.send({
      email: "Please enter your valid email address",
      error: error.message,
    });
  }
};

const passwordResetConfirmation = async (req, res) => {
  // #swagger.tags = ['Reset password']
  /*    #swagger.parameters['obj'] = {
                in: 'body',
                description: 'Set new password.',
                schema: { $ref: '#/definitions/ResetPasswordSet' }
        } */
  try {
    const schema = Joi.object({ password: Joi.string().required() });
    const { error } = schema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await SignupSchema.findById(req.params.userId);
    if (!user) return res.status(400).send("invalid link or expired");

    const token = await Token.findOne({where:{
      userId: user.id,
      token: req.params.token,
    }});
    if (!token) return res.status(400).send("Invalid link or expired");
    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
       user.password =hash ;
     user.save();
    token.delete();

    res.send("password reset sucessfully.");
});

    
  } catch (error) {
    res.send({
      message: "Please check your email and try again valid userId and token",
      error: error.message,
    });
  }
};

module.exports = { PasswordReset, passwordResetConfirmation };
