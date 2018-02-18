
var types = require('./types');

function Context() {
	var values = {};
	
	this.get = function (key) { return values[key]; };
	this.set = function (key, value) { values[key] = value; };
}

function createContext() {
	return new Context();
}

function createTopContext() {
	var ctx = new Context();
	
	ctx.set('String', types.String);
	ctx.set('Int', types.Int);
	ctx.set('Integer', types.Integer);
	ctx.set('Float', types.Float);
	ctx.set('Double', types.Double);
	ctx.set('Char', types.Char);
	
	ctx.set('->', function (x) { return function (y) { return types.func(x, y); } });
	
	return ctx;
}

module.exports = {
	context: createContext,
	topContext: createTopContext
};

