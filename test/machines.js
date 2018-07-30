
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

exports['evaluate logical and operator'] = function (test) {
	var machine = machines.machine();
	
	test.strictEqual(machine.evaluate("True && True"), true);
	test.strictEqual(machine.evaluate("True && False"), false);
	test.strictEqual(machine.evaluate("False && True"), false);
	test.strictEqual(machine.evaluate("False && False"), false);
};

exports['evaluate logical not operator'] = function (test) {
	var machine = machines.machine();
	
	test.strictEqual(machine.evaluate("not True"), false);
	test.strictEqual(machine.evaluate("not False"), true);
};

exports['evaluate sqrt operator'] = function (test) {
	var machine = machines.machine();
	
	test.equal(machine.evaluate("sqrt 4"), 2);
	test.equal(machine.evaluate("sqrt 25"), 5);
};

exports['evaluate exp operator'] = function (test) {
	var machine = machines.machine();
	
	test.equal(machine.evaluate("exp 0"), 1);
	test.equal(machine.evaluate("exp 1"), Math.E);
	test.equal(machine.evaluate("exp 2"), Math.exp(2));
};

exports['evaluate abs operator'] = function (test) {
	var machine = machines.machine();
	
	test.equal(machine.evaluate("abs 0"), 0);
	test.equal(machine.evaluate("abs 1"), 1);
	test.equal(machine.evaluate("abs (0 - 42)"), 42);
};

exports['evaluate sin operator'] = function (test) {
	var machine = machines.machine();
	
	test.equal(machine.evaluate("sin 0"), 0);
	test.equal(machine.evaluate("sin 1"), Math.sin(1));
	test.equal(machine.evaluate("sin 2"), Math.sin(2));
};
