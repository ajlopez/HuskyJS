
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

exports['evaluate define name type to functional type'] = function (test) {
	var machine = machines.machine();
	
	var result = machine.evaluate("fn :: Int -> Int");
	
	test.ok(result);
	
	result = machine.getType("fn");
	
	test.ok(result);
	test.ok(types.isType(result));
};

exports['evaluate name to value'] = function (test) {
	var machine = machines.machine();
	
	var result = machine.evaluate("answer = 42");
	
	test.ok(result);
	
	result = machine.get("answer");
	
	test.ok(result);
	test.equal(result, 42);
};

exports['evaluate add numbers'] = function (test) {
	var machine = machines.machine();
	
	var result = machine.evaluate("40 + 2");
	
	test.ok(result);
	test.equal(result, 42);
};

exports['evaluate subtract numbers'] = function (test) {
	var machine = machines.machine();
	
	var result = machine.evaluate("44 - 2");
	
	test.ok(result);
	test.equal(result, 42);
};

exports['evaluate multiply numbers'] = function (test) {
	var machine = machines.machine();
	
	var result = machine.evaluate("21 * 2");
	
	test.ok(result);
	test.equal(result, 42);
};

exports['evaluate divide numbers'] = function (test) {
	var machine = machines.machine();
	
	var result = machine.evaluate("84 / 2");
	
	test.ok(result);
	test.equal(result, 42);
};

exports['evaluate add value and number'] = function (test) {
	var machine = machines.machine();
	
	machine.evaluate("n = 40");
	var result = machine.evaluate("n+2");
	
	test.ok(result);
	test.equal(result, 42);
};

exports['evaluate raise to power'] = function (test) {
	var machine = machines.machine();
	
	var result = machine.evaluate("2^3");
	
	test.ok(result);
	test.equal(result, 8);
};

exports['evaluate integer division'] = function (test) {
	var machine = machines.machine();
	
	var result = machine.evaluate("6 `div` 5");
	
	test.ok(result);
	test.equal(result, 1);
};

exports['evaluate integer modulus'] = function (test) {
	var machine = machines.machine();
	
	var result = machine.evaluate("7 `mod` 5");
	
	test.ok(result);
	test.equal(result, 2);
};

exports['evaluate false constant'] = function (test) {
	var machine = machines.machine();
	
	var result = machine.evaluate("False");
	
	test.strictEqual(result, false);
};

exports['evaluate true constant'] = function (test) {
	var machine = machines.machine();
	
	var result = machine.evaluate("True");
	
	test.strictEqual(result, true);
};

exports['evaluate logical or operator'] = function (test) {
	var machine = machines.machine();
	
	test.strictEqual(machine.evaluate("True || True"), true);
	test.strictEqual(machine.evaluate("True || False"), true);
	test.strictEqual(machine.evaluate("False || True"), true);
	test.strictEqual(machine.evaluate("False || False"), false);
};



