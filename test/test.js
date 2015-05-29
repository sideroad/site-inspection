var assert = require("assert"),
    site = require('../index.js'),
    fs = require('fs');
describe('site inspection', function(){
  describe('#basic usage', function(){
    it('should get all results', function(done){

      site({
        input: 'test/site.txt',
        output: 'test/actual.txt'
      }, function(err, window){
        var $ = window.$;
        return $('title').text();
      }, function(){
        var expected = fs.readFileSync('test/expected.txt', 'utf8');
        var actual   = fs.readFileSync('test/actual.txt', 'utf8');
        assert.equal(expected, actual);
        done();
      });


    });
  });
});