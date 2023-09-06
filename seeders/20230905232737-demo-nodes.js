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
        projectIndex: 0,
        label: "A1",
        color: "blue",
        type: "default",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        projectId: id,
        projectIndex: 1,
        label: "A2",
        color: "blue",
        type: "default",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        projectId: id,
        projectIndex: 2,
        label: "B1",
        color: "red",
        type: "default",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        projectId: id,
        projectIndex: 3,
        label: "B2",
        color: "red",
        type: "default",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        projectId: id,
        projectIndex: 4,
        label: "C1",
        color: "orange",
        type: "default",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        projectId: id,
        projectIndex: 5,
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
