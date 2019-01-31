const should = require("should");
const request = require('request');
const req = require('supertest');
const expect = require('chai').expect;
let baseUrl = "/api/v1/parties";
const app = require("../app.js");
let util = require("util");



describe('Checks that api returns correct error code', () => {
    it("tests the parties API (post)", (done)=>{
        req(app).post('/api/v1/parties').send({name: "pdp", hqAddress: "abj", logoUrl: "logo"}).expect(200, done);
    });
    
});

