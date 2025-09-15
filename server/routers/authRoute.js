const express = require("express");
const router = express.Router();

const {test, loginUser, getUser, createUser} = require("../controller/authController");

router.get("/test", test);
router.post("/getUser", getUser);
router.post("/loginUser", loginUser);
router.post("/createUser", createUser);


module.exports = router