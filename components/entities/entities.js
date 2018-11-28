

const { retriveAllEntities } = require("./entitiescontroller");

class EntityClient {

    constructor(){

    }

    getAllEntities(contextObject) {
        return retriveAllEntities(contextObject);
    }
    
};

module.exports = EntityClient;