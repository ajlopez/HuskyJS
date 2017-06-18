
var parsers = require('../lib/parsers');
var contexts = require('../lib/contexts');

exports['parse integer expression'] = function (test) {
	var parser = parsers.parser('42');
	
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





