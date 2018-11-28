"use strict";

var service = require("express")();

var { entitiesApi } = require("../components/entities");

module.exports = function() {

    service.use("/", entitiesApi);

    service.use((req, res, next) => {
        const error = new Error("Requested route not found");
        error.status = 404;
        next(error);
    });

    service.use((error, req, res, next) => {
        res.status(error.status || 500);
        res.json(error.message);
    });

    return service;
};