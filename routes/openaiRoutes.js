const express = require("express");
const { botController } = require("../controllers/openiaController");

const router = express.Router();

//route
router.post("/bot", botController);

module.exports = router;
