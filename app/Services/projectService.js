const Projects = require("../Repositories/projects");

module.exports = class ProjectService {
  constructor(db) {
    this.db = db;
    this.projects = new Projects(db);
  }

  async getProjects() {
    let projects = await this.projects.getProjects();

    if (!projects) {
      throw new Error(`No projects found`);
    }

    return projects;
  }
};
