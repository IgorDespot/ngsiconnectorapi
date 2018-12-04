"use strict";

const router = require("express").Router();

const TokenClient = require("./token");

module.exports = function() {
    
    router.get("/v2/token", function(req, res) {

        var decodeAuthHeader = new Buffer.from(req.headers.authorization.split(" ")[1], 'base64').toString().split(":");
        
        var contextObject = {
            username: decodeAuthHeader[0],
            password: decodeAuthHeader[1],
        };

        var tokenClient = new TokenClient();

        tokenClient.getAccessToken(contextObject)
            .then((response) => {
                res.json(response);
            })
            .catch((error) => {
                res.json(error);
            });
    });
    
    return router;
};