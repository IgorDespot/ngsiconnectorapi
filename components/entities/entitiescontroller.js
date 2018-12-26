"use strict";

var request = require("request-promise");
var config = require("../../config");
const errors = require("../error");

var { 
    parseRawData
} = require("./entitiesservice");

function retriveAllEntities(contextObject) {
    return request({
        method: "GET",
        headers: {
            "Fiware-Service": contextObject.fiwareService,
            "Fiware-ServicePath": contextObject.fiwareServicePath,
            "X-Auth-Token": contextObject.authToken
        },
        uri: `${config.fiware.orion_url}/v2/entities?limit=${contextObject.entitiesAmount || 20 }`,
        json: true
    });
};

function retriveSingleEntity(contextObject) {
    return request({
        method: "GET",
        headers: {
            "Fiware-Service": contextObject.fiwareService,
            "Fiware-ServicePath": contextObject.fiwareServicePath,
            "X-Auth-Token": contextObject.authToken
        },
        uri: `${config.fiware.orion_url}/v2/entities?id=${contextObject.entityId}`,
        json: true
    });
};

function postEntitiesInBatchCreate(contextObject, data) {
    return request({
        method: "POST",
        headers: {
            "Fiware-Service": contextObject.fiwareService,
            "Fiware-ServicePath": contextObject.fiwareServicePath,
            "X-Auth-Token": contextObject.authToken
        },
        uri: `${config.fiware.orion_url}/v2/op/update`,
        body: {
            actionType: "APPEND",
            entities: data
        },
        json: true
    });
};

function postEntitiesInBatchUpdate(contextObject, data) {
    return request({
        method: "POST",
        headers: {
            "Fiware-Service": contextObject.fiwareService,
            "Fiware-ServicePath": contextObject.fiwareServicePath,
            "X-Auth-Token": contextObject.authToken
        },
        uri: `${config.fiware.orion_url}/v2/op/update`,
        body: {
            actionType: "UPDATE",
            entities: data
        },
        json: true
    });
};

async function createEntitiesBatch(contextObject) {

    try {

        var parsedData = await parseRawData(contextObject);
        
        var parsedDataForCreation = chunk(parsedData.res, config.ngsiconnectorapi.ngsi_chunk_size);
            
        var final = [];

        for (let single of parsedDataForCreation) {
            final.push(postEntitiesInBatchCreate(contextObject, single));
        }

        let orionErrorCheck = await Promise.all(final);

        return parsedData;

    } catch (error) {
        if (error.statusCode) {
            throw { code: error.statusCode, msg: {
                error: error.name,
                info: error.error.description
            }}
        }
        throw error;
    }
};

async function updateEntitiesBatch(contextObject) {

    try {

        var parsedData = await parseRawData(contextObject, contextObject.mode);
        
        var parsedDataForCreation = chunk(parsedData.res, 1);
            
        var final = [];

        for (let single of parsedDataForCreation) {
            final.push(postEntitiesInBatchUpdate(contextObject, single));
        }

        let orionErrorCheck = await Promise.all(final);

        return parsedData;

    } catch (error) {
        if (error.statusCode) {
            errors.fiwareOrionErrorHandle(error);
        }
        throw error;
    }
};

function chunk(array, size) {
    const chunked_arr = [];
    let copied = [...array];
    const numOfChild = Math.ceil(copied.length / size);
    for (let i = 0; i < numOfChild; i++) {
        chunked_arr.push(copied.splice(0, size));
    }
    return chunked_arr;
}

module.exports = {
    retriveAllEntities,
    retriveSingleEntity,
    createEntitiesBatch,
    updateEntitiesBatch
}