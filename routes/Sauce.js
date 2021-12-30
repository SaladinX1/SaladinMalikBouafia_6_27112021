const express = require('express');
const multer = require('../middlewares/multer-config');
const auth = require('../middlewares/auth');
const sauceCtrl = require('../controllers/Sauce');
const router = express.Router();

router.post('/', multer, sauceCtrl.sauceCreation);
router.get('/', sauceCtrl.saucesFind);
router.get('/:id', sauceCtrl.uniqueSauce);
router.put('/:id', multer, sauceCtrl.sauceUpdate);
router.delete('/:id', sauceCtrl.sauceDelete);
router.post('/:id/like', sauceCtrl.likeDislike);



module.exports = router;