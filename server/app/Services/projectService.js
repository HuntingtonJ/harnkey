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
    let valid = this.validateName(name);
    console.log(valid);
    if (valid.error) {
      throw new Error(`Invalid project name: ${valid.message}`);
    }

    let exists = await this.projects.getProjectByName(name);
    if (exists.length) {
      throw new Error("Project name already exists");
    }

    let project;

    try {
      project = await this.projects.createProject(name);
    } catch (error) {
      throw new Error("Could not create project");
    }

    return project;
  }

  validateName(name) {
    let error = false;
    let message = "";
    if (!(name.length > 0)) {
      error = true;
      message = "Name must be atleast 1 character";
      return { error, message };
    }

    if (!(name.length < 33)) {
      error = true;
      message = "Name must be less than 33 characters";
      return { error, message };
    }

    const re = new RegExp("^[a-zA-Z0-9_]*$");
    if (!name.match(re)) {
      error = true;
      message = "Name can only contain letters, numbers and underscores";
      return { error, message };
    }

    return true;
  }
};
