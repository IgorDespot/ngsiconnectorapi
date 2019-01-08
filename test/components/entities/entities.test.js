"use strict";

const request = require("supertest");
const service = require("../../../server/service")();
const fs = require("fs");

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
            .set("X-Auth-Token", "test")
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
    describe("GET /v2/entities", function() {
        it("should return HTTP 401 when invalid token is provided", (done) => {
            request(service)
            .get("/v2/entities/Room1")
            .set("Fiware-Service", "test")
            .set("Fiware-ServicePath", "/test/test")
            .set("X-Auth-Token", "fail")
            .expect(401, done);
        });
    });
    describe("GET /v2/entities/:entityId", function() {
        it("should return HTTP 401 when invalid token is provided", (done) => {
            request(service)
            .get("/v2/entities/Room1")
            .set("Fiware-Service", "test")
            .set("Fiware-ServicePath", "/test/test")
            .set("X-Auth-Token", "fail")
            .expect(401, done);
        });
    });
    describe("GET /v2/entities/:entityId", function() {
        it("should return HTTP 200 when all preconditions are met", (done) => {
            request(service)
            .get("/v2/entities/Room1")
            .set("Fiware-Service", "test")
            .set("Fiware-ServicePath", "/test/test")
            .set("X-Auth-Token", "test")
            .expect(200, done);
        });
    });
    describe("GET /v2/entities/:entityId", function() {
        it("should return HTTP 404 when all preconditions are met", (done) => {
            request(service)
            .get("/v2/entities/badId")
            .set("Fiware-Service", "test")
            .set("Fiware-ServicePath", "/test/test")
            .set("X-Auth-Token", "test")
            .expect(404, done);
        });
    });
    describe("POST /v2/entities", function() {
        it("should return HTTP 200 when all entities are successfully passed checks", (done) => {
            request(service)
            .post("/v2/entities")
            .field("userFile", fs.readFileSync(__dirname + '/working_test.csv', 'utf-8'))
            .attach('files', __dirname + '/working_test.csv', 'working_test.csv')
            .set("Fiware-Service", "test")
            .set("Fiware-ServicePath", "/test/test")
            .set("X-Auth-Token", "test")
            .expect(200, done);
        });
    });
    describe("POST /v2/entities", function() {
        it("should return HTTP 409 when there is difference betweenn rule and entity headers", (done) => {
            request(service)
            .post("/v2/entities")
            .field("userFile", fs.readFileSync(__dirname + '/headerFail_test.csv', 'utf-8'))
            .attach('files', __dirname + '/headerFail_test.csv', 'headerFail_test.csv')
            .set("Fiware-Service", "test")
            .set("Fiware-ServicePath", "/test/test")
            .set("X-Auth-Token", "test")
            .expect(409, done);
        });
    });
    describe("POST /v2/entities", function() {
        it("should return HTTP 403 when there is no type to find rules by", (done) => {
            request(service)
            .post("/v2/entities")
            .field("userFile", fs.readFileSync(__dirname + '/typeFail_test.csv', 'utf-8'))
            .attach('files', __dirname + '/typeFail_test.csv', 'typeFail_test.csv')
            .set("Fiware-Service", "test")
            .set("Fiware-ServicePath", "/test/test")
            .set("X-Auth-Token", "test")
            .expect(404, done);
        });
    });
    describe("POST /v2/entities/update", function() {
        it("should return HTTP 500 when id property is not provided", (done) => {
            request(service)
            .post("/v2/entities/update")
            .field("userFile", fs.readFileSync(__dirname + '/update_fail.csv', 'utf-8'))
            .attach('files', __dirname + '/update_fail.csv', 'update_fail.csv')
            .set("Fiware-Service", "test")
            .set("Fiware-ServicePath", "/test/test")
            .set("X-Auth-Token", "test")
            .expect(500, done);
        });
    });
    describe("POST /v2/entities/update", function() {
        it("should return HTTP 200 when all conditions are met", (done) => {
            request(service)
            .post("/v2/entities/update")
            .field("userFile", fs.readFileSync(__dirname + '/update_working.csv', 'utf-8'))
            .attach('files', __dirname + '/update_working.csv', 'update_working.csv')
            .set("Fiware-Service", "test")
            .set("Fiware-ServicePath", "/test/test")
            .set("X-Auth-Token", "test")
            .expect(200, done);
        });
    });
    describe("POST /v2/entities/update", function() {
        it("should return HTTP 200 when all conditions are met", (done) => {
            request(service)
            .post("/v2/entities/update")
            .field("userFile", fs.readFileSync(__dirname + '/update_fail_no_id_val.csv', 'utf-8'))
            .attach('files', __dirname + '/update_fail_no_id_val.csv', 'update_fail_no_id_val.csv')
            .set("Fiware-Service", "test")
            .set("Fiware-ServicePath", "/test/test")
            .set("X-Auth-Token", "test")
            .expect(200, done);
        });
    });
});