const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/User');
//const auth = require('../middlewares/auth');
//const multer = require('../middlewares/multer-config');



router.post('/login', userCtrl.login);
router.post('/signup', userCtrl.signup);





module.exports = router;