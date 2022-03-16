const apiCall = require("../controllers/sendNewMail")

function SendMail(user, area) {
    apiCall.sendNewMail(user.services.Gmail.token, user).then(() => {

    })
}

module.exports= {SendMail}