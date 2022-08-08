
module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define('User', {
    name: {
      type: Sequelize.STRING,
      
    },
    phone: {
      type: Sequelize.STRING,
      validate: {
        
        notEmpty: true,
        
      }
    },
  email: {
    type: Sequelize.STRING,
    
    allowNull: false,
    validate: {
      isEmail: true,
      notEmpty:true,
    },
    
  },
  image: {
    type: Sequelize.BLOB('long'),
    defaultValue:null,
  }
});
  return User;
};


