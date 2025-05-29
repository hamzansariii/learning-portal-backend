'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('participants', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      synopsis: {
        type: Sequelize.STRING,
        allowNull: false
      },
      score: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      feedback: {
        type: Sequelize.STRING,
        allowNull: true
      },
      isReviewed: {
        type: Sequelize.BOOLEAN,
        defaultValue: 0
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
    await queryInterface.sequelize.query(`
      ALTER TABLE participants 
      ADD FULLTEXT(title, synopsis);
    `);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('participants');
  }
};