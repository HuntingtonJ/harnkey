const Projects = require("../Repositories/projects");
const Nodes = require("../Repositories/nodes");
const { isNull } = require("lodash");
const Links = require("../Repositories/links");

module.exports = class ProjectService {
  constructor(db) {
    this.db = db;
    this.projects = new Projects(db);
    this.nodes = new Nodes(db);
    this.links = new Links(db);
  }

  async getProjects() {
    let projects = await this.projects.getProjects();

    if (!projects) {
      throw new Error(`No projects found`);
    }

    return projects;
  }

  async getProjectById(id) {
    let valid = this.validateId(id);

    if (valid.error) {
      throw new Error(`Invalid project id: ${valid.message}`);
    }

    let project;

    try {
      project = await this.projects.getProjectById(id);
    } catch (error) {
      throw new Error(`Cannot retrieve project: project id = ${id}`);
    }

    return project;
  }

  async createProject(name) {
    let valid = this.validateName(name);

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
      console.error(error);
      throw new Error("Could not create project");
    }

    return project;
  }

  validateId(id) {
    let error = false;
    let message = "";

    if (typeof id !== "number" || isNaN(id)) {
      error = true;
      message = "id must be a number";
      return { error, message };
    }

    if (id < 0) {
      error = true;
      message = "id must be a positive number";
      return { error, message };
    }

    return true;
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

  async createNodes(projectId, nodes) {
    let projectIndex = null;
    let newNodes = [];

    try {
      let lastNode = await this.nodes.getLastNode(projectId);

      console.log(lastNode);

      projectIndex = 0;
      if (lastNode && lastNode.length > 0) {
        projectIndex = lastNode[0].projectIndex + 1;
      }
    } catch (error) {
      throw error;
    }

    if (isNull(projectIndex)) {
      throw new Error("Project index was not set");
    }

    if (!(nodes.length > 0)) {
      throw new Error("Nodes is an empty array");
    }

    for (const node of nodes) {
      let label = node.label;
      let color = node.color;
      let type = node.type;

      if (!label) {
        throw new Error("Missing label");
      }

      if (!color) {
        throw new Error("Missing color");
      }

      if (!type) {
        throw new Error("Missing type");
      }

      let newNode;

      try {
        newNode = await this.nodes.createNode(
          projectId,
          projectIndex,
          label,
          color,
          type
        );
      } catch (error) {
        throw error;
      }

      newNodes = [...newNodes, newNode];
      projectIndex++;
    }

    return newNodes;
  }

  async createLinks(projectId, links) {
    let newLinks = [];

    if (!(links.length > 0)) {
      throw new Error("Links is an empty array");
    }

    let valid;
    try {
      valid = await this.validateLinks(projectId, links);
    } catch (error) {
      throw error;
    }
    if (valid.error) {
      throw new Error(valid.message);
    }

    for (const link of links) {
      let sourceId = link.sourceId;
      let targetId = link.targetId;
      let count = link.count;
      let label = link.label;

      if (!targetId) {
        throw new Error("Missing targetId");
      }

      if (!sourceId) {
        throw new Error("Missing sourceId");
      }

      if (!count) {
        throw new Error("Missing count");
      }

      if (!label) {
        throw new Error("Missing label");
      }

      let newLink;

      try {
        newLink = await this.links.createLink(
          projectId,
          sourceId,
          targetId,
          count,
          label
        );
      } catch (error) {
        throw error;
      }

      newLinks = [...newLinks, newLink];
    }

    return newLinks;
  }

  async validateLinks(projectId, links) {
    let error = false;
    let message = "";

    let ids = [];
    // create an array of all unique source and target ids
    for (const link of links) {
      ids = [...ids, link.sourceId, link.targetId];
    }

    let uniqueIds = [...new Set(ids)];

    // check that unique ids belong to the project
    let nodes;
    try {
      nodes = await this.nodes.getNodes(projectId);
    } catch (error) {
      throw error;
    }

    if (!(nodes.length > 0)) {
      error = true;
      message = "This project does not have any nodes";

      return { error, message };
    }

    let nodeIds = [];
    for (const node of nodes) {
      nodeIds = [...nodeIds, node.id];
    }

    // uniqueIds must be a subset of nodeIds
    if (!this.isSubset(nodeIds, uniqueIds)) {
      error = true;
      message =
        "Links have source or target ids that do not belong to the project";

      return { error, message };
    }

    return true;
  }

  isSubset(superset, subset) {
    const supersetSet = new Set(superset);

    const isSubset = subset.every((id) => supersetSet.has(id));

    return isSubset;
  }
};
