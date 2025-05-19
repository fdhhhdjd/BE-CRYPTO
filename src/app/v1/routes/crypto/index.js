const express = require("express");
const CryptoController = require("../../controllers/crypto.controller");
const router = express.Router();

router.get("/markets", CryptoController.getAllMarkets);

module.exports = router;
