
const types = require('../lib/types');

exports['Integer as type'] = function (test) {
	test.ok(types.Integer);
	test.ok(types.isType(types.Integer));
};

exports['Int as type'] = function (test) {
	test.ok(types.Int);
	test.ok(types.isType(types.Int));
};

exports['Float as type'] = function (test) {
	test.ok(types.Float);
	test.ok(types.isType(types.Float));
};

exports['Double as type'] = function (test) {
	test.ok(types.Double);
	test.ok(types.isType(types.Double));
};

exports['String as type'] = function (test) {
	test.ok(types.String);
	test.ok(types.isType(types.String));
};

exports['Bool as type'] = function (test) {
	test.ok(types.Bool);
	test.ok(types.isType(types.Bool));
};

exports['Char as type'] = function (test) {
	test.ok(types.Char);
	test.ok(types.isType(types.Char));
};

exports['Function type'] = function (test) {
	var fnt = types.func(types.String, types.Integer);
	
	test.ok(fnt);
	test.ok(types.isType(fnt));
	test.ok(fnt.from());
	test.equal(fnt.from(), types.String);
	test.equal(fnt.to(), types.Integer);
};

