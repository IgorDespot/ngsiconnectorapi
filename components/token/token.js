const { getAccessToken } = require("./tokencontroller");

class TokenClient {

    constructor(){

    }
    
    getAccessToken(contextObject) {
        return getAccessToken(contextObject);
    }
}

module.exports = TokenClient;