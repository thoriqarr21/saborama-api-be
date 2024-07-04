const express = require("express");
const router = express.Router();
const makananController = require("../controller/makanan.controller");
const { validateMakanan } = require("../validators/makanan.validator");

router.get("/", makananController.getAll);
router.get("/:id", makananController.getById);
router.post("/", validateMakanan, makananController.create);
router.put("/:id", validateMakanan, makananController.update);
router.delete("/:id", makananController.delete);

module.exports = router;
