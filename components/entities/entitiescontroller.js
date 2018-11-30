"use strict";

var request = require("request-promise");
var config = require("../../config");

function retriveAllEntities(contextObject) {
    return request({
        method: "GET",
        headers: {
            "Fiware-Service": contextObject.fiwareService,
            "Fiware-ServicePath": contextObject.fiwareServicePath,
            "X-Auth-Token": contextObject.xAuth
        },
        uri: `${config.fiware.orion_url}/v2/entities?limit=${contextObject.entitiesAmount || 20 }`,
        json: true
    });
};



module.exports = {
    retriveAllEntities,
}