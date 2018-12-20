

const { 
    retriveAllEntities,
    retriveSingleEntity,
    createEntitiesBatch
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

    createEntities(contextObject) {
        return createEntitiesBatch(contextObject);
    };
    
};

module.exports = EntityClient;