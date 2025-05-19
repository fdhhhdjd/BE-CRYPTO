const CryptoService = require("../services/crypto.service");

class CryptoController {
  async getAllMarkets(req, res) {
    try {
      const result = await CryptoService.getAllMarkets(req);
      return res.status(200).json(result);
    } catch (err) {
      return res.status(500).send({
        message: err.message,
      });
    }
  }
}

module.exports = new CryptoController();
