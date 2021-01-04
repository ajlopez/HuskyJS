
const machines = require('../lib/machines');
const types = require('../lib/types');

exports['evaluate integer'] = function (test) {
	const machine = machines.machine();
	
	const result = machine.evaluate("42");
	
	test.ok(result);
	test.equal(result, 42);
};

exports['evaluate string'] = function (test) {
	const machine = machines.machine();
	
	const result = machine.evaluate('"foo"');
	
	test.ok(result);
	test.equal(result, "foo");
};

exports['evaluate type name'] = function (test) {
	const machine = machines.machine();
	
	const result = machine.evaluate("Int");
	
	test.ok(result);
	test.equal(result, types.Int);
};

exports['get defined value from machine context'] = function (test) {
	const machine = machines.machine();
	
	const result = machine.get("Int");
	
	test.ok(result);
	test.equal(result, types.Int);
};

exports['get undefined type for name from machine context'] = function (test) {
	const machine = machines.machine();
	
	const result = machine.get("answer");
	
	test.equal(result, null);
};

exports['evaluate define name type'] = function (test) {
	const machine = machines.machine();
	
	const result = machine.evaluate("answer :: Int");
	
	test.ok(result);
	
	const result2 = machine.getType("answer");
	
	test.ok(result2);
	test.equal(result2, types.Int);
};

exports['evaluate define name type to functional type'] = function (test) {
	const machine = machines.machine();
	
	const result = machine.evaluate("fn :: Int -> Int");
	
	test.ok(result);
	
	const result2 = machine.getType("fn");
	
	test.ok(result2);
	test.ok(types.isType(result2));
};

exports['evaluate name to value'] = function (test) {
	const machine = machines.machine();
	
	const result = machine.evaluate("answer = 42");
	
	test.ok(result);
	
	const result2 = machine.get("answer");
	
	test.ok(result2);
	test.equal(result2, 42);
};

exports['evaluate add numbers'] = function (test) {
	const machine = machines.machine();
	
	const result = machine.evaluate("40 + 2");
	
	test.ok(result);
	test.equal(result, 42);
};

exports['evaluate subtract numbers'] = function (test) {
	const machine = machines.machine();
	
	const result = machine.evaluate("44 - 2");
	
	test.ok(result);
	test.equal(result, 42);
};

exports['evaluate multiply numbers'] = function (test) {
	const machine = machines.machine();
	
	const result = machine.evaluate("21 * 2");
	
	test.ok(result);
	test.equal(result, 42);
};

exports['evaluate divide numbers'] = function (test) {
	const machine = machines.machine();
	
	const result = machine.evaluate("84 / 2");
	
	test.ok(result);
	test.equal(result, 42);
};

exports['evaluate add value and number'] = function (test) {
	const machine = machines.machine();
	
	machine.evaluate("n = 40");
	const result = machine.evaluate("n+2");
	
	test.ok(result);
	test.equal(result, 42);
};

exports['define and evaluate double'] = function (test) {
	const machine = machines.machine();
	
	machine.evaluate("double n = 2 * n");
	const result = machine.evaluate("double 21");
	
	test.ok(result);
	test.equal(result, 42);
};

exports['evaluate raise to power'] = function (test) {
	const machine = machines.machine();
	
	const result = machine.evaluate("2^3");
	
	test.ok(result);
	test.equal(result, 8);
};

exports['evaluate integer division'] = function (test) {
	const machine = machines.machine();
	
	const result = machine.evaluate("6 `div` 5");
	
	test.ok(result);
	test.equal(result, 1);
};

exports['evaluate integer modulus'] = function (test) {
	const machine = machines.machine();
	
	const result = machine.evaluate("7 `mod` 5");
	
	test.ok(result);
	test.equal(result, 2);
};

exports['evaluate false constant'] = function (test) {
	const machine = machines.machine();
	
	const result = machine.evaluate("False");
	
	test.strictEqual(result, false);
};

exports['evaluate true constant'] = function (test) {
	const machine = machines.machine();
	
	const result = machine.evaluate("True");
	
	test.strictEqual(result, true);
};

exports['evaluate logical or operator'] = function (test) {
	const machine = machines.machine();
	
	test.strictEqual(machine.evaluate("True || True"), true);
	test.strictEqual(machine.evaluate("True || False"), true);
	test.strictEqual(machine.evaluate("False || True"), true);
	test.strictEqual(machine.evaluate("False || False"), false);
};

exports['evaluate logical and operator'] = function (test) {
	const machine = machines.machine();
	
	test.strictEqual(machine.evaluate("True && True"), true);
	test.strictEqual(machine.evaluate("True && False"), false);
	test.strictEqual(machine.evaluate("False && True"), false);
	test.strictEqual(machine.evaluate("False && False"), false);
};

exports['evaluate logical not operator'] = function (test) {
	const machine = machines.machine();
	
	test.strictEqual(machine.evaluate("not True"), false);
	test.strictEqual(machine.evaluate("not False"), true);
};

exports['evaluate sqrt operator'] = function (test) {
	const machine = machines.machine();
	
	test.equal(machine.evaluate("sqrt 4"), 2);
	test.equal(machine.evaluate("sqrt 25"), 5);
};

