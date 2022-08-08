const express = require("express");
const {
  PasswordReset,
  passwordResetConfirmation,
} = require("../controllers/passwordreset.controllers");
const router = express.Router();

router.post("/", PasswordReset);
router.post("/:userId/:token", passwordResetConfirmation);

module.exports = router;
