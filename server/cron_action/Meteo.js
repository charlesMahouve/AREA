const apiCall = require("../controllers/getWeather")

function Sunny(user, res, area) {
    return apiCall.getWeather().then(weatherRes => {
        console.log(weatherRes)
        if (weatherRes.weather[0].main == "Clear") {
            res.status = true
            res.msg = "Sunny day in Los angeles today"
        }
        return res
    })
}

function Rainy(user, res, area) {
    return apiCall.getWeather().then(weatherRes => {
        console.log(weatherRes)
        if (weatherRes.weather[0].main == "Rain") {
            res.status = true
            res.msg = "Rainy day in Los angeles today"
        }
        return res
    })
}

module.exports= {Sunny, Rainy}