"use strict";

const router = require("express").Router();

const EntityClient = require("./entities");
const { mandatoryHeadersCheck } = require("../middlewares");

const config = require("../../config");

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
                if (error.statusCode === 401)
                    return res.status(401).json("Unauthorized access");
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

    router.post("/v2/entities", mandatoryHeadersCheck, function(req, res) {
        if (!req.files[0])
            return res.status(404).json("The resource (file) not found");
        if (!config.ngsiconnectorapi.ngsi_allowed_files.includes(`.${req.files[0].originalname.split(".")[1]}`))
            return res.status(403).json(`The file with extention:.${req.files[0].originalname.split(".")[1]} is not supported.`)
        
        const contextObject = {
            data: req.files[0].buffer.toString(),
            ext: `.${req.files[0].originalname.split(".")[1]}`,
            mode: "strict",
            fiwareService: req.headers["fiware-service"],
            fiwareServicePath: req.headers["fiware-service-path"],
            authToken: req.headers["x-auth-token"]
        };

        let entityClient = new EntityClient();

        entityClient.createEntities(contextObject)
            .then((response) => {
                res.json(response)
            })
            .catch((error) => {
                res.status(error.code).json(error.msg);
            }); 
    });

    router.post("/v2/entities/update", mandatoryHeadersCheck, function(req, res) {
        if (!req.files[0])
            return res.status(404).json("The resource (file) not found");
        if (!config.ngsiconnectorapi.ngsi_allowed_files.includes(`.${req.files[0].originalname.split(".")[1]}`))
            return res.status(403).json(`The file with extention:.${req.files[0].originalname.split(".")[1]} is not supported.`)
        
        const contextObject = {
            data: req.files[0].buffer.toString(),
            ext: `.${req.files[0].originalname.split(".")[1]}`,
            mode: "update",
            fiwareService: req.headers["fiware-service"],
            fiwareServicePath: req.headers["fiware-service-path"],
            authToken: req.headers["x-auth-token"]
        };

        let entityClient = new EntityClient();

        entityClient.updateEntities(contextObject)
            .then((response) => {
                res.json(response)
            })
            .catch((error) => {
                console.log(error)
                res.status(error.code).json(error.msg);
            }); 
    });

    return router;
};