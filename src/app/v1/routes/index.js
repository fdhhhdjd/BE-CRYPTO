const express = require("express");
const router = express.Router();

router.use("/crypto", require("./crypto"));

module.exports = router;
