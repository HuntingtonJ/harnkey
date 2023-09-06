"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Links", [
      {
        sourceId: 1,
        targetId: 3,
        label: null,
        count: 8,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        sourceId: 2,
        targetId: 4,
        label: null,
        count: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        sourceId: 1,
        targetId: 4,
        label: null,
        count: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        sourceId: 3,
        targetId: 5,
        label: null,
        count: 8,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        sourceId: 4,
        targetId: 5,
        label: null,
        count: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        sourceId: 4,
        targetId: 6,
        label: null,
        count: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Links", null, {});
  },
};
