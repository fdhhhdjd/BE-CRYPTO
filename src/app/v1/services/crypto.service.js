const CryptoModel = require("../models/crypto.model");

class UserService {
  async getAllMarkets() {
    try {
      const result = await CryptoModel.getAllMarkets();
      return result;
    } catch (err) {
      console.error("Error in getAllMarkets:", err);
      throw err;
    }
  }
}

module.exports = new UserService();
