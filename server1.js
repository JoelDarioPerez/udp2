var dgram = require("dgram");
var server = dgram.createSocket("udp4");
server.on("message", function (msg, rinfo) {
  console.log(`mensaje recivido + ${msg}`);
});

server.bind(8080);
