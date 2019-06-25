
const parsers = require('../lib/parsers');
const contexts = require('../lib/contexts');
const types = require('../lib/types');

exports['parse integer expression'] = function (test) {
	const parser = parsers.parser('42');
	
	const expr = parser.parse();
	
	test.ok(expr);
	test.equal(expr.evaluate(), 42);
	
	test.equal(parser.parse(), null);	
};

exports['parse two integer expression'] = function (test) {
	const parser = parsers.parser('42\n1');
	
	const expr = parser.parse();
	
	test.ok(expr);
	test.equal(expr.evaluate(), 42);
	
	const expr2 = parser.parse();
	
	test.ok(expr2);
	test.equal(expr2.evaluate(), 1);
	
	test.equal(parser.parse(), null);	
};

exports['parse integer expression in parentheses'] = function (test) {
	const parser = parsers.parser('(42)');
	
	const expr = parser.parse();
	
	test.ok(expr);
	test.equal(expr.evaluate(), 42);
	
	test.equal(parser.parse(), null);	
};

exports['parse real expression'] = function (test) {
	const parser = parsers.parser('3.14159');
	
	const expr = parser.parse();
	
	test.ok(expr);
	test.equal(expr.evaluate(), 3.14159);
	
	test.equal(parser.parse(), null);	
};

exports['parse real expression in parenthesis'] = function (test) {
	const parser = parsers.parser('(3.14159)');
	
	const expr = parser.parse();
	
	test.ok(expr);
	test.equal(expr.evaluate(), 3.14159);
	
	test.equal(parser.parse(), null);	
};

exports['parse string expression'] = function (test) {
	const parser = parsers.parser('"foo"');
	
	const expr = parser.parse();
	
	test.ok(expr);
	test.equal(expr.evaluate(), "foo");
	
	test.equal(parser.parse(), null);	
};

exports['parse character expression'] = function (test) {
	const parser = parsers.parser("'a'");
	
	const expr = parser.parse();
	
	test.ok(expr);
	test.equal(expr.evaluate(), "a");
	
	test.equal(parser.parse(), null);	
};

exports['parse name expression'] = function (test) {
	const parser = parsers.parser('foo');
	const ctx = contexts.context();
	ctx.set('foo', 'bar');
	
	const expr = parser.parse();
	
	test.ok(expr);
	test.equal(expr.evaluate(ctx), "bar");
	
	test.equal(parser.parse(), null);	
};

exports['parse composite expression with one argument'] = function (test) {
	const parser = parsers.parser('incr 1');
	const ctx = contexts.context();
	ctx.set('incr', function (ctx, x) { return x.evaluate(ctx) + 1; });
	
	const expr = parser.parse();
	
	test.ok(expr);
	test.equal(expr.evaluate(ctx), 2);
	
	test.equal(parser.parse(), null);	
};

exports['parse composite expression with two argument'] = function (test) {
	const parser = parsers.parser('add 1 2');
	const ctx = contexts.context();
	
	ctx.set('add', function (ctx, x) {
		const xval = x.evaluate(ctx);
		
		return function (ctx, y) {
			const yval = y.evaluate(ctx);
			
			return xval + yval; 
		} 
	});
	
	const expr = parser.parse();
	
	test.ok(expr);
	test.equal(expr.evaluate(ctx), 3);
	
	test.equal(parser.parse(), null);	
};

exports['parse function expression in parentheses'] = function (test) {
	const parser = parsers.parser('(add)');
	const ctx = contexts.context();
	ctx.set('add', function (ctx, x) {
		const xval = x.evaluate(ctx);
		
		return function (ctx, y) {
			const yval = y.evaluate(ctx);
			
			return xval + yval; 
		} 
	});
	
	const expr = parser.parse();
	
	test.ok(expr);
	test.equal(expr.evaluate(ctx), ctx.get('add'));
	
	test.equal(parser.parse(), null);	
};

exports['parse Integer type expression'] = function (test) {
	const parser = parsers.parser('Integer');
	const ctx = contexts.topContext();
	
	const expr = parser.parse();
	
	test.ok(expr);
	test.equal(expr.evaluate(ctx), types.Integer);
	
	test.equal(parser.parse(), null);	
};

exports['parse String type expression'] = function (test) {
	const parser = parsers.parser('String');
	const ctx = contexts.topContext();
	
	const expr = parser.parse();
	
	test.ok(expr);
	test.equal(expr.evaluate(ctx), types.String);
	
	test.equal(parser.parse(), null);	
};

exports['parse add expression'] = function (test) {
	const parser = parsers.parser('2+3');
	const ctx = contexts.context();

	ctx.set('+', function (ctx, x) {
		const xval = x.evaluate(ctx);
		
		return function (ctx, y) {
			const yval = y.evaluate(ctx);
			
			return xval + yval; 
		} 
	});
	
	const expr = parser.parse();
	
	test.ok(expr);
	test.equal(expr.evaluate(ctx), 5);
	
	test.equal(parser.parse(), null);	
};

exports['parse func expression'] = function (test) {
	const parser = parsers.parser('String -> Integer');
	const ctx = contexts.context();
	ctx.set('->', function (ctx, x) { 
		return function (ctx, y) { 
			return types.func(x.evaluate(ctx), y.evaluate(ctx)); 
		} 
	});
	ctx.set('Integer', types.Integer);
	ctx.set('String', types.String);
	
	const expr = parser.parse();
	
	test.ok(expr);
	
	const value = expr.evaluate(ctx);
	
	test.ok(value);
	test.ok(types.isType(value));
	test.equal(value.from(), types.String);
	test.equal(value.to(), types.Integer);
	
	test.equal(parser.parse(), null);	
};

exports['parse func expression using top context'] = function (test) {
	const parser = parsers.parser('String -> Integer');
	const ctx = contexts.topContext();
	
	const expr = parser.parse();
	
	test.ok(expr);
	
	const value = expr.evaluate(ctx);
	
	test.ok(value);
	test.ok(types.isType(value));
	test.equal(value.from(), types.String);
	test.equal(value.to(), types.Integer);
	
	test.equal(parser.parse(), null);	
};

exports['parse type definition'] = function (test) {    
	const parser = parsers.parser('answer :: Int');
	const ctx = contexts.topContext();
	
	const expr = parser.parse();
	
	test.ok(expr);
	
	const value = expr.evaluate(ctx);

	test.ok(value);
	test.ok(types.isType(value));
    test.equal(value, types.Int);
	
    test.equal(ctx.getType('answer'), types.Int);
	
	test.equal(parser.parse(), null);	
};

exports['parse definition'] = function (test) {    
	const parser = parsers.parser('answer = 42');
	const ctx = contexts.topContext();
	
	const expr = parser.parse();
	
	test.ok(expr);
	
	const value = expr.evaluate(ctx);

	test.ok(value);
    test.equal(value, 42);
	
    test.equal(ctx.get('answer'), 42);
	
	test.equal(parser.parse(), null);	
};

exports['parse function definition with one argument'] = function (test) {    
	const parser = parsers.parser('incr n = n + 1');
	const ctx = contexts.topContext();
	
	const expr = parser.parse();
	
	test.ok(expr);
	
	const value = expr.evaluate(ctx)(41);

	test.ok(value);
    test.equal(value, 42);
	
	test.equal(parser.parse(), null);	
};

