const request = require("request-promise");

require('dotenv').config();

function getToken() {
    return request({
        method: "POST",
        uri: "http://localhost:8000/oauth2/token",
        headers: {
            "Content-Type": "application/json",
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Basic ${Buffer.from(`${process.env.FIWARE_IDM_CLIENTID}:${process.env.FIWARE_IDM_CLIENTSECRET}`, "utf8").toString("base64")}`,
        },
        body: `grant_type=password&username=${process.env.FIWARE_IDM_USER}&password=${process.env.FIWARE_IDM_PASSWORD}&client_id=${process.env.FIWARE_IDM_CLIENTID}&client_secret=${process.env.FIWARE_IDM_CLIENTSECRET}`,
        })
}


getToken()
    .then(res => console.log(res))
    .catch(err => console.log(err));