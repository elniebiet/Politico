const should = require('should');
const request = require('request');
const req = require('supertest');
const expect = require('chai').expect;
let baseUrl = "/api/v1/parties";
const app = require("../app.js");
let util = require("util");



describe('Checks that api returns correct error code', () => {
    it("tests the parties endpoint (post)", (done)=>{
        req(app).post('/api/v1/parties').send({name: "pdp", hqAddress: "abj", logoUrl: "logo"}).expect(200, done);
    });

    it('tests the parties endpoint (get)', function(done){
        req(app).get('/api/v1/parties/1', function(error, response, body){
            expect(response.statusCode).to.equal(200);
            console.log(body);
        });
        done();
    });
    
    // it('Admin: View a specific party, tests the parties endpoint (get)', (done)=> {
    //     request.get('/api/v1/parties', (error,response,body)=>{
    //         response.statusCode.should.equal(200);
    //         console.log(body);
    //         done();
    //     });
    // });
    // it('Admin: Update a specific party, tests the parties endpoint (POST)', (done)=> {
    //     request.get('/api/v1/parties/{num}', (error,response,body)=>{
    //         response.statusCode.should.equal(200);
    //         console.log(body);
    //         done();
    //     });
    // });
});

