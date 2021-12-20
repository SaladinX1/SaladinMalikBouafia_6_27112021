const express = require('express');
const auth = require('../middlewares/auth');
const sauceCtrl = require('../controllers/Sauce');
const router = express.Router();

router.post('/api/Sauces', auth, sauceCtrl.sauceCreation);

router.get('/api/Sauces', auth, sauceCtrl.saucesFind);

router.delete('/api/Sauces/:id', auth, sauceCtrl.sauceDelete);

//router.post('api/sauces/:id/like', auth, sauceCtrl.likeAndUnlike);



module.exports = router;