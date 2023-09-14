class Links {
  constructor(db) {
    this.db = db;
  }

  async getLinks(projectId) {
    const [results, metadata] = await this.db.query(
      `
        SELECT * FROM Links WHERE projectId = ${projectId};
      `
    );
    return results;
  }

  async createLink(projectId, sourceId, targetId, count, label) {
    const [results, metadata] = await this.db.query(
      `
        INSERT INTO Links (projectId, sourceId, targetId, count, label, createdAt, updatedAt) VALUES (${projectId}, ${sourceId}, ${targetId}, ${count}, "${label}", now(), now());
      `
    );
    return results;
  }
}

module.exports = Links;
