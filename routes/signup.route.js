
const router = require("express").Router();
const createSignup = require('../controllers/signup.controllers');


  
router.post("/",createSignup);
  


module.exports = router;