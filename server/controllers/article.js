const Article = require("../models/article");

exports.createArticle = (req, res, next) => {
    const article = new Article({
        title: req.body.title,
        category: req.body.category,
        description: req.body.description,
        content: req.body.content,
        creator: req.userData.userId
    });
    article.save()
        .then(createdArticle => {
            res.status(201).json({
                message: "Article ajouté avec succès !",
                // articleId: createdArticle._id
                article: {
                    ...createdArticle,
                    id: createdArticle._id
                }
            });
        })
        .catch(error => {
            res.status(500).json({
                message: 'La création de l\'artice a échoué !'
            })
        })
};

exports.updateArticle = (req, res, next) => {
    const article = new Article({
        _id: req.body.id,
        title: req.body.title,
        category: req.body.category,
        // date: req.body.date,
        description: req.body.description,
        content: req.body.content,
        creator: req.userData.userId
    });
    Article.updateOne({_id: req.params.id, creator: req.userData.userId}, article)
        .then(result => {
            if (result.n > 0){
                res.status(201).json({
                    message: "Article mis à jour avec succès !",
                });
            } else {
                res.status(401).json({
                    message: "Non autorisé !",
                });
            }
        })
        .catch(error => {
            res.status(500).json({
                message: 'Impossible de mettre à jour l\'article !'
            })
        })
};

exports.getArticles = (req, res, next) => {
    Article.find()
        .then(documents => {
            res.status(200).json({
                message: 'Articles récupérés avec succès !',
                articles: documents
            })
        })
        .catch(error => {
            res.status(500).json({
                message: 'Échec de la récupération des articles !'
            })
        })
};

exports.getArticle = (req, res, next) => {
    Article.findById(req.params.id)
        .then(article => {
            if (article){
                res.status(200).json(article)
            } else {
                res.status(404).json({
                    message: 'Article non trouvé !'
                })
            }
        })
        .catch(error => {
            res.status(500).json({
                message: 'Échec de la récupération de l\'articles !'
            })
        })
};

exports.deleteArticle = (req, res, next) => {
    Article.deleteOne({ _id: req.params.id, creator: req.userData.userId })
        .then(result => {
            if (result.n > 0){
                res.status(201).json({
                    message: "Suppression réussie !",
                });
            } else {
                res.status(401).json({
                    message: "Non autorisé !",
                });
            }
        })
        .catch(error => {
            res.status(500).json({
                message: 'Impossible de supprimer cet article!'
            })
        })
}
