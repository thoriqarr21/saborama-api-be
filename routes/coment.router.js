const express = require("express");
const router = express.Router();
const comentController = require("../controller/coment.controller");
const { validateComent } = require("../validators/coment.validator");

router.post("/", validateComent, comentController.create);

module.exports = router;
