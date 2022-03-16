const apiCall = require("../controllers/getChannel")

function NewSub(user, res, area) {
    return apiCall.getChannel().then(channelData => {
        if (Object.keys(area.action.lastRequest).length !== 0) {
            var oneleft = area.action.lastRequest.est_sub
            var now = channelData.est_sub
            if (now > oneleft) {
                res.status = true
                res.msg = "MrBeast go a new subscriber !"
                console.log("new sub!")
            }
        }
        console.log(channelData.est_sub)
        res.saved = true
        res.savedRequest = channelData
        return res
    })
}

function NewVid(user, res, area) {
    return apiCall.getChannel().then(channelData => {
        if (Object.keys(area.action.lastRequest).length !== 0) {
            var oneleft = area.action.lastRequest.table[1].count
            var now = channelData.table[1].count
            if (now > oneleft) {
                res.status = true
                res.msg = "New video from MrBeast has been posted !"
            }
        }
        res.saved = true
        res.savedRequest = channelData
        return res
    })
}

module.exports = { NewSub, NewVid }