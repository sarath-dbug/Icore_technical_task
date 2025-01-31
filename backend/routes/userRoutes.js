const express = require("express");
const { getUsers, uploadUsers, exportUsers } = require("../controllers/userController");
const multer = require("multer");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();
const upload = multer();

router.use(authMiddleware);

router.get("/users", getUsers);
router.post("/uploadusers", upload.single("file"), uploadUsers);
router.get("/export-users", exportUsers);

module.exports = router;