exports['evaluate exp operator'] = function (test) {
	const machine = machines.machine();
	
	test.equal(machine.evaluate("exp 0"), 1);
	test.equal(machine.evaluate("exp 1"), Math.E);
	test.equal(machine.evaluate("exp 2"), Math.exp(2));
};

exports['evaluate abs operator'] = function (test) {
	const machine = machines.machine();
	
	test.equal(machine.evaluate("abs 0"), 0);
	test.equal(machine.evaluate("abs 1"), 1);
	test.equal(machine.evaluate("abs (0 - 42)"), 42);
};

exports['evaluate sin operator'] = function (test) {
	const machine = machines.machine();
	
	test.equal(machine.evaluate("sin 0"), 0);
	test.equal(machine.evaluate("sin 1"), Math.sin(1));
	test.equal(machine.evaluate("sin 2"), Math.sin(2));
};

exports['evaluate cos operator'] = function (test) {
	const machine = machines.machine();
	
	test.equal(machine.evaluate("cos 0"), 1);
	test.equal(machine.evaluate("cos 1"), Math.cos(1));
	test.equal(machine.evaluate("cos 2"), Math.cos(2));
};

exports['evaluate tan operator'] = function (test) {
	const machine = machines.machine();
	
	test.equal(machine.evaluate("tan 0"), 0);
	test.equal(machine.evaluate("tan 1"), Math.tan(1));
	test.equal(machine.evaluate("tan 2"), Math.tan(2));
};

exports['evaluate floor operator'] = function (test) {
	const machine = machines.machine();
	
	test.equal(machine.evaluate("floor 0"), 0);
	test.equal(machine.evaluate("floor 1.5"), 1);
	test.equal(machine.evaluate("floor (1 - 2.5)"), -2);
};

exports['evaluate asin operator'] = function (test) {
	const machine = machines.machine();
	
	test.equal(machine.evaluate("asin 0"), 0);
	test.equal(machine.evaluate("asin 0.5"), Math.asin(0.5));
	test.equal(machine.evaluate("asin (0.5 - 1)"), Math.asin(-0.5));
};

exports['evaluate acos operator'] = function (test) {
	const machine = machines.machine();
	
	test.equal(machine.evaluate("acos 0"), Math.acos(0));
	test.equal(machine.evaluate("acos 0.5"), Math.acos(0.5));
	test.equal(machine.evaluate("acos (0.5 - 1)"), Math.acos(-0.5));
};

exports['evaluate atan operator'] = function (test) {
	const machine = machines.machine();
	
	test.equal(machine.evaluate("atan 0"), Math.atan(0));
	test.equal(machine.evaluate("atan 0.5"), Math.atan(0.5));
	test.equal(machine.evaluate("atan (0.5 - 1)"), Math.atan(-0.5));
};

exports['evaluate string concatenation'] = function (test) {
	const machine = machines.machine();
	
	test.equal(machine.evaluate('"foo" ++ "bar"'), "foobar");
};

exports['evaluate equals numbers'] = function (test) {
	const machine = machines.machine();
	
	test.strictEqual(machine.evaluate('42 == 42'), true);
	test.strictEqual(machine.evaluate('42 == (21 * 2)'), true);

	test.strictEqual(machine.evaluate('42 == 1'), false);
	test.strictEqual(machine.evaluate('42 == "42"'), false);
};

exports['evaluate equals strings'] = function (test) {
	const machine = machines.machine();
	
	test.strictEqual(machine.evaluate('"foo" == "foo"'), true);
	test.strictEqual(machine.evaluate('"foobar" == ("foo" ++ "bar")'), true);

	test.strictEqual(machine.evaluate('"foo" == "bar"'), false);
	test.strictEqual(machine.evaluate('"foo" == 42'), false);
};

exports['evaluate not equals numbers'] = function (test) {
	const machine = machines.machine();
	
	test.strictEqual(machine.evaluate('42 /= 42'), false);
	test.strictEqual(machine.evaluate('42 /= (21 * 2)'), false);

	test.strictEqual(machine.evaluate('42 /= 1'), true);
	test.strictEqual(machine.evaluate('42 /= "42"'), true);
};

exports['evaluate not equals strings'] = function (test) {
	const machine = machines.machine();
	
	test.strictEqual(machine.evaluate('"foo" /= "foo"'), false);
	test.strictEqual(machine.evaluate('"foobar" /= ("foo" ++ "bar")'), false);

	test.strictEqual(machine.evaluate('"foo" /= "bar"'), true);
	test.strictEqual(machine.evaluate('"foo" /= 42'), true);
};

exports['evaluate less than with numbers'] = function (test) {
	const machine = machines.machine();
	
	test.strictEqual(machine.evaluate('42 < 42'), false);
	test.strictEqual(machine.evaluate('42 < (21 * 2)'), false);

	test.strictEqual(machine.evaluate('42 < 101'), true);
	test.strictEqual(machine.evaluate('1 < 42'), true);
};

