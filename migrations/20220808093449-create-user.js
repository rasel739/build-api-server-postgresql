'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Userdata', {
      id: {
        
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING,
        allowNull: false,
        unique:true,
        validate: {
          notEmpty:true,
          
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
        type:Sequelize.STRING,
        defaultValue:null
        
        
        
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Userdata');
  }
};