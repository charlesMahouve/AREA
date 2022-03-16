const db = require("../models");
const User = db.user;
const {google} = require('googleapis');



const oauth2Client = new google.auth.OAuth2(
    "833149036139-3kojd93tjv8renn78ccjeleo80noja8p.apps.googleusercontent.com",
    "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",
    "http://localhost:3000/redirect"
  );

exports.connect = (req, res) => {
    User.findOne({
        where: {
             id: req.userId
        }
    })
    .then(user => {
        if (!user) {
            return res.status(404).send({ message: "User Not found." });
        }
        user.services[req.body.serviceName].isConnected = true;
        if (req.body.serviceName == "Gmail" || req.body.serviceName == "Google_Calendar" || req.body.serviceName == "Google_Docs") {
            oauth2Client.getToken(req.body.token).then(tokens => {
                oauth2Client.setCredentials(tokens);
                user.services[req.body.serviceName].token = tokens.tokens.access_token;
                User.update(
                    { services: user.services },
                    { where: { id: req.userId } }
                  ).catch(err =>
                      console.log(err)
                    )
                res.status(200).send({message: "done", services: user.services});
            })
        } else {
            User.update(
                { services: user.services },
                { where: { id: req.userId } }
              ).catch(err =>
                  console.log(err)
                )
            res.status(200).send({message: "done", services: user.services});
        }
    })
    .catch(err => {
        res.status(500).send({ message: err.message });
    });
}

exports.geturl = (req, res) => {
    User.findOne({
        where: {
             id: req.userId
        }
    })
    .then(user => {
        if (!user) {
            return res.status(404).send({ message: "User Not found." });
        }
        //create url
          const scopes = [
            req.query.url,
          ];
          const url = oauth2Client.generateAuthUrl({
            // 'online' (default) or 'offline' (gets refresh_token)
            access_type: 'online',

            // If you only need one scope you can pass it as a string
            scope: scopes
          });
        res.status(200).send({message: "done", url: url});
    })
    .catch(err => {
        res.status(500).send({ message: err.message });
    });
}