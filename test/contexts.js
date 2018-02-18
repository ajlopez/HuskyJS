
var contexts = require('../lib/contexts');
var types = require('../lib/types');

exports['get undefined value'] = function (test) {
	var ctx = contexts.context();
	
	test.equal(ctx.get('foo'), null);
};

exports['set and get value'] = function (test) {
	var ctx = contexts.context();
	
	ctx.set('foo', 'bar');
	
	test.equal(ctx.get('foo'), 'bar');
};

exports['get undefined type'] = function (test) {
	var ctx = contexts.context();
	
	test.equal(ctx.getType('foo'), null);
};

exports['define and get type'] = function (test) {
	var ctx = contexts.context();
	
	ctx.defineType('answer', types.Integer);
	
	test.equal(ctx.getType('answer'), types.Integer);
};

exports['top context'] = function (test) {
	var ctx = contexts.topContext();
	
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

