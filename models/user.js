module.exports = (sequelize, Sequelize) => {
  const Userdata = sequelize.define('Userdata', {
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
    type: Sequelize.STRING,
    defaultValue:null
  }
});
  return Userdata;
};