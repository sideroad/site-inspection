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

  var sites = fs.readFileSync(opts.input, 'utf8');

  async.mapSeries(sites.split(/\r?\n/g), function(site, callback){
    try {
      console.log('loading... ', site);
      jsdom.env({
        url: site,
        scripts: ["http://code.jquery.com/jquery.js"],
        done: function (err, window) {
          var res = fn(err, window);
          setTimeout(function(){
            callback( err, res );
          }, opts.interval);
        }
      });

    } catch(err) {
      callback(err);
    }

  }, function(err, results){
    if(err) {
      console.log(err);
    }
    if(opts.summarize) {
      results = opts.summarize(results);
    }
    fs.writeFileSync(opts.output, results.join('\n'), 'utf8');
    if(done) {
      done();
    }
  });

};
