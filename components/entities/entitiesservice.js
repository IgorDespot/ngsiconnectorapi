"use strict";

const csvparser = require("csvtojson");
const entityrule = require("../../rules");

async function parseRawData(contextObject, mode) {

    var data = await parseDataOnExt(contextObject);
    var rule = await getrule(data[0].type);
    var result = await processData(data, rule, mode);

    return result;
};

async function parseDataOnExt(contextObject) {
    if (contextObject.ext === ".csv") {
        var data = csvparser({ delimiter: ";", checkType: true }).fromString(contextObject.data)
                    .then((result) => { return result })
                    .catch((error) => { throw error });
        return data;
    }
    return JSON.parse(contextObject.data);
};

async function getrule(type) {
    if (!type)
        throw { code: 404, msg: {
            error: "Provided file lacked valid type property",
            info: "System was not able to find type, please 2nd row in file or in JSON type property if they have any value."
        }}
        
    var rule = entityrule[type];

    if (!rule)
        throw { code: 404, msg: {
            error: `No rule was found for provided type: ${type}`,
            info: "Failed to find rules for recived type, rule either does not exist or provided type if not defined by data model."
        } }
    
    return rule;
};

async function processData(data, rule, mode = "strict") {

    var clearData = await proccessDataHeaders(data, rule, mode);
    var res = [];
    var err = [];

    for (let entity of clearData)
        try {
            res.push(await proccessSingleEntity(rule, entity, mode));
        } catch (error) {
            err.push(error);
        }
    
    return {err,res};
};

async function proccessSingleEntity(rule, entity, mode) {
    var entityProp = Object.getOwnPropertyNames(entity);
    var ruleProp = Object.getOwnPropertyNames(rule);
    var newEntity = {};

    for (let i = 0; i < ruleProp.length; i++) {
        newEntity[ruleProp[i]] = await processEntityProperty(ruleProp[i], entityProp[i], entity, rule);  
    }

    return newEntity;
};

async function proccessDataHeaders(data, rule, mode) {

    if (!data[0])
        throw { code: 500, msg: {
            error: "Failed to retrive entity to check if rule and entity headers match",
            info: "System was not able to find first entity from parsed data, in order to get type. This is system error."
        } };


    var ruleProp = Object.getOwnPropertyNames(rule).map(rule => rule.toLocaleLowerCase());
    var entityProp = Object.getOwnPropertyNames(data[0]).map((entity) => {
        if (entity.includes("%")) {
            return entity.substring(0, entity.indexOf("%")).toLocaleLowerCase();
        } else {
            return entity.toLocaleLowerCase();
        }
    });

    if (mode === "strict") {
            var missingProp = [];
            for (let key of ruleProp) { 
                if (!entityProp.includes(key)) {
                    missingProp.push(key);
                }
            }
            if(missingProp.length > 0) {
                throw { code: 409, msg: {
                    error: `Entities header do not match rule header defined by data model.`,
                    info: `Missing properties are ${missingProp}, mandatory properties expected in file: ${ruleProp}`
                } };
            }
    }
       
            
        
    return data;
};

async function processEntityProperty(prop, entProp, entity, rule) {
    return rule[prop]([entProp,entity[entProp]]);
};



module.exports = {
    parseRawData
};