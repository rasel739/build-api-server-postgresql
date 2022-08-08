module.exports = (sequelize, Sequelize) => {
  const SignupSchema = sequelize.define('Signup', {
  socialId: {
        type: Sequelize.STRING,
        
      required: true,
        defaultValue:null,
      },
  email: {
    type: Sequelize.STRING,
    unique:true,
    allowNull: false,
    validate: {
      isEmail: true,
      notEmpty:true,
    },
    
  },
  password: {
    type: Sequelize.STRING,
    defaultValue:null,
  }
});
  return SignupSchema;
};