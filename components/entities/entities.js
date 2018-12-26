

const { 
    retriveAllEntities,
    retriveSingleEntity,
    createEntitiesBatch,
    updateEntitiesBatch
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

    updateEntities(contextObject) {
        return updateEntitiesBatch(contextObject);
    };
    
};

module.exports = EntityClient;