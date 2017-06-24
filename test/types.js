
var types = require('../lib/types');

exports['Integer as type'] = function (test) {
	test.ok(types.Integer);
	test.ok(types.isType(types.Integer));
};

exports['String as type'] = function (test) {
	test.ok(types.String);
	test.ok(types.isType(types.String));
};

