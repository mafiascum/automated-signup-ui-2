var nodemon = require('nodemon');
var path = require('path');


if (process.env.NODE_ENV === 'development') {
    var bundle = require('./bundler.js');
    bundle();
}

nodemon({
    script: path.join(__dirname, 'server/server'),
    ignore: [],
    watch: ['server/*'],
}).on('restart', function() {
  console.log('Backend restarted!');
});