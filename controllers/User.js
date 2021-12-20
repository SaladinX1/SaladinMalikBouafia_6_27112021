const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


exports.signup = (req, res) => {
    bcrypt.hash(req.body.password, 3, function (err, hash) {
        if (hash) {
            const user = new User({
                email: req.body.email,
                password: hash
            })
            user.save()
                .then(res.status(201).json({
                    message: 'Ressource utilisateur créée'
                }))
            // .catch(res.status(400).json({
            //     message: ' Une erreur est survenue du à une mauvaise requête'
            // }))
        } else {
            console.log(err => res.status(500).json({
                message: 'Une erreur est survenue du serveur'
            }))
        }
    });

};



exports.login = (req, res) => {
    User.findOne({
        email: req.body.email
    }, function (err, user) {
        console.log("Message user", user)
        if (!user) {
            return res.status(401).json({
                message: 'utilisateur non trouvé'
            })
        } else {
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({
                            message: 'Mot de passe incorrect'
                        })
                    }
                    return res.status(200).json({
                        userId: user._id,
                        token: jwt.sign({
                            userId: user._id
                        }, 'RANDOM_SECRET_TOKEN_KEY', {
                            expiresIn: '24h'
                        })
                    })
                })
            // .catch(res.status(500).json({
            //     message: 'Une erreur est survenue du serveur'
            // }))
        }
    })

};