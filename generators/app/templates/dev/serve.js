var express = require('express');
var serveStatic = require('serve-static');
var port = 3456;

var app = express();

app.use(serveStatic('./', {
  'index': ['demo.html']
}));
app.listen(port);

console.log("Listening on port " + port);
console.log("Visit http://localhost:" +
  port +
  " to view your test application");
