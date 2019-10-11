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
          assert.equal(JSON.parse(res.text).stockData, "goog");
          done();
        });
      });
      
      test('1 stock with like', function(done) {
        assert.fail();
        done();
      });
      
      test('1 stock with like again (ensure likes arent double counted)', function(done) {
        assert.fail();
        done();
      });
      
      test('2 stocks', function(done) {
        assert.fail();
        done();
      });
      
      test('2 stocks with like', function(done) {
        assert.fail();
        done();
      });
      
    });

});
