const Sauce = require ('../models/sauce');

// exports.likeSauce = (req, res, next) => {
    exports.likeSauce = (req, res, next) => {
        // Pour la route READ = Ajout/suppression d'un like / dislike à une sauce
        // Like présent dans le body
        let like = req.body.like
        // On prend le userID
        let userId = req.body.userId
        // On prend l'id de la sauce
        let sauceId = req.params.id
      
        if (like === 1) { // Si il s'agit d'un like
          Sauce.updateOne({
              _id: sauceId
            }, {
              // On push l'utilisateur et on incrémente le compteur de 1
              $push: {
                usersLiked: userId
              },
              $inc: {
                likes: +1
              }, // On incrémente de 1
            })
            .then(() => res.status(200).json({
              message: 'j\'aime ajouté !'
            }))
            .catch((error) => res.status(400).json({
              error
            }))
        }
        if (like === -1) {
          Sauce.updateOne( // S'il s'agit d'un dislike
              {
                _id: sauceId
              }, {
                $push: {
                  usersDisliked: userId
                },
                $inc: {
                  dislikes: +1
                }, // On incrémente de 1
              }
            )
            .then(() => {
              res.status(200).json({
                message: 'Dislike ajouté !'
              })
            })
            .catch((error) => res.status(400).json({
              error
            }))
        }
        if (like === 0) { // Si il s'agit d'annuler un like ou un dislike
          Sauce.findOne({
              _id: sauceId
            })
            .then((sauce) => {
              if (sauce.usersLiked.includes(userId)) { // Si il s'agit d'annuler un like
                Sauce.updateOne({
                    _id: sauceId
                  }, {
                    $pull: {
                      usersLiked: userId
                    },
                    $inc: {
                      likes: -1
                    }, // On incrémente de -1
                  })
                  .then(() => res.status(200).json({
                    message: 'Like retiré !'
                  }))
                  .catch((error) => res.status(400).json({
                    error
                  }))
              }
              if (sauce.usersDisliked.includes(userId)) { // Si il s'agit d'annuler un dislike
                Sauce.updateOne({
                    _id: sauceId
                  }, {
                    $pull: {
                      usersDisliked: userId
                    },
                    $inc: {
                      dislikes: -1
                    }, // On incrémente de -1
                  })
                  .then(() => res.status(200).json({
                    message: 'Dislike retiré !'
                  }))
                  .catch((error) => res.status(400).json({
                    error
                  }))
              }
            })
            .catch((error) => res.status(404).json({
              error
            }))
        }
      }
