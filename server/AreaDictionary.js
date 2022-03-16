const Meteo = require("./cron_action/Meteo")
const Crypto = require('./cron_action/Crypto')
const Youtube = require('./cron_action/Youtube')
const GmailA = require("./cron_action/Gmail")
const GmailR = require("./cron_reaction/Gmail")


const AreaDictionary = {
    Meteo: {
        Actions: {
            Sunny: {
                id: 1,
                name: "Sunny",
                desc: "Do the reaction if its sunny outside",
                function: Meteo.Sunny,
            },
            Rainy: {
                id: 2,
                name: "Rainy",
                desc: "Do the reaction if its rainy outside",
                function: Meteo.Rainy,
            }
        },
        Reactions: {

        }
    },
    Crypto: {
        Actions: {
            BtcUp: {
                id: 1,
                name: "BtcUp",
                desc: "Do reaction if BTC is going up",
                function: Crypto.btcUp,
            },
            BtcDown: {
                id: 2,
                name: "BtcDown",
                desc: "Do reaction if BTC is going down",
                function: Crypto.btcDown,
            },
            EthUp: {
                id: 3,
                name: "EthUp",
                desc: "Do reaction if ETH is going up",
                function: Crypto.ethUp,
            },
            EthDown: {
                id: 4,
                name: "EthDown",
                desc: "Do reaction if ETH is going down",
                function: Crypto.ethDown,
            }
        }
    },
    Youtube: {
        Actions: {
            NewSub: {
                id: 1,
                name: "NewSub",
                desc: "Do reaction if new subscriber",
                function: Youtube.NewSub,
            },
            NewVid: {
                id: 2,
                name: "NewVid",
                desc: "Do reaction if new video posted",
                function: Youtube.NewVid,
            }
        }
    },
    Gmail: {
        Actions: {
            RecieveMail: {
                id: 1,
                name: "RecieveMail",
                desc: "Do reaction if you recieved a mail",
                function: GmailA.MailRecieved,
            }
        },
        Reactions: {
            SendMail: {
                id: 1,
                name: "SendMail",
                desc: "Send and email to yourself",
                function: GmailR.SendMail,
            }
        }
    },
    Google_Calendar: {
        Reactions: {
            NewEvent: {
                id: 1,
                name: "NewEvent",
                desc: "Create new event on current time",
                function: undefined,
            }
        }
    }
}

let AreaContext = {
    Crypto: {
        bitcoin: undefined,
        ethereum: undefined,
    }
}

module.exports = {AreaDictionary, AreaContext}