
const expressions = require('../lib/expressions');
const contexts = require('../lib/contexts');

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

exports['build apply expression'] = function (test) {
	var ctx = contexts.context();
	var expr = expressions.apply(expressions.name('n'), 'n');

    var result = expr.evaluate(ctx)(42);
    
	test.equal(result, 42);
};

exports['build apply expression twice'] = function (test) {
	var ctx = contexts.topContext();
	var expr = expressions.apply(expressions.apply(expressions.composite(expressions.operator('+'), [ expressions.name('a'), expressions.name('b') ]), 'b'), 'a');

    var result = expr.evaluate(ctx)(40)(2);
    
	test.equal(result, 42);
};



