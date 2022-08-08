const express = require("express");
const router = express.Router();
const {
  getAllUserData,
  createUserData,
  deleteUserData,
  updateUserData,
} = require("../controllers/user.controllers");

router.get("/:email", getAllUserData);
router.post("/", createUserData);
router.patch("/:id", updateUserData);
router.delete("/:id", deleteUserData);

module.exports = router;
