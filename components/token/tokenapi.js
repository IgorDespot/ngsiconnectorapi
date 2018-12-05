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
                if (error.statusCode === 401)
                    return res.status(401).json("The request you have made requires authentication, check username/password");
                res.json(error);
            });
    });
    
    return router;
};