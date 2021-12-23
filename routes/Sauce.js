const express = require('express');
const multer_config = require('../middlewares/multer-config')
const auth = require('../middlewares/auth');
const sauceCtrl = require('../controllers/Sauce');
const router = express.Router();

router.post('/sauces', multer_config, sauceCtrl.sauceCreation);
router.get('/sauces', sauceCtrl.saucesFind);
router.get('/sauces/:id', sauceCtrl.uniqueSauce);
//router.put('/sauces/:id ', sauceCtrl.sauceUpdate);
//router.delete('/sauces/:id', sauceCtrl.sauceDelete);
//router.post('/sauces/:id/like', sauceCtrl.likeDislike);



module.exports = router;