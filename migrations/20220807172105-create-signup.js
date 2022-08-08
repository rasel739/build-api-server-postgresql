'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Signups', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      socialId: {
        type: Sequelize.STRING,
       
        required: true,
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
    await queryInterface.dropTable('Signups');
  }
};