const express = require('express');
const {userdata,Getusers,loginuser} = require("../controller/usertask");
const router = express.Router();

router.post("/",userdata);
router.get("/",Getusers);
router.patch("/",loginuser)
module.exports = router;