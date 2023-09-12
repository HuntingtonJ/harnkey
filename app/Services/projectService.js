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

  async createProject(name) {
    if (!this.validateName(name)) {
      throw new Error("Invalid project name");
    }

    let exists = await this.projects.getProjectByName(name);
    if (exists) {
      throw new Error("Project name already exists");
    }

    let project;

    try {
      project = await this.projects.createProject(name);
    } catch (error) {
      console.error(error);
    }

    return project;
  }

  validateName() {
    return true;
  }
};
