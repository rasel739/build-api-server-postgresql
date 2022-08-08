
const config = require('./config-env');
const { Sequelize,DataTypes } = require('sequelize');


const sequelize = new Sequelize(config.pgdb.database, config.pgdb.user, config.pgdb.password, {
  host: config.pgdb.host,
  dialect: config.pgdb.dialect,
  port: config.pgdb.port,
  logging: false,
  
});



try {
   sequelize.authenticate()
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}
  




module.exports = sequelize;