const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {

    try {
        const token = req.headers.authorization.split(' ')[1];
        const VerifyToken = jwt.verify(token, 'RANDOM_SECRET_TOKEN_KEY');
        const userId = VerifyToken.userId;
        if (req.body.userId && req.body.userId != userId) {
            return res.status(403).json({
                message: 'requête non autorisée'
            })
        } else {
            next();
        }
    } catch {
        return res.status(401).json({
            error: new Error('la requête est invalide ! ')
        });

    }


}