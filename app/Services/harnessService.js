const Projects = require("../Repositories/projects");
const Nodes = require("../Repositories/nodes");
const Links = require("../Repositories/links");

module.exports = class HarnessService {
  constructor(db) {
    this.projects = new Projects(db);
    this.nodes = new Nodes(db);
    this.links = new Links(db);
  }

  async getHarness(name) {
    const projectId = await this.getProjectId(name);
    const nodes = await this.getNodes(projectId);
    const links = await this.getLinks(projectId);

    if (!nodes || !links) {
      throw new Error(`Nodes or Links undefined`);
    }
    this.linkNodes(nodes, links);

    return { nodes, links };
  }

  async getProjectId(name) {
    if (typeof name != "string") {
      throw new Error("Name is not a string");
    }

    try {
      const project = await this.projects.getProjectByName(name);

      if (!project[0]) {
        throw new Error("Name does not exist");
      }

      const projectId = await project[0].id;
      return projectId;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getNodes(projectId) {
    const nodes = await this.nodes.getNodes(projectId);

    if (!nodes[0]) {
      throw new Error(`Cannot find nodes for projectId: ${projectId}`);
    }

    return nodes;
  }

  async getLinks(projectId) {
    const links = await this.links.getLinks(projectId);

    if (!links[0]) {
      throw new Error(`Cannot find links for projectId: ${projectId}`);
    }

    return links;
  }

  linkNodes(nodes, links) {
    for (const link of links) {
      link.sourceIndex = this.getNodeById(link.sourceId, nodes).projectIndex;
      link.targetIndex = this.getNodeById(link.targetId, nodes).projectIndex;

      if (link.sourceIndex < 0 || link.targetIndex < 0) {
        throw new Error(`Failed to get nodes for linkId: ${link.id}`);
      }
    }
  }

  getNodeById(index, nodes) {
    for (const node of nodes) {
      if (node.id === index) {
        return node;
      }
    }

    return -1;
  }
};
