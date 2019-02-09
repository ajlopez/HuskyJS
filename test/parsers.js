
const parsers = require('../lib/parsers');
const contexts = require('../lib/contexts');
const types = require('../lib/types');

exports['parse integer expression'] = function (test) {
	var parser = parsers.parser('42');
	
	var expr = parser.parse();
	
	test.ok(expr);
	test.equal(expr.evaluate(), 42);
	
	test.equal(parser.parse(), null);	
};

exports['parse two integer expression'] = function (test) {
	var parser = parsers.parser('42\n1');
	
	var expr = parser.parse();
	
	test.ok(expr);
	test.equal(expr.evaluate(), 42);
	
	var expr = parser.parse();
	
	test.ok(expr);
	test.equal(expr.evaluate(), 1);
	
	test.equal(parser.parse(), null);	
};

exports['parse integer expression in parentheses'] = function (test) {
	var parser = parsers.parser('(42)');
	
	var expr = parser.parse();
	
	test.ok(expr);
	test.equal(expr.evaluate(), 42);
	
	test.equal(parser.parse(), null);	
};

exports['parse real expression'] = function (test) {
	var parser = parsers.parser('3.14159');
	
	var expr = parser.parse();
	
	test.ok(expr);
	test.equal(expr.evaluate(), 3.14159);
	
	test.equal(parser.parse(), null);	
};

exports['parse real expression in parenthesis'] = function (test) {
	var parser = parsers.parser('(3.14159)');
	
	var expr = parser.parse();
	
	test.ok(expr);
	test.equal(expr.evaluate(), 3.14159);
	
	test.equal(parser.parse(), null);	
};

exports['parse string expression'] = function (test) {
	var parser = parsers.parser('"foo"');
	
	var expr = parser.parse();
	
	test.ok(expr);
	test.equal(expr.evaluate(), "foo");
	
	test.equal(parser.parse(), null);	
};

exports['parse character expression'] = function (test) {
	var parser = parsers.parser("'a'");
	
	var expr = parser.parse();
	
	test.ok(expr);
	test.equal(expr.evaluate(), "a");
	
	test.equal(parser.parse(), null);	
};

exports['parse name expression'] = function (test) {
	var parser = parsers.parser('foo');
	var ctx = contexts.context();
	ctx.set('foo', 'bar');
	
	var expr = parser.parse();
	
	test.ok(expr);
	test.equal(expr.evaluate(ctx), "bar");
	
	test.equal(parser.parse(), null);	
};

exports['parse composite expression with one argument'] = function (test) {
	var parser = parsers.parser('incr 1');
	var ctx = contexts.context();
	ctx.set('incr', function (ctx, x) { return x.evaluate(ctx) + 1; });
	
	var expr = parser.parse();
	
	test.ok(expr);
	test.equal(expr.evaluate(ctx), 2);
	
	test.equal(parser.parse(), null);	
};

exports['parse composite expression with two argument'] = function (test) {
	var parser = parsers.parser('add 1 2');
	var ctx = contexts.context();
	
	ctx.set('add', function (ctx, x) {
		var xval = x.evaluate(ctx);
		
		return function (ctx, y) {
			var yval = y.evaluate(ctx);
			
			return xval + yval; 
		} 
	});
	
	var expr = parser.parse();
	
	test.ok(expr);
	test.equal(expr.evaluate(ctx), 3);
	
	test.equal(parser.parse(), null);	
};

exports['parse function expression in parentheses'] = function (test) {
	var parser = parsers.parser('(add)');
	var ctx = contexts.context();
	ctx.set('add', function (ctx, x) {
		var xval = x.evaluate(ctx);
		
		return function (ctx, y) {
			var yval = y.evaluate(ctx);
			
			return xval + yval; 
		} 
	});
	
	var expr = parser.parse();
	
	test.ok(expr);
	test.equal(expr.evaluate(ctx), ctx.get('add'));
	
	test.equal(parser.parse(), null);	
};

exports['parse Integer type expression'] = function (test) {
	var parser = parsers.parser('Integer');
	var ctx = contexts.topContext();
	
	var expr = parser.parse();
	
	test.ok(expr);
	test.equal(expr.evaluate(ctx), types.Integer);
	
	test.equal(parser.parse(), null);	
};

exports['parse String type expression'] = function (test) {
	var parser = parsers.parser('String');
	var ctx = contexts.topContext();
	
	var expr = parser.parse();
	
	test.ok(expr);
	test.equal(expr.evaluate(ctx), types.String);
	
	test.equal(parser.parse(), null);	
};

exports['parse add expression'] = function (test) {
	var parser = parsers.parser('2+3');
	var ctx = contexts.context();

	ctx.set('+', function (ctx, x) {
		var xval = x.evaluate(ctx);
		
		return function (ctx, y) {
			var yval = y.evaluate(ctx);
			
			return xval + yval; 
		} 
	});
	
	var expr = parser.parse();
	
	test.ok(expr);
	test.equal(expr.evaluate(ctx), 5);
	
	test.equal(parser.parse(), null);	
};

exports['parse func expression'] = function (test) {
	var parser = parsers.parser('String -> Integer');
	var ctx = contexts.context();
	ctx.set('->', function (ctx, x) { 
		return function (ctx, y) { 
			return types.func(x.evaluate(ctx), y.evaluate(ctx)); 
		} 
	});
	ctx.set('Integer', types.Integer);
	ctx.set('String', types.String);
	
	var expr = parser.parse();
	
	test.ok(expr);
	
	var value = expr.evaluate(ctx);
	
	test.ok(value);
	test.ok(types.isType(value));
	test.equal(value.from(), types.String);
	test.equal(value.to(), types.Integer);
	
	test.equal(parser.parse(), null);	
};

exports['parse func expression using top context'] = function (test) {
	var parser = parsers.parser('String -> Integer');
	var ctx = contexts.topContext();
	
	var expr = parser.parse();
	
	test.ok(expr);
	
	var value = expr.evaluate(ctx);
	
	test.ok(value);
	test.ok(types.isType(value));
	test.equal(value.from(), types.String);
	test.equal(value.to(), types.Integer);
	
	test.equal(parser.parse(), null);	
};

exports['parse type definition'] = function (test) {    
	var parser = parsers.parser('answer :: Int');
	var ctx = contexts.topContext();
	
	var expr = parser.parse();
	
	test.ok(expr);
	
	var value = expr.evaluate(ctx);

	test.ok(value);
	test.ok(types.isType(value));
    test.equal(value, types.Int);
	
    test.equal(ctx.getType('answer'), types.Int);
	
	test.equal(parser.parse(), null);	
};

