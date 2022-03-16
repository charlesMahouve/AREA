const db = require("../models");
const config = require("../config/auth");
const User = db.user;
const Role = db.role;
const Op = db.Sequelize.Op;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
    // Save User to Database
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
        services: {
            "Google_Calendar": {
                isConnected: false,
                token: "",
            },
            "Crypto": {
                isConnected: false,
                token: "",
            },
            "Google_Docs": {
                isConnected: false,
                token: "",
            },
            "Youtube": {
                isConnected: false,
                token: "",
            },
            "Meteo": {
                isConnected: false,
                token: "",
            },
            "Gmail": {
                isConnected: false,
                token: "",
            },
        },
        isGoogle: false,
    })
        .then(user => {
            if (req.body.roles) {
                Role.findAll({
                    where: {
                        name: {
                            [Op.or]: req.body.roles
                        }
                    }
                }).then(roles => {
                    user.setRoles(roles).then(() => {
                        res.send({ message: "User was registered successfully!" });
                    });
                });
            } else {
                // user role = 1
                user.setRoles([1]).then(() => {
                    res.send({ message: "User was registered successfully!" });
                });
            }
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.signin = (req, res) => {
    User.findOne({
        where: {
            username: req.body.username
        }
    })
        .then(user => {
            if (!user) {
                return res.status(404).send({ message: "User Not found." });
            }
            if (user.isGoogle) {
                return res.status(404).send({ message: "User Not found." });
            }
            var passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );
            if (!passwordIsValid) {
                return res.status(401).send({
                    accessToken: null,
                    message: "Invalid Password!"
                });
            }
            var token = jwt.sign({ id: user.id }, config.secret, {
                expiresIn: 86400 // 24 hours
            });
            var authorities = [];
            user.getRoles().then(roles => {
                for (let i = 0; i < roles.length; i++) {
                    authorities.push("ROLE_" + roles[i].name.toUpperCase());
                }
                res.status(200).send({
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    services: user.services,    
                    roles: authorities,
                    accessToken: token
                });
            });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.google = (req, res) => {
    User.findOne({
        where: {
            email: req.body.data.profileObj.email,
        }
    })
    .then(user => {
        if (!user) {
            User.create({
                username: req.body.data.profileObj.name,
                email: req.body.data.profileObj.email,
                password: bcrypt.hashSync(req.body.data.profileObj.email, 8),
                services: {
                    "Google_Calendar": {
                        isConnected: false,
                        token: "",
                    },
                    "Crypto": {
                        isConnected: false,
                        token: "",
                    },
                    "Google_Docs": {
                        isConnected: false,
                        token: "",
                    },
                    "Youtube": {
                        isConnected: false,
                        token: "",
                    },
                    "Meteo": {
                        isConnected: false,
                        token: "",
                    },
                    "Gmail": {
                        isConnected: false,
                        token: "",
                    },
                },
                isGoogle: true,
            })
            .then(created => {
                Role.findAll({
                    where: {
                        name: {
                            [Op.or]: ["user"]
                        }
                    }
                }).then(roles => {
                    created.setRoles(roles).then(() => {
                        var token = jwt.sign({ id: created.id }, config.secret, {
                            expiresIn: 86400 // 24 hours
                        });
                        var authorities = [];
                        created.getRoles().then(roles => {
                            for (let i = 0; i < roles.length; i++) {
                                authorities.push("ROLE_" + roles[i].name.toUpperCase());
                            }
                            res.status(200).send({
                                id: created.id,
                                username: created.username,
                                email: created.email,
                                services: created.services,    
                                roles: authorities,
                                accessToken: token
                            });
                        });
                    })
                });
            })
            .catch(err => {
                res.status(500).send({ message: err.message });
            });
        } else {

            var token = jwt.sign({ id: user.id }, config.secret, {
                expiresIn: 86400 // 24 hours
            });
            var authorities = [];
            user.getRoles().then(roles => {
                for (let i = 0; i < roles.length; i++) {
                    authorities.push("ROLE_" + roles[i].name.toUpperCase());
                }
                res.status(200).send({
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    services: user.services,    
                    roles: authorities,
                    accessToken: token
                });
            });
        }
    })
}