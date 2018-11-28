"use strict";

const router = require("express").Router();

const EntityClient = require("./entities");
const { mandatoryHeadersCheck } = require("../middlewares");

module.exports = function() {

    router.get("/v2/entities", mandatoryHeadersCheck, function(req, res) {

        const contextObject = {
            fiwareService: req.headers["fiware-service"],
            fiwareServicePath: req.headers["fiware-service-path"],
            authToken: req.headers["x-auth-token"]
        };
        
        let entityClient = new EntityClient();

        entityClient.getAllEntities(contextObject)
            .then((response) => {
                res.json(response);
            })
            .catch((error) => {
                res.json(error);
            });
    });

    return router;
};