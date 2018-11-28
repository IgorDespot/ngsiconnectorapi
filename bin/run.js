"use strict";

var service = require("../server/service")();
var http = require("http");
var config = require("../config");

var log = config.log();

var server = http.createServer(service);

server.listen(config.ngsiconnectorapi.ngsi_port || 3000);

server.on("listening", function() {
    log.info(`NgsiConnectorAPI is listening on ${server.address().port} in ${service.get('env')} mode.`)
});

module.exports = server;