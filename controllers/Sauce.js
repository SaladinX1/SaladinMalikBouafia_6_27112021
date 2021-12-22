const Sauce = require('../models/Sauce');
const fs = require('fs');



exports.sauceCreation = (req, res) => {
    const ObjSauce = JSON.parse(req.body.sauce);
    delete ObjSauce._id;
    const sauceItem = new Sauce({
        ...ObjSauce,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        like: 0,
        dislike: 0,
        usersLiked: [' '],
        usersDisliked: [' ']
    });
    sauceItem.save()
        .then(res.status(201).json({
            message: 'Sauce crée !'
        }))
    // .catch(res.status(400).json({
    //     message: 'Erreur ! Mauvaise requête !'
    // }))
};


exports.uniqueSauce = (req, res, next) => {
    Sauce.findOne({
            _id: req.params.id
        })
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(404).json({
            error
        }));
}

exports.saucesFind = (req, res) => {

    Sauce.find()
        .then(products => res.status(200).json(products))
        .catch(error => res.status(400).json({
            message: `Votre sauce n'a pas pu être trouvée !`
        }))
};

exports.sauceUpdate = (req, res) => {
    const ObjSauce = req.file ? {
        ...JSON.parse(ObjSauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : {
        ...ObjSauce
    };
    Sauce.updateOne({
            _id: req.params.id
        }, {
            ...ObjSauce,
            _id: req.params.id
        })
        .then(() => res.status(200).json({
            message: 'Objet modifié !'
        }))
        .catch(error => res.status(400).json({
            message: 'Muvaise requête !'
        }));
};


exports.sauceDelete = (req, res, next) => {
    Sauce.findOne({
            _id: req.params.id
        })
        .then(thing => {
            const filename = thing.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                Sauce.deleteOne({
                        _id: req.params.id
                    })
                    .then(() => res.status(200).json({
                        message: 'Objet supprimé !'
                    }))
                    .catch(error => res.status(400).json({
                        message: 'Requête mauvaise!'
                    }));
            });
        })
        .catch(error => res.status(500).json({
            message: 'Erreur serveur !'
        }));
};


// exports.likeDislike = (req, res, next) => {

//     let like = req.body.like
//     let userId = req.body.userId
//     let sauceId = req.params.id

//     switch (like) {
//         case 1:
//             Sauce.updateOne({
//                     _id: sauceId
//                 }, {
//                     $push: {
//                         usersLiked: userId
//                     },
//                     $inc: {
//                         likes: +1
//                     }
//                 })
//                 .then(() => res.status(200).json({
//                     message: `J'aime`
//                 }))
//                 .catch((error) => res.status(400).json({
//                     error
//                 }))

//             break;

//         case 0:
//             Sauce.findOne({
//                     _id: sauceId
//                 })
//                 .then((sauce) => {
//                     if (sauce.usersLiked.includes(userId)) {
//                         Sauce.updateOne({
//                                 _id: sauceId
//                             }, {
//                                 $pull: {
//                                     usersLiked: userId
//                                 },
//                                 $inc: {
//                                     likes: -1
//                                 }
//                             })
//                             .then(() => res.status(200).json({
//                                 message: `Neutre`
//                             }))
//                             .catch((error) => res.status(400).json({
//                                 error
//                             }))
//                     }
//                     if (sauce.usersDisliked.includes(userId)) {
//                         Sauce.updateOne({
//                                 _id: sauceId
//                             }, {
//                                 $pull: {
//                                     usersDisliked: userId
//                                 },
//                                 $inc: {
//                                     dislikes: -1
//                                 }
//                             })
//                             .then(() => res.status(200).json({
//                                 message: `Neutre`
//                             }))
//                             .catch((error) => res.status(400).json({
//                                 error
//                             }))
//                     }
//                 })
//                 .catch((error) => res.status(404).json({
//                     error
//                 }))
//             break;

//         case -1:
//             Sauce.updateOne({
//                     _id: sauceId
//                 }, {
//                     $push: {
//                         usersDisliked: userId
//                     },
//                     $inc: {
//                         dislikes: +1
//                     }
//                 })
//                 .then(() => {
//                     res.status(200).json({
//                         message: `Je n'aime pas`
//                     })
//                 })
//                 .catch((error) => res.status(400).json({
//                     error
//                 }))
//             break;

//         default:
//             console.log(error);
//     }
// };