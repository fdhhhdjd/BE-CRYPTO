const mongoConfig = {
  MongoURI: process.env.MONGO_URI,
  Database: process.env.MONGO_DB,
};

module.exports = mongoConfig;
