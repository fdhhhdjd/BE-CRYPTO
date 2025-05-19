const MongoDatabase = require("../../share/database/mongo.database");

class CryptoModel {
  async getAllMarkets() {
    try {
      const cursor = await MongoDatabase.query(
        "market_snapshot",
        "find",
        {},
        { sort: { timestamp: 1 } }
      );
      return await cursor.toArray(); // Convert the cursor to an array of documents
    } catch (err) {
      console.error("Error in getAllMarkets:", err);
      throw err;
    }
  }
}

module.exports = new CryptoModel();
