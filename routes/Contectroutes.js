const express = require('express');
const router = express.Router();
const contectcontroller = require("../controller/Contectcontroller");

router.post('/contect' , contectcontroller.create);

module.exports = router;
