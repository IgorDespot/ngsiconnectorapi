var bunyan = require("bunyan");
require('dotenv').config();

var log = {
    development: function() {
        return bunyan.createLogger({
            name: "NGSI-API-development",
            level: "debug"
        });
    }
};

module.exports = {
    fiware: {
        orion_url: "http://192.168.192.134:82" 
    },
    ngsiconnectorapi: {
        ngsi_port: 3000,
        ngsi_protocol: "https",
        ngsi_allowed_files: [".csv",".json"],
        ngsi_mandatory_headers: ["fiware-service","fiware-servicepath","x-auth-token"]
    },
    log: function(env) {
        if (env)
            return log[env]();
        return log[process.env.NODE_ENV || "development"]();
    }
};