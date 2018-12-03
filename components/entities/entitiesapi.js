"use strict";

const router = require("express").Router();

const EntityClient = require("./entities");
const { mandatoryHeadersCheck } = require("../middlewares");

module.exports = function() {

    router.get("/v2/entities", mandatoryHeadersCheck, function(req, res) {

        const contextObject = {
            fiwareService: req.headers["fiware-service"],
            fiwareServicePath: req.headers["fiware-service-path"],
            authToken: req.headers["x-auth-token"],
            entitiesAmount: req.query.amount
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

    router.get("/v2/entities/:entityId", mandatoryHeadersCheck, function(req, res) {

        const contextObject = {
            fiwareService: req.headers["fiware-service"],
            fiwareServicePath: req.headers["fiware-service-path"],
            authToken: req.headers["x-auth-token"],
            entityId: req.params.entityId
        };

        let entityClient = new EntityClient();

        entityClient.getSingleEntity(contextObject)
            .then((response) => {
                if (response.length === 0)
                    return res.status(404).json(`The entity with id ${contextObject.entityId} referd in the request has not been found`);
                res.json(response);
            })
            .catch((error) => {
                if (error.statusCode === 401)
                    return res.status(401).json("Unauthorized access");
                res.json(error);
            });
    });

    return router;
};