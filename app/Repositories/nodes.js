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
}

module.exports = Nodes;
