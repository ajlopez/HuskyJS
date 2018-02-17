
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


