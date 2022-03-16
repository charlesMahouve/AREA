const fetch = require('node-fetch');

const getMail = (token) => {
    return fetch(`https://www.googleapis.com/gmail/v1/users/me/messages?q=${encodeURI("is:unread")}&access_token=${token}`)
        .then(response => response.json())
        .then(data => {
            return data
        }).catch(error => console.log(error));
}

module.exports = { getMail }