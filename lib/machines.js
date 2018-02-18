
var contexts = require('./contexts');
var parsers = require('./parsers');

function Machine() {
	var ctx = contexts.topContext();
	
	this.evaluate = function (text) {
		var parser = parsers.parser(text);
		
		var expr = parser.parse();
		
		if (expr == null)
			return null;
		
		return expr.evaluate(ctx);
	}
}

function createMachine() {
	return new Machine();
}

module.exports = {
	machine: createMachine
};