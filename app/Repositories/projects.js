class Projects {
  constructor(db) {
    this.db = db;
  }

  async getProjects() {
    const [results, metadata] = await this.db.query(
      `
        SELECT * FROM Projects;
      `
    );
    return results;
  }

  async getProjectsById(id) {
    const [results, metadata] = await this.db.query(
      `
        SELECT * FROM Projects
        WHERE
          id = ${id};
      `
    );
    return results;
  }

  async getProjectByName(name) {
    const [results, metadata] = await this.db.query(
      `
        SELECT * FROM Projects
        WHERE
          name = ${name};
      `
    );
    return results;
  }
}

module.exports = Projects;
