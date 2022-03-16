exports.about = (req, res) => {
    const current_time =
    res.status(200).send(
        {
        "client": {
            "host": req.ip.split(':')[3]
        },
        "server": {
            current_time: Date.now(),
            "services": [{
                "name": "Weather",
                "actions": [{
                    "name": "Rain",
                    "description": "Send a message when it rains"
                }, {
                    "name": "Sun",
                    "description": "Send a message when the weather is good"
                }],
            }, {
                "name": "Crypto",
                "reactions": [{
                    "name": "BTC_UP",
                    "description": "Send a message when the BTC increases"
                }, {
                    "name": "BTC_DOWN",
                    "description": "Send a message when the BTC drops"
                }, {
                    "name": "ETH_UP",
                    "description": "Send a message when the ETH increases"
                }, {
                    "name": "ETH_DOWN",
                    "description": "Send a message when the ETH drops"
                }],
                "name": "GMAIL",
                "actions": [{
                    "name": "Email",
                    "description": "Receive an e-mail"
                }],
                "reactions": [{
                    "name": "Email",
                    "description": "Send an email"
                }],
            }, {
                "name": "Google Docs",
                "reactions": [{
                    "name": "Docs",
                    "description": "Generates a document"
                }],
            }, {
                "name": "Youtube",
                "actions": [{
                    "name": "New videos",
                    "description": "New video"
                }, {
                    "name": "New subscriber",
                    "description": "New subscriber"
                }],
            }, {
                "name": "Google Calendar",
                "actions": [{
                    "name": "Event",
                    "description": "Approaching event"
                }],
                "reactions": [{
                    "name": "Date",
                    "description": "Post action on current date"
                }],
            }]
        }
    });
}
