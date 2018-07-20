
var expressions = require('../lib/expressions');
var contexts = require('../lib/contexts');

exports['evaluate integer constant expression'] = function (test) {
	var expr = expressions.constant(42);
	
	test.ok(expr);
	
	var result = expr.evaluate();
	
	test.ok(result);
	test.strictEqual(result, 42);
};

exports['evaluate string constant expression'] = function (test) {
	var expr = expressions.constant('foo');
	
	test.ok(expr);
	
	var result = expr.evaluate();
	
	test.ok(result);
	test.strictEqual(result, 'foo');
};

exports['evaluate name expression'] = function (test) {
	var ctx = contexts.context();
	ctx.set('answer', 42);
	
	var expr = expressions.name('answer');
	
	test.ok(expr);
	
	var result = expr.evaluate(ctx);
	
	test.ok(result);
	test.strictEqual(result, 42);
};

exports['build composite expression'] = function (test) {
	var expr = expressions.composite(expressions.name('fn'), [ expressions.constant(42) ]);
	
	test.ok(expr);
	test.ok(expr.expression()),
	test.ok(expr.expressions()),
	test.equal(expr.expressions().length, 1);
	
	test.equal(expr.expression().name(), 'fn');
	test.equal(expr.expressions()[0].value(), 42);
};


