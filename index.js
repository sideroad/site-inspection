'use strict';

var async = require('async'),
    jsdom = require('jsdom'),
    _ = require('lodash'),
    fs = require('fs');

module.exports = function(options, fn, done){
  var opts = _.extend({
        input: 'input.txt',
        output: 'output.txt',
        interval: 1000
      }, options),
      res = [];

  if( !fs.existsSync(opts.input) ){
    throw new Error('input option required');
  }
  if( fs.existsSync(opts.output) ){
    fs.unlinkSync(opts.output);
  }
  var ws = createWriteStream(opts.output);

  var sites = fs.readFileSync(opts.input, 'utf8');

  async.eachSeries(sites.split(/\r?\n/g), function(site, callback){
    try {
      console.log('loading... ', site);
      jsdom.env({
        url: site,
        scripts: ["http://code.jquery.com/jquery.js"],
        done: function (err, window) {
          var res = fn(err, window);
          if ( res ){
            ws.write( res + '¥n', 'utf8' );
          }
          window.close();
          setTimeout(function(){
            callback( err );
          }, opts.interval);
        }
      });

    } catch(err) {
      callback(err);
    }

  }, function(err){
    ws.close();
    if(err) {
      console.log(err);
    }
    
    if(done) {
      done();
    }
  });

};
