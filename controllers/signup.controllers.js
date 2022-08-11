const nodemailer = require("nodemailer");
const sendEmail = require("../utils/sendMail");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const config = require("../config-env/config-env");
const db = require('../models');
const Signup = require('../models/signup')(db.sequelize, db.Sequelize);


const createSignup = async (req, res) => {
  // #swagger.tags = ['User authentication']
  /*    #swagger.parameters['obj'] = {
                in: 'body',
                description: 'User Signup.',
                schema: { $ref: '#/definitions/Signup' }
        } */
  const { email, password } = req.body;

  
  const subject = "Signup  email confirmation";
  const text =
    "Hello, Thank you for creating your Build API account.We look forward to readingyour posts and hope you will enjoy the space that we created for our customers.The  team";

  bcrypt.hash(password, saltRounds, async (err, hash) => {
    


   await Signup.create({
      email: email,
      password: hash,
    }).then((user) => {
      sendEmail(user.email, subject, text);
      const payload = {
        id: user.id,
        email: user.email,
      };
      const token = jwt.sign(payload, config.secret_jwt.secret_key, {
        expiresIn: "1d",
      });
      res.status(200).json({
        message: "User signup successfully saved",
        token: `Bearer ${token}`,
      });

    }).catch((error) => {
      console.log(error)
      res.status(500).send({
        error: error.message,
      });
    });

      
  });
    
};

module.exports = createSignup;