GameOfLife.prototype.getNextGeneration = function() {
var dict = {},
	livingReference = {},
	nodesToTurnOn = [],
	rows = parseInt(this.rows, 10),
	cols = parseInt(this.cols, 10),
	livingNodes = this.liveCells;

	livingNodes.forEach(function(node) {
		var y = parseInt(node[0], 10),
			x = parseInt(node[1], 10),
			lowerY,
			upperY,
			lowerX,
			upperX;

		// if a y or x value of a point is invalid or out of bounds, skip this point
		if (!y || !x || y < 0 || x < 0 || y > rows - 1 || x > cols - 1)  {
			return;
		}
		// if a living node has already been explored, skip this point
		if (dict[y] && dict[y][x] === 0) {
			return;
		}

		// set up the value in the dictionary and livingReference, being careful to not overwrite existing values
		dict[y] = dict[y] || {};
		livingReference[y] = livingReference[y] || {};
		livingReference[y][x] = true;
		dict[y][x] = dict[y][x] ? dict[y][x] : 0;

		// these variables will help us avoid checking points out of bounds
		lowerY = y - 1 >= 0,
		upperY = y + 1 < rows,
		lowerX = x - 1 >= 0,
		upperX = x + 1 < cols;

		// These if statements check hte points surrounding the living Node
		// If they have not been logged in the dictionary yet, set them to 1 (i.e. has 1 living neighbor)
		// If they were already logged, increment their value
		if (lowerY) {
			dict[y-1] = dict[y-1] || {};
			dict[y-1][x] = dict[y-1][x] + 1 || 1;
			if (upperX) {
				dict[y-1][x+1] = dict[y-1][x+1] + 1 || 1;
			}
			if (lowerX) {
				dict[y-1][x-1] = dict[y-1][x-1] + 1 || 1;
			}
		}
		if (upperY) {
			dict[y+1] = dict[y+1] || {};
			dict[y+1][x] = dict[y+1][x] + 1 || 1;
			if (upperX) {
				dict[y+1][x+1] = dict[y+1][x+1] + 1 || 1;
			}
			if (lowerX) {
				dict[y+1][x-1] = dict[y+1][x-1] + 1 || 1;
			}
		}
		if (upperX) {
			dict[y][x+1] = dict[y][x+1] + 1 || 1;
		}
		if (lowerX) {
			dict[y][x-1] = dict[y][x-1] + 1 || 1;
		}
	});

	// once we have the dictionary, go through every item in it and find the nodes that will come alive
	for (var i in dict) {
		for (var j in dict[i]) {
			if (dict[i][j] === 3 || dict[i][j] === 2 && livingReference[i] && livingReference[i][j]) {
				var node = [parseInt(i,10), parseInt(j,10)];
				nodesToTurnOn.push(node);
			}
		}
	}
	return nodesToTurnOn;
}

function GameOfLife(rows, cols, liveCells) {
	this.liveCells = liveCells;
	this.rows = rows;
	this.cols = cols;
}

module.exports = GameOfLife;
