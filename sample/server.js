
var express = require('express');
var fs = require('fs');
var path = require('path');

//setting middleware
function start(route) {
	var app = express();


	app.get('/', (req, res) => {
		fs.readFile('./sample/sample.html',(err, data) => {
			res.writeHead(200, {"Content-Type": "text/html", 'Content-Length':data.length});
			res.write(data);
			res.end();
		});
	})

	app.use('/static', express.static(path.join(__dirname, '../static')));

	var server = app.listen(8080);
}

exports.start = start;