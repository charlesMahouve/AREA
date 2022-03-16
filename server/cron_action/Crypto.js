const apiCall = require("../controllers/getCrypto")
const ctx = require("../AreaDictionary");

function btcUp(user, res, area) {
    return apiCall.getCrypto("bitcoin").then(data => {
        console.log(data)
        if (data.current > data.last) {
            res.msg = "Bitcoin is going up"
            res.status = true
        }
        return res
    })
}

function btcDown(user, res, area) {
    return apiCall.getCrypto("bitcoin").then(data => {
        console.log(data)
        if (data.current < data.last) {
            res.msg = "Bitcoin is going down"
            res.status = true
        }
        return res
    })
}

function ethUp(user, res, area) {
    return apiCall.getCrypto("ethereum").then(data => {
        console.log(data)
        if (data.current > data.last) {
            res.msg = "Ethereum is going up"
            res.status = true
        }
        return res
    })
}

function ethDown(user, res, area) {
    return apiCall.getCrypto("ethereum").then(data => {
        console.log(data)
        if (data.current < data.last) {
            res.msg = "Ethereum is going down"
            res.status = true
        }
        return res
    })
}


module.exports = { btcUp, btcDown, ethDown, ethUp }