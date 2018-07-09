
var types = require('./types');

function Context() {
	var values = {};
	var types = {};
	
	this.get = function (key) { return values[key]; };
	this.set = function (key, value) { values[key] = value; };

	this.getType = function (name) { return types[name]; };
	this.defineType = function (name, type) { types[name] = type; };
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
	
	var fnDefine = function (x) {
		return function (y) {
			ctx.defineType(x.name(), y);
			
			return y;
		}
	};
	
	fnDefine.lazy = true;
	
	ctx.set('::', fnDefine);
	
	var fnSet = function (x) {
		return function (y) {
			ctx.set(x.name(), y);
			
			return y;
		}
	};
	
	fnSet.lazy = true;
	
	ctx.set('=', fnSet);
	
	ctx.set('+', function (x) {
		return function (y) {
			return x + y;
		}
	});
	
	ctx.set('-', function (x) {
		return function (y) {
			return x - y;
		}
	});
	
	return ctx;
}

module.exports = {
	context: createContext,
	topContext: createTopContext
};

