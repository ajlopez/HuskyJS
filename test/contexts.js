
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

exports['top context'] = function (test) {
	var ctx = contexts.topContext();
	
	test.ok(ctx.get('String'));
	test.ok(types.isType(ctx.get('String')));
	test.ok(ctx.get('Integer'));
	test.ok(types.isType(ctx.get('Integer')));
	test.ok(ctx.get('->'));
	test.equal(typeof ctx.get('->'), 'function');
};

