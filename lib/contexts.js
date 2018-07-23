
var types = require('./types');

function Context(parent) {
	var values = {};
	var types = {};
	
	this.get = function (key) { 
		var value = values[key];
		
		if (value == null && parent)
			return parent.get(key);
		
		return value;
	};
	
	this.set = function (key, value) { values[key] = value; };

	this.getType = function (name) { return types[name]; };
	this.defineType = function (name, type) { types[name] = type; };
}

function createContext(parent) {
	return new Context(parent);
}

function createTopContext() {
	var ctx = new Context();
	
	ctx.set('String', types.String);
	ctx.set('Int', types.Int);
	ctx.set('Integer', types.Integer);
	ctx.set('Float', types.Float);
	ctx.set('Double', types.Double);
	ctx.set('Char', types.Char);
	
	ctx.set('False', false);
	
	ctx.set('->', function (ctx, x) { 
		return function (ctx, y) { 
			return types.func(x.evaluate(ctx), y.evaluate(ctx)); 
		} 
	});
	
	var fnDefine = function (ctx, x) {
		return function (ctx, y) {
			var yval;
			
			if (y.evaluate)
				yval = y.evaluate(ctx);
			else
				yval = y;
			
			ctx.defineType(x.name(), yval);
			
			return yval;
		}
	};
	
	ctx.set('::', fnDefine);
	
	var fnSet = function (ctx, x) {
		return function (ctx, y) {
			var yval = y.evaluate(ctx);
			
			ctx.set(x.name(), yval);
			
			return yval;
		}
	};
	
	ctx.set('=', fnSet);
	
	ctx.set('+', function (ctx, x) {
		var xval = x.evaluate(ctx);
		
		return function (ctx, y) {
			var yval = y.evaluate(ctx);
			
			return xval + yval;
		}
	});
	
	ctx.set('-', function (ctx, x) {
		var xval = x.evaluate(ctx);
		
		return function (ctx, y) {
			var yval = y.evaluate(ctx);
			
			return xval - yval;
		}
	});
	
	ctx.set('*', function (ctx, x) {
		var xval = x.evaluate(ctx);
		
		return function (ctx, y) {
			var yval = y.evaluate(ctx);
			
			return xval * yval;
		}
	});
	
	ctx.set('/', function (ctx, x) {
		var xval = x.evaluate(ctx);
		
		return function (ctx, y) {
			var yval = y.evaluate(ctx);
			
			return xval / yval;
		}
	});
	
	ctx.set('^', function (ctx, x) {
		var xval = x.evaluate(ctx);
		
		return function (ctx, y) {
			var yval = y.evaluate(ctx);
			
			return Math.pow(xval, yval);
		}
	});

	ctx.set('div', function (ctx, x) {
		var xval = x.evaluate(ctx);
		
		return function (ctx, y) {
			var yval = y.evaluate(ctx);
			
			return Math.floor(xval / yval);
		}
	});

	ctx.set('mod', function (ctx, x) {
		var xval = x.evaluate(ctx);
		
		return function (ctx, y) {
			var yval = y.evaluate(ctx);
			
			return xval % yval;
		}
	});

	return ctx;
}

module.exports = {
	context: createContext,
	topContext: createTopContext
};

