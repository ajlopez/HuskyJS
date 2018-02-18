
var machines = require('../lib/machines');
var types = require('../lib/types');

exports['evaluate integer'] = function (test) {
	var machine = machines.machine();
	
	var result = machine.evaluate("42");
	
	test.ok(result);
	test.equal(result, 42);
};

exports['evaluate type name'] = function (test) {
	var machine = machines.machine();
	
	var result = machine.evaluate("Int");
	
	test.ok(result);
	test.equal(result, types.Int);
};

exports['get defined value from machine context'] = function (test) {
	var machine = machines.machine();
	
	var result = machine.get("Int");
	
	test.ok(result);
	test.equal(result, types.Int);
};

exports['get undefined type for name from machine context'] = function (test) {
	var machine = machines.machine();
	
	var result = machine.get("answer");
	
	test.equal(result, null);
};


