
var parsers = require('../lib/parsers');
var contexts = require('../lib/contexts');
var types = require('../lib/types');

exports['parse integer expression'] = function (test) {
	var parser = parsers.parser('42');
	
	var expr = parser.parse();
	
	test.ok(expr);
	test.equal(expr.evaluate(), 42);
	
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
	ctx.set('incr', function (x) { return x + 1; });
	
	var expr = parser.parse();
	
	test.ok(expr);
	test.equal(expr.evaluate(ctx), 2);
	
	test.equal(parser.parse(), null);	
};

exports['parse composite expression with two argument'] = function (test) {
	var parser = parsers.parser('add 1 2');
	var ctx = contexts.context();
	ctx.set('add', function (x) { return function (y) { return x + y; } });
	
	var expr = parser.parse();
	
	test.ok(expr);
	test.equal(expr.evaluate(ctx), 3);
	
	test.equal(parser.parse(), null);	
};

exports['parse function expression in parentheses'] = function (test) {
	var parser = parsers.parser('(add)');
	var ctx = contexts.context();
	ctx.set('add', function (x) { return function (y) { return x + y; } });
	
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
	ctx.set('+', function (x) { return function (y) { return x + y; } });
	
	var expr = parser.parse();
	
	test.ok(expr);
	test.equal(expr.evaluate(ctx), 5);
	
	test.equal(parser.parse(), null);	
};

exports['parse func expression'] = function (test) {
	var parser = parsers.parser('String -> Integer');
	var ctx = contexts.context();
	ctx.set('->', function (x) { return function (y) { return types.func(x, y); } });
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

