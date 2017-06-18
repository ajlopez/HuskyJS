
var contexts = require('../lib/contexts');

exports['get undefined value'] = function (test) {
	var ctx = contexts.context();
	
	test.equal(ctx.get('foo'), null);
};

exports['set and get value'] = function (test) {
	var ctx = contexts.context();
	
	ctx.set('foo', 'bar');
	
	test.equal(ctx.get('foo'), 'bar');
};


