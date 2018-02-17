
var expressions = require('../lib/expressions');

exports['evaluate integer constant expression'] = function (test) {
	var expr = expressions.constant(42);
	
	test.ok(expr);
	
	var result = expr.evaluate();
	
	test.ok(result);
	test.strictEqual(result, 42);
};

