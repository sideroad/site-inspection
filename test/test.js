var assert = require("assert"),
    site = require('../index.js');
describe('site inspection', function(){
  describe('#basic usage', function(){
    it('should get all results', function(){

      site({}, function(err, window){
        var $ = window.$;
        return $('div').text();
      }, function(){
        assert.equal(true, false);
        console.log("finished");
      });


    });
  });
});