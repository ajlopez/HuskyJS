
const contexts = require('../lib/contexts');
const types = require('../lib/types');

exports['get undefined value'] = function (test) {
	const ctx = contexts.context();
	
	test.equal(ctx.get('foo'), null);
};

exports['set and get value'] = function (test) {
	const ctx = contexts.context();
	
	ctx.set('foo', 'bar');
	
	test.equal(ctx.get('foo'), 'bar');
};

exports['get undefined type'] = function (test) {
	const ctx = contexts.context();
	
	test.equal(ctx.getType('foo'), null);
};

exports['define and get type'] = function (test) {
	const ctx = contexts.context();
	
	ctx.defineType('answer', types.Integer);
	
	test.equal(ctx.getType('answer'), types.Integer);
};

exports['context with parent context'] = function (test) {
	const parent = contexts.context();
	
	parent.set('a', 1);
	parent.set('b', 2);
	
	const ctx = contexts.context(parent);
	
	ctx.set('b', 3);
	ctx.set('c', 4);
	
	test.equal(ctx.get('d'), null);
	test.equal(ctx.get('c'), 4);
	test.equal(ctx.get('b'), 3);
	test.equal(ctx.get('a'), 1);
	
	test.equal(parent.get('d'), null);
	test.equal(parent.get('c'), null);
	test.equal(parent.get('b'), 2);
	test.equal(parent.get('a'), 1);
};

exports['top context'] = function (test) {
	const ctx = contexts.topContext();
	
	test.ok(ctx.get('String'));
	test.ok(types.isType(ctx.get('String')));
	test.ok(ctx.get('Int'));
	test.ok(types.isType(ctx.get('Int')));
	test.ok(ctx.get('Integer'));
	test.ok(types.isType(ctx.get('Integer')));
	test.ok(ctx.get('Float'));
	test.ok(types.isType(ctx.get('Float')));
	test.ok(ctx.get('Double'));
	test.ok(types.isType(ctx.get('Double')));
	test.ok(ctx.get('Char'));
	test.ok(types.isType(ctx.get('Char')));
	test.ok(ctx.get('->'));
	test.equal(typeof ctx.get('->'), 'function');
};

