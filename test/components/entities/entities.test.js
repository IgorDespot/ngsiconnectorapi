"use strict";

const should = require("should");
const request = require("supertest");
const service = require("../../../server/service")();

describe("The entities component", function() {
    describe("GET /v2/entities", function() {
        it("should return HTTP 400 when mandatory header is missing", (done) => {
            request(service)
            .get("/v2/entities")
            .set("Fiware-Service", "waste4think")
            .set("Fiware-ServicePath", "/eng/develop")
            .expect(400, done);
        });
    });
    describe("GET /v2/entities", function() {
        it("should return HTTP 200 when all precondition is successfult", (done) => {
            request(service)
            .get("/v2/entities")
            .set("Fiware-Service", "waste4think")
            .set("Fiware-ServicePath", "/eng/develop")
            .set("X-Auth-Token", "123456")
            .expect(200, done);
        });
    });
    describe("GET /badroute", function() {
        it("should return HTTP 404", (done) => {
            request(service)
            .get("/badroute")
            .expect(404, done)
        });
    });
});