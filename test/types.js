
var types = require('../lib/types');

exports['Integer as type'] = function (test) {
	test.ok(types.Integer);
	test.ok(types.isType(types.Integer));
};

exports['String as type'] = function (test) {
	test.ok(types.String);
	test.ok(types.isType(types.String));
};

exports['Function type'] = function (test) {
	var fnt = types.func(types.String, types.Integer);
	
	test.ok(fnt);
	test.ok(types.isType(fnt));
	test.ok(fnt.from());
	test.equal(fnt.from(), types.String);
	test.equal(fnt.to(), types.Integer);
};

