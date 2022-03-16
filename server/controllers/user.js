const db = require("../models");
const User = db.user;
const Area = db.area;

exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
};
exports.userBoard = (req, res) => {
    res.status(200).send("User Content.");
};
exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
};
exports.moderatorBoard = (req, res) => {
    res.status(200).send("Moderator Content.");
};
exports.getUsers = (req, res) => {
    User.findAll().then(user => {
        res.status(200).send(user)
    });
};
exports.getAreas = (req, res) => {
    Area.findAll().then(user => {
        res.status(200).send(user)
    });
};