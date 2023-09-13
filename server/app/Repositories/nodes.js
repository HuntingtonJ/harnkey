class Nodes {
  constructor(db) {
    this.db = db;
  }

  async getNodes(projectId) {
    const [results, metadata] = await this.db.query(
      `
        SELECT * FROM Nodes WHERE projectId = ${projectId} ORDER BY projectIndex ASC;
      `
    );
    return results;
  }

  async getLastNode(projectId) {
    const [results, metadata] = await this.db.query(
      `
        SELECT * FROM Nodes WHERE projectId = ${projectId} ORDER BY projectIndex DESC LIMIT 1;
      `
    );
  }

  async createNode(projectId, projectIndex, label, color, type = "default") {
    const [results, metadata] = await this.db.query(
      `
        INSERT INTO Nodes (projectId, projectIndex, label, color, type, createdAt, updatedAt) VALUES (${projectId}, ${projectIndex}, "${label}", "${color}", "${type}", now(), now());
      `
    );
    return results;
  }
}

module.exports = Nodes;
