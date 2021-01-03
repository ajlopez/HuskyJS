
const expressions = require('../lib/expressions');
const contexts = require('../lib/contexts');

exports['evaluate integer constant expression'] = function (test) {
	const expr = expressions.constant(42);
	
	test.ok(expr);
	
	const result = expr.evaluate();
	
	test.ok(result);
	test.strictEqual(result, 42);
};

exports['evaluate string constant expression'] = function (test) {
	const expr = expressions.constant('foo');
	
	test.ok(expr);
	
	const result = expr.evaluate();
	
	test.ok(result);
	test.strictEqual(result, 'foo');
};

exports['evaluate name expression'] = function (test) {
	const ctx = contexts.context();
	ctx.set('answer', 42);
	
	const expr = expressions.name('answer');
	
	test.ok(expr);
	
	const result = expr.evaluate(ctx);
	
	test.ok(result);
	test.strictEqual(result, 42);
};

exports['build composite expression'] = function (test) {
	const expr = expressions.composite(expressions.name('fn'), [ expressions.constant(42) ]);
	
	test.ok(expr);
	test.ok(expr.expression()),
	test.ok(expr.expressions()),
	test.equal(expr.expressions().length, 1);
	
	test.equal(expr.expression().name(), 'fn');
	test.equal(expr.expressions()[0].value(), 42);
};

exports['build apply expression'] = function (test) {
	const ctx = contexts.context();
	const expr = expressions.apply(expressions.name('n'), 'n');

    const result = expr.evaluate(ctx)(ctx, expressions.constant(42));
    
	test.equal(result, 42);
};

exports['build apply expression twice'] = function (test) {
	const ctx = contexts.topContext();
	const expr = expressions.apply(expressions.apply(expressions.composite(expressions.operator('+'), [ expressions.name('a'), expressions.name('b') ]), 'b'), 'a');

    const result = expr.evaluate(ctx)(ctx, expressions.constant(40))(ctx, expressions.constant(2));
    
	test.equal(result, 42);
};

exports['build binary expression'] = function (test) {
	const ctx = contexts.topContext();
	const expr = expressions.binary(expressions.name('+'), expressions.constant(40), expressions.constant(2));
	
	test.ok(expr);

    test.equal(expr.evaluate(ctx), 42);
};



