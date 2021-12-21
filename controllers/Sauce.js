const Sauce = require('../models/Sauce');

exports.sauceCreation = ((req, res, next) => {
    const sauce = new Sauce({
        ...req.body
    });
    sauce.save()
        .then(res.status(201).json({
            message: 'Sauce crée !'
        }))
        .catch(res.status(400).json({
            error
        }))
})

exports.saucesFind = ((req, res, next) => {
    Sauce.find()
        .then(products => res.status(200).json(products))
        .catch(error => res.status(400).json({
            error
        }))
})


exports.sauceDelete = ((req, res, next) => {
    Sauce.deleteOne({
            _id: req.params.id
        })
        .then(() => res.status(200).json({
            message: 'Objet supprimé !'
        }))
        .catch(error => res.status(404).json({
            error
        }))
})


// exports.likeAndUnlike = ((req, res, next) =>  {

// sauce.findOne({ _id: req.params.id})
// .then(sauce => {} )
//  let userLiked = [];
//  let userDisliked = [];

//     if ( req.body.like = 1 ) {

//      userId.push(userLiked);
//      userId.pop(userDisliked);

//     } else ( req.body.dislike = 1 ) {

//       userId.pop(userLiked);
//        userId.push(userDisliked);
//     }

// })