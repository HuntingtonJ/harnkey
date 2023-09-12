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
        SELECT * FROM Projects WHERE id = "${id}" AND deletedAt IS NULL;
      `
    );
    return results;
  }

  async getProjectByName(name) {
    const [results, metadata] = await this.db.query(
      `
        SELECT * FROM Projects WHERE name = "${name}";
      `
    );
    return results;
  }

  async createProject(name) {
    const [results, metadata] = await this.db.query(
      `
        INSERT INTO Projects (name, createdAt, updatedAt) VALUES ("${name}", now(), now());
      `
    );

    return results;
  }
}

module.exports = Projects;
