# How to install
```bash
npm install --save site-inspection
```

# How to use

## client
```js
var site = require('site-inspection');

site({
  input: 'sites.txt',
  output: 'inspected.log',
  interval: 500
}, function(err, window){
  var $ = window.$;
  return $('title').text();  
});
```

## input file
```
http://sideroad.secret.jp/
http://sideroad.secret.jp/plugins/
http://sideroad.secret.jp/articles/
```