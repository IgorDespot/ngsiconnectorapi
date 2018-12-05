"use strict";

const request = require("supertest");
const service = require("../../../server/service")();

describe("The token component", function() {
    describe("GET /v2/token", function() {
        it("should return HTTP 401 when wrong username or password is provided", (done) => {
            request(service)
            .get("/v2/token")
            .set("Authorization", `Basic ${Buffer.from(`w4t_wrong@develop.com:123`, "utf8").toString("base64")}`)
            .expect(401, done);
        });
    });
    describe("GET /v2/token", function() {
        it("should return HTTP 200 when wrong username or password is provided", (done) => {
            request(service)
            .get("/v2/token")
            .set("Authorization", `Basic ${Buffer.from(`w4t_test@develop.com:123`, "utf8").toString("base64")}`)
            .expect(200, done);
        });
    });
});