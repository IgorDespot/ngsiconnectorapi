

const { 
    retriveAllEntities,
    retriveSingleEntity
 } = require("./entitiescontroller");

class EntityClient {

    constructor(){

    }

    getAllEntities(contextObject) {
        return retriveAllEntities(contextObject);
    };

    getSingleEntity(contextObject) {
        return retriveSingleEntity(contextObject);
    };
    
};

module.exports = EntityClient;