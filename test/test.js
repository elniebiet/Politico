const should = require('should');
const request = require('request');
const req = require('supertest');
const expect = require('chai').expect;
let baseUrl = "/api/v1/parties";
const app = require("../app.js");
let util = require("util");



describe('Checks that api returns correct error code', () => {
    it("tests the create parties endpoint (post), should return 200 if ok", (done)=>{
        req(app).post('/api/v1/parties').send({name: "pdp", hqAddress: "abj", logoUrl: "logo"}).expect(200, done);
    });

    it('tests the get a party endpoint (get) should return 200 if ok', function(done){
        req(app).get('/api/v1/parties/1', function(error, response, body){
            expect(response.statusCode).to.equal(200);
            console.log(body);
        });
        done();
    });

    it('tests the get all parties endpoint (get) should return 200 if ok', function(done){
        req(app).get('/api/v1/parties', function(error, response, body){
            expect(response.statusCode).to.equal(200);
            console.log(body);
        });
        done();
    });

    it('tests the delete a party endpoint (get) should return 406 on invalid input', function(done){
        req(app).delete('/api/v1/parties/1', function(error, response, body){
            expect(response.statusCode).to.equal(406);
            console.log(body);
        });
        done();
    });

    //test create an office endpoint
    it("tests the create office endpoint (post), should return 200", (done)=>{
        req(app).post('/api/v1/offices').send({type: "federal", name: "president"}).expect(200, done);
    });

    //test the get all offices endpoint
    it('tests the get all offices endpoint (get) should return 200 if ok', function(done){
        req(app).get('/api/v1/offices', function(error, response, body){
            expect(response.statusCode).to.equal(200);
            console.log(body);
        });
        done();
    });
    //test the get an office endpoint
    it('tests the get an office endpoint (get) should return 200 on value of 1', function(done){
        req(app).get('/api/v1/offices/1', function(error, response, body){
            expect(response.statusCode).to.equal(200);
            console.log(body);
        });
        done();
    });



    
});

