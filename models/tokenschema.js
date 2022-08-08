module.exports = (sequelize, Sequelize) => {
  const tokenSchema = sequelize.define('token', {
  userId: {
    allowNull: false,
       
        type: Sequelize.INTEGER,
         required: true,
    
  },
  token: {
    type: Sequelize.STRING,
    required: true,
  },
  createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
});
  return tokenSchema;
};