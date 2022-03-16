const fetch = require('node-fetch');

getWeather = () => {
    let city = "Los Angeles";
    return fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=ac970c1ff263d2b301bed6bdc9baefc3`)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                //console.log(data)
                return data;
            } else {
                return "Error: Weather call not worked"
            }
        }).catch(error => console.log(error));
}

module.exports= {getWeather}