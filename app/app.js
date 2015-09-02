if(process.env.NEWRELIC_KEY && process.env.NEWRELIC_KEY != "") {
  require('newrelic');
}

var http = require('http'),
    port = (process.env.VCAP_APP_PORT || 3000);

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello World\n');
}).listen(port);

console.log('Server running...');
