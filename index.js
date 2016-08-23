var gameOfLife = require('./model/gameOfLife'),
	express = require('express'),
	app = express(),
	port = 3000;

app.listen(port, function () {});

app.get('/', function (req, res) {
  	var rows = req.query.M,
  		cols = req.query.N,
  		liveCells = req.query.liveCells;

  	if (rows && cols && liveCells) {
  		var g = new gameOfLife(rows, cols, liveCells);
  		var data = g.getNextGeneration();
  		res.jsonp({
  			status: 'success',
  			data: data
  		});
  	} else { 
  		res.jsonp({
  			status : 'error',
  			data: 'There was an error with the input data'
  		});
  	}
});
