const db = require("./models");
const User = db.user;
const Area = db.area;

const cron = require('node-cron');
const dico = require("./AreaDictionary");
const { json } = require("body-parser");
const { Sequelize } = require("./models");

cron.schedule('* * * * *', function () {
    Area.findAll().then(array => {
        array.forEach(area => {
            if (area.isEnabled == true) {
                User.findOne({
                    where: {
                        id: area.ownerId
                    }
                }).then(user => {
                    callAction(area, user)
                    .then(res => {
                        if (res.saved) {
                            let newAction = area.action
                            newAction.lastRequest = res.savedRequest
                            Area.update({action: newAction},
                               {where: {
                                    id: area.id
                                }});
                        }
                        if (res.status) {
                            callReaction(area, user, res.msg)
                        }
                    })
                })
                .catch(err => {
                    console.log(err);
                });
            }
        });
    })
});

callAction = (area, user) => {
    let res = {
        status: false,
        msg: "",
        saved: false,
        savedRequest: {},
    }
    return dico.AreaDictionary[area.action.service.name].Actions[area.action.event.name].function(user, res, area).then(resd => {
        return resd
    })
}

const callReaction = (area, user, msg) => {
    dico.AreaDictionary[area.reaction.service.name].Reactions[area.reaction.event.name].function(user, area)
}