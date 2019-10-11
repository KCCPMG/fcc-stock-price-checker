/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*       (if additional are added, keep them at the very end!)
*/

var chaiHttp = require('chai-http');
var chai = require('chai');
var assert = chai.assert;
var server = require('../server');
var correctLikes = 0;

chai.use(chaiHttp);

suite('Functional Tests', function() {
    
    suite('GET /api/stock-prices => stockData object', function() {
      
      test('1 stock', function(done) {
       chai.request(server)
        .get('/api/stock-prices')
        .query({stock: 'goog'})
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.property(JSON.parse(res.text).stockData, "stock");
          assert.property(JSON.parse(res.text).stockData, "price");
          assert.property(JSON.parse(res.text).stockData, "likes");
          assert.equal(JSON.parse(res.text).stockData.stock, "goog");
          done();
        });
      });
      
      test('1 stock with like', function(done) {
        chai.request(server)
        .get('/api/stock-prices')
        .query({stock: 'goog', like: "true"})
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.property(JSON.parse(res.text).stockData, "stock");
          assert.property(JSON.parse(res.text).stockData, "price");
          assert.property(JSON.parse(res.text).stockData, "likes");
          assert.equal(JSON.parse(res.text).stockData.stock, "goog");
          assert.isAbove(JSON.parse(res.text).stockData.likes, 0);
          correctLikes = JSON.parse(res.text).stockData.likes;
          done();
        });
      });
      
      
      test('1 stock with like again (ensure likes arent double counted)', function(done) {
        chai.request(server)
        .get('/api/stock-prices')
        .query({stock: 'goog', like: "true"})
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.property(JSON.parse(res.text).stockData, "stock");
          assert.property(JSON.parse(res.text).stockData, "price");
          assert.property(JSON.parse(res.text).stockData, "likes");
          assert.equal(JSON.parse(res.text).stockData.stock, "goog");
          assert.equal(JSON.parse(res.text).stockData.likes, correctLikes+1);
          done();
        });
      });
      
      test('2 stocks', function(done) {
        chai.request(server)
        .get('/api/stock-prices')
        .query({stock: 'goog', stock: 'atvi'})
        .end(function(err, res){
          console.log(req.url);
          assert.equal(res.status, 200);
          assert.property(JSON.parse(res.text).stockData[0], "stock");
          assert.property(JSON.parse(res.text).stockData[0], "price");
          assert.property(JSON.parse(res.text).stockData[0], "likes");
          assert.property(JSON.parse(res.text).stockData[1], "stock");
          assert.property(JSON.parse(res.text).stockData[1], "price");
          assert.property(JSON.parse(res.text).stockData[1], "likes");
          assert.equal(JSON.parse(res.text).stockData[0].stock, "goog");
          assert.equal(JSON.parse(res.text).stockData[1].stock, "atvi");
          // assert.fail();
          done();
        });
      });
      
      test('2 stocks with like', function(done) {
        assert.fail();
        done();
      });
      
    });

});
