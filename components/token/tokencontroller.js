const request = require("request-promise");

require('dotenv').config();

function getAccessToken(contextObject) {
    return request({
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Basic ${Buffer.from(`${process.env.FIWARE_IDM_CLIENTID}:${process.env.FIWARE_IDM_CLIENTSECRET}`, "utf8").toString("base64")}`,
        },
        uri: "http://localhost:8000/oauth2/token",
        json: true,
        body: `grant_type=password&username=${contextObject.username}&password=${contextObject.password}&client_id=${process.env.FIWARE_IDM_CLIENTID}&client_secret=${process.env.FIWARE_IDM_CLIENTSECRET}`,
        })
};

module.exports = {
    getAccessToken
};