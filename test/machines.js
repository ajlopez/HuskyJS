
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

exports['evaluate define name type'] = function (test) {
	var machine = machines.machine();
	
	var result = machine.evaluate("answer :: Int");
	
	test.ok(result);
	
	result = machine.getType("answer");
	
	test.ok(result);
	test.equal(result, types.Int);
};

exports['evaluate name to value'] = function (test) {
	var machine = machines.machine();
	
	var result = machine.evaluate("answer = 42");
	
	test.ok(result);
	
	result = machine.get("answer");
	
	test.ok(result);
	test.equal(result, 42);
};


