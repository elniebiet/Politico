const should = require("should");
const request = require('request');
const req = require('supertest');
const expect = require('chai').expect;
let baseUrl = "https://localhost:3001/api/v1/parties";
const app = require("../app.js");
let util = require("util");


//unit testing for the create party endpoint
describe('Checks that api returns correct error code', () => {
    it("tests the parties API (post)", (done)=>{
        req(app).post('/api/v1/parties').send({name: "pdp", hqAddress: "abj", logoUrl: "logo"}).expect(200, done);
    });
});
