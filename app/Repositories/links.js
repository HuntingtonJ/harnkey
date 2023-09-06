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
}

module.exports = Links;
