const express = require('express');
const multer = require('../middlewares/multer-config');
const auth = require('../middlewares/auth');
const sauceCtrl = require('../controllers/Sauce');
const router = express.Router();

router.post('/', auth, multer, sauceCtrl.sauceCreation);
router.get('/', auth, sauceCtrl.saucesFind);
router.get('/:id', auth, sauceCtrl.uniqueSauce);
router.put('/:id', auth, multer, sauceCtrl.sauceUpdate);
router.delete('/:id', auth, sauceCtrl.sauceDelete);
router.post('/:id/like', auth, sauceCtrl.likeDislike);



module.exports = router;