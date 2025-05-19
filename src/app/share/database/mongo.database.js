const { MongoClient } = require("mongodb");
const mongoConfig = require("../configs/db.conf");

class MongoDatabase {
  constructor() {
    const uri = mongoConfig.MongoURI;
    this.client = new MongoClient(uri); // Xóa các tùy chọn deprecated
    this.databaseName = mongoConfig.Database;
  }

  async connect() {
    try {
      if (!this.client.topology || !this.client.topology.isConnected()) {
        await this.client.connect();
        console.log("Connected to the MongoDB database 🍃");
      }
      return this.client.db(this.databaseName);
    } catch (err) {
      console.error("Error connecting to the MongoDB database", err);
      throw err;
    }
  }

  async query(collectionName, operation, ...args) {
    const db = await this.connect();
    const collection = db.collection(collectionName);
    try {
      if (typeof collection[operation] === "function") {
        return await collection[operation](...args);
      } else {
        throw new Error(`Invalid operation: ${operation}`);
      }
    } catch (err) {
      console.error("Error executing query", err);
      throw err;
    }
  }
}

module.exports = new MongoDatabase();
