"use strict";

const config = require("../../config");

function mandatoryHeadersCheck(req, res, next) {

    var log = config.log();
    var recivedHeaders = [];
    
    for(var key in req.headers) {
        if (config.ngsiconnectorapi.ngsi_mandatory_headers.includes(key))
            recivedHeaders.push(key);
    }

    if (recivedHeaders.length < 3) {
        log.info(`Failed to get all mandatory headers`);
        res.status(400).json("Missing one of mandatory headers, make sure Fiware-Service, Fiware-ServicePath and X-Auth-Token are present in headers.");
        return;
    }
    
    next();
};

module.exports = {
    mandatoryHeadersCheck,
}