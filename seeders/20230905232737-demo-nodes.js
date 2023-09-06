module.exports = {
  async up(queryInterface, Sequelize) {
    const id = await queryInterface.rawSelect(
      "Projects",
      {
        where: {
          Name: "DEMO",
        },
      },
      ["id"]
    );

    if (!id) {
      throw new Error("Project could not be found");
    }

    await queryInterface.bulkInsert("Nodes", [
      {
        projectId: id,
        label: "A1",
        color: "blue",
        type: "default",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        projectId: id,
        label: "A2",
        color: "blue",
        type: "default",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        projectId: id,
        label: "B1",
        color: "red",
        type: "default",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        projectId: id,
        label: "B2",
        color: "red",
        type: "default",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        projectId: id,
        label: "C1",
        color: "orange",
        type: "default",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        projectId: id,
        label: "C2",
        color: "orange",
        type: "default",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Nodes", null, {});
  },
};