exports['evaluate less than with strings'] = function (test) {
	const machine = machines.machine();
	
	test.strictEqual(machine.evaluate('"foo" < "foo"'), false);
	test.strictEqual(machine.evaluate('"foo" < ("b" ++ "ar")'), false);

	test.strictEqual(machine.evaluate('"bar" < "foo"'), true);
	test.strictEqual(machine.evaluate('"a" < "aaa"'), true);
};

exports['evaluate less or equal than with numbers'] = function (test) {
	const machine = machines.machine();

	test.strictEqual(machine.evaluate('42 <= 1'), false);
	
	test.strictEqual(machine.evaluate('42 <= 42'), true);
	test.strictEqual(machine.evaluate('42 <= (21 * 2)'), true);

	test.strictEqual(machine.evaluate('42 <= 101'), true);
	test.strictEqual(machine.evaluate('1 <= 42'), true);
};

exports['evaluate less or equal than with strings'] = function (test) {
	const machine = machines.machine();
	
	test.strictEqual(machine.evaluate('"foo" <= "bar"'), false);

	test.strictEqual(machine.evaluate('"foo" <= "foo"'), true);
	test.strictEqual(machine.evaluate('"foo" <= ("b" ++ "ar")'), false);

	test.strictEqual(machine.evaluate('"bar" < "foo"'), true);
	test.strictEqual(machine.evaluate('"a" < "aaa"'), true);
};

exports['evaluate greater than with numbers'] = function (test) {
	const machine = machines.machine();
	
	test.strictEqual(machine.evaluate('42 > 42'), false);
	test.strictEqual(machine.evaluate('42 > (21 * 2)'), false);

	test.strictEqual(machine.evaluate('101 > 42'), true);
	test.strictEqual(machine.evaluate('42 > 1'), true);
};

exports['evaluate greater than with strings'] = function (test) {
	const machine = machines.machine();
	
	test.strictEqual(machine.evaluate('"foo" > "foo"'), false);
	test.strictEqual(machine.evaluate('"bar" > ("f" ++ "ar")'), false);

	test.strictEqual(machine.evaluate('"foo" > "bar"'), true);
	test.strictEqual(machine.evaluate('"b" > "a"'), true);
};

exports['evaluate greater or equal than with numbers'] = function (test) {
	const machine = machines.machine();
	
	test.strictEqual(machine.evaluate('42 >= 144'), false);

	test.strictEqual(machine.evaluate('42 >= 42'), true);
	test.strictEqual(machine.evaluate('42 >= (21 * 2)'), true);

	test.strictEqual(machine.evaluate('101 >= 42'), true);
	test.strictEqual(machine.evaluate('42 >= 1'), true);
};

exports['evaluate greater or equal than with strings'] = function (test) {
	const machine = machines.machine();
	
	test.strictEqual(machine.evaluate('"bar" >= "foo"'), false);

	test.strictEqual(machine.evaluate('"foo" >= "foo"'), true);
	test.strictEqual(machine.evaluate('"bar" >= ("f" ++ "ar")'), false);

	test.strictEqual(machine.evaluate('"foo" >= "bar"'), true);
	test.strictEqual(machine.evaluate('"b" >= "a"'), true);
};

exports['accessing character'] = function (test) {
	const machine = machines.machine();
	
	test.strictEqual(machine.evaluate('"foo" !! 0'), 'f');
	test.strictEqual(machine.evaluate('"foo" !! 1'), 'o');
	test.strictEqual(machine.evaluate('"foo" !! 2'), 'o');
};

exports['number to character'] = function (test) {
	const machine = machines.machine();
	
	test.strictEqual(machine.evaluate('chr 32'), ' ');
	test.strictEqual(machine.evaluate('chr 48'), '0');
	test.strictEqual(machine.evaluate('chr 49'), '1');
	test.strictEqual(machine.evaluate('chr 65'), 'A');
};

exports['character to number'] = function (test) {
	const machine = machines.machine();
	
	test.strictEqual(machine.evaluate("ord ' '"), 32);
	test.strictEqual(machine.evaluate("ord '0'"), 48);
	test.strictEqual(machine.evaluate("ord '1'"), 49);
	test.strictEqual(machine.evaluate("ord 'A'"), 65);
};

exports['execute integer'] = function (test) {
	const machine = machines.machine();
	
	test.strictEqual(machine.execute("42"), 42);
};

exports['execute two integers'] = function (test) {
	const machine = machines.machine();
	
	test.strictEqual(machine.execute("1\n42"), 42);
};

exports['execute named arithmetic expression'] = function (test) {
	const machine = machines.machine();
	
	test.strictEqual(machine.execute("three :: Int\nthree = 2 + 1\nthree"), 3);
};

exports['execute double definition and invocation'] = function (test) {
	const machine = machines.machine();
	
	test.strictEqual(machine.execute("double :: Int -> Int\ndouble n = n * 2\ndouble 21"), 42);
};

exports['execute function composition'] = function (test) {
	const machine = machines.machine();
	
	test.strictEqual(machine.execute("double :: Int -> Int\ndouble x = x * 2\ntriple :: Int -> Int\ntriple y = y * 3\nbysix :: Int -> Int\nbysix = double . triple\nbysix 7"), 42);
};
