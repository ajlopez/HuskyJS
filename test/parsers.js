
var parsers = require('../lib/parsers');

exports['parse integer expression'] = function (test) {
	var parser = parsers.parser('42');
	
	var expr = parser.parse();
	
	test.ok(expr);
	test.equal(expr.evaluate(), 42);
	
	test.equal(parser.parse(), null);	
};

exports['parse real expression'] = function (test) {
	var parser = parsers.parser('3.14159');
	
	var expr = parser.parse();
	
	test.ok(expr);
	test.equal(expr.evaluate(), 3.14159);
	
	test.equal(parser.parse(), null);	
};


