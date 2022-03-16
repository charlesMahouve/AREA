const apiCall = require("../controllers/getMail")

function MailRecieved(user, res, area) {
    return apiCall.getMail(user.services.Gmail.token).then(mailres => {
        console.log(mailres)
        console.log(area.action.lastRequest)
        if (Object.keys(area.action.lastRequest).length !== 0) {
            console.log(area.action.lastRequest.resultSizeEstimate)
            if (area.action.lastRequest.resultSizeEstimate < mailres.resultSizeEstimate) {
                res.status = true
                res.msg = "you got new Emails !"
                console.log("new mails")
            }
        }
        res.saved = true
        res.savedRequest = mailres
        console.log(res.savedRequest)
        return res
    })
}

module.exports= {MailRecieved}