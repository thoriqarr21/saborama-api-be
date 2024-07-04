const express = require("express");
const router = express.Router();
const daerahController = require("../controller/daerah.controller");
const { validateDaerah } = require("../validators/daerah.validator");

router.get("/", daerahController.getAll);
router.get("/:daerahId", daerahController.getById);
router.post("/", validateDaerah, daerahController.create);
router.put("/:daerahId", validateDaerah, daerahController.update);
router.delete("/:daerahId", daerahController.delete);

module.exports = router;
