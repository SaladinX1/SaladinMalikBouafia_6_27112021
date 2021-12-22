const express = require('express');
const multer_config = require('../middlewares/multer-config')
const auth = require('../middlewares/auth');
const sauceCtrl = require('../controllers/Sauce');
const router = express.Router();

router.post('/sauces', multer_config, sauceCtrl.sauceCreation);

router.get('/sauces', sauceCtrl.saucesFind);

//router.put('/sauces/:id ', sauceCtrl.sauceUpdate);

//router.delete('/sauces/:id', sauceCtrl.sauceDelete);

//router.post('/api/sauces/:id/like', sauceCtrl.likeAndUnlike);



module.exports = router;