'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Rooms', 'answers', {
      type: Sequelize.JSONB,
      defaultValue: {questions: []},
    });
    await queryInterface.addColumn('Rooms', 'status', {
      type: Sequelize.STRING,
      defaultValue: 'play',
    });
    await queryInterface.addColumn('Rooms', 'total', {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('Rooms', 'answers');
    await queryInterface.removeColumn('Rooms', 'status');
    await queryInterface.removeColumn('Rooms', 'total');
  },
};
