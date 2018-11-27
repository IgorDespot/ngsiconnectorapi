var bunyan = require("bunyan");

var log = {
    development: function() {
        return bunyan.createLogger({
            name: "NGSI-API-development",
            level: "debug"
        });
    }
};

module.exports = {
    log: function(env) {
        if (env)
            return log[env]();
        return log[process.env.NODE_ENV || "development"]();
    }
};