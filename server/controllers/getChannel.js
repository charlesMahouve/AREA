const fetch = require('node-fetch');

const getChannel = async () => {
    return fetch(`https://api.socialcounts.org/youtube-live-subscriber-count/UCX6OQ3DkcsbYNE6H8uQQuVA`)
        .then(response => response.json())
        .then(resd => {
            if (resd) {
                channel = resd;
                return channel
            }
        }).catch((err) => {
            console.log(err)
        });
}

module.exports = { getChannel }