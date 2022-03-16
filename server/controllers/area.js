const db = require("../models");
const dico = require("../AreaDictionary")
const User = db.user;
const Area = db.area;

exports.create = (req, res) => {
    User.findOne({
        where: {
             id: req.userId
        }
    })
    .then(user => {
        if (!user) {
            return res.status(404).send({ message: "User Not found." });
        }
        Area.create({
            ownerId: user.id,
            isEnabled: req.body.isEnabled,
            action: req.body.action,
            reaction: req.body.reaction,
            description: req.body.description,
        })
        .then(area => {
            res.status(200).send({ message: "Done"});
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
    })
    .catch(err => {
        res.status(500).send({ message: err.message });
    });
}

exports.getareas = (req, res) => {
    Area.findAll( {
        where: {
            ownerId: req.userId
        }
    })
    .then(areas => { res.status(200).send(areas) })
    .catch(err => {
        res.status(500).send({ message: err.message });
    });
}

exports.getevents = (req, res) => {
    if (!req.query.area || !req.query.service)
        return res.status(500).send({ message: "Error: precise service"})
    else if (req.query.area == "Action") {
        return res.status(200).send( {Action: dico.AreaDictionary[req.query.service].Actions})
    } else if (req.query.area == "Reaction") {
        return res.status(200).send({Reaction: dico.AreaDictionary[req.query.service].Reactions})
    }
}

exports.enablearea = (req, res) => {
    Area.findOne({
        where: {
            id: req.query.areaid
        }
    })
    .then(area => {
        area.isEnabled = area.isEnabled ? false : true
        area.save()
        return res.status(200).send( {message: `Area ${req.query.areaid} is now ${area.isEnabled}`});
    })
    .catch(err => {
        return res.status(500).send({ message: err.message });
    })
}