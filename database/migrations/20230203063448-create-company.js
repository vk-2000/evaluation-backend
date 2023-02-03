'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Companies', {
      id: {
        allowNull: false,
        // autoIncrement: true,
        primaryKey: true,
        type: Sequelize.STRING
      },
      sector: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      tags:{
        type: Sequelize.ARRAY(Sequelize.STRING)
      },
      ceo: {
        type: Sequelize.STRING
      },
      cpi: {
        type: Sequelize.DOUBLE
      },
      cf: {
        type: Sequelize.DOUBLE
      },
      mau: {
        type: Sequelize.DOUBLE
      },
      roic: {
        type: Sequelize.DOUBLE
      },
      score: {
        type: Sequelize.DOUBLE
      },
      description: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Companies');
  }
};