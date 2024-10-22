'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Themes',
      [
        {
          name: 'История',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Наука',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Культура и Искусство',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Спорт',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Themes', null, {});
  },
};
