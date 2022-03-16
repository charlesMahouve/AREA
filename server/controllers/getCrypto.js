const fetch = require('node-fetch');

getCrypto = (coin) => {
    return fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${coin}&vs_currencies=usd&include_last_updated_at=true`)
        .then(response => response.json())
        .then(data => {
            return fetch(`https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=usd&days=1'`)
                .then(response => response.json())
                .then(data2 => {
                    return {current: data[coin].usd, last: data2.prices[data2.prices.length-1][1] }
                })
                .catch(error => console.log(error));
        }).catch(error => console.log(error));
}

module.exports = { getCrypto }