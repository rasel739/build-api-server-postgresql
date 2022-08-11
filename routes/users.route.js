const express = require("express");
const router = express.Router();
const {
  getAllUserData,
  createUserData,
  deleteUserData,
  updateUserData,
} = require("../controllers/user.controllers");
const multer = require('multer');
const path = require('path');




const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './public/image/');
    },
  
    filename: function(req, file, cb) {
        cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
  
const upload = multer({ storage: storage })



router.get("/:email", getAllUserData);
router.post("/", upload.single("image"), createUserData);
router.patch("/:id", updateUserData);
router.delete("/:id", deleteUserData);

module.exports = router;
