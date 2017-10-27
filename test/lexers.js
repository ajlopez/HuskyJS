
var lexers = require('../lib/lexers');
var TokenType = lexers.TokenType;

exports['get name'] = function (test) {
	var lexer = lexers.lexer('foo');
	
	var result = lexer.nextToken();
	
	test.ok(result);
	test.equal(result.type, TokenType.Name);
	test.equal(result.value, 'foo');
	
	test.equal(lexer.nextToken(), null);
}

exports['get name and skip comment'] = function (test) {
	var lexer = lexers.lexer('foo -- a comment');
	
	var result = lexer.nextToken();
	
	test.ok(result);
	test.equal(result.type, TokenType.Name);
	test.equal(result.value, 'foo');
	
	test.equal(lexer.nextToken(), null);
}

exports['get name with digits'] = function (test) {
	var lexer = lexers.lexer('foo42');
	
	var result = lexer.nextToken();
	
	test.ok(result);
	test.equal(result.type, TokenType.Name);
	test.equal(result.value, 'foo42');
	
	test.equal(lexer.nextToken(), null);
}

exports['get name with underscore'] = function (test) {
	var lexer = lexers.lexer('foo_bar');
	
	var result = lexer.nextToken();
	
	test.ok(result);
	test.equal(result.type, TokenType.Name);
	test.equal(result.value, 'foo_bar');
	
	test.equal(lexer.nextToken(), null);
}

exports['get name with apostrophe'] = function (test) {
	var lexer = lexers.lexer("foo'");
	
	var result = lexer.nextToken();
	
	test.ok(result);
	test.equal(result.type, TokenType.Name);
	test.equal(result.value, "foo'");
	
	test.equal(lexer.nextToken(), null);
}

exports['get underscore as name'] = function (test) {
	var lexer = lexers.lexer('_');
	
	var result = lexer.nextToken();
	
	test.ok(result);
	test.equal(result.type, TokenType.Name);
	test.equal(result.value, '_');
	
	test.equal(lexer.nextToken(), null);
}

exports['get name starting with underscore'] = function (test) {
	var lexer = lexers.lexer('_foo');
	
	var result = lexer.nextToken();
	
	test.ok(result);
	test.equal(result.type, TokenType.Name);
	test.equal(result.value, '_foo');
	
	test.equal(lexer.nextToken(), null);
}

exports['get names'] = function (test) {
	var lexer = lexers.lexer('foo bar');
	
	var result = lexer.nextToken();
	
	test.ok(result);
	test.equal(result.type, TokenType.Name);
	test.equal(result.value, 'foo');
	
	var result = lexer.nextToken();
	
	test.ok(result);
	test.equal(result.type, TokenType.Name);
	test.equal(result.value, 'bar');
	
	test.equal(lexer.nextToken(), null);
}

exports['get name with spaces'] = function (test) {
	var lexer = lexers.lexer('  foo   ');
	
	var result = lexer.nextToken();
	
	test.ok(result);
	test.equal(result.type, TokenType.Name);
	test.equal(result.value, 'foo');
	
	test.equal(lexer.nextToken(), null);
}

exports['get new line as end of expression'] = function (test) {
var lexer = lexers.lexer('\n');
	
	var result = lexer.nextToken();
	
	test.ok(result);
	test.equal(result.type, TokenType.EndOfExpression);
	test.equal(result.value, '\n');
	
	test.equal(lexer.nextToken(), null);
}

exports['get carriage return and new line as end of expression'] = function (test) {
var lexer = lexers.lexer('\r\n');
	
	var result = lexer.nextToken();
	
	test.ok(result);
	test.equal(result.type, TokenType.EndOfExpression);
	test.equal(result.value, '\n');
	
	test.equal(lexer.nextToken(), null);
}

exports['get integer'] = function (test) {
	var lexer = lexers.lexer('42');
	
	var result = lexer.nextToken();
	
	test.ok(result);
	test.equal(result.type, TokenType.Integer);
	test.equal(result.value, '42');
	
	test.equal(lexer.nextToken(), null);
}

exports['get string'] = function (test) {
	var lexer = lexers.lexer('"foo"');
	
	var result = lexer.nextToken();
	
	test.ok(result);
	test.equal(result.type, TokenType.String);
	test.equal(result.value, 'foo');
	
	test.equal(lexer.nextToken(), null);
}

exports['get real'] = function (test) {
	var lexer = lexers.lexer('3.14159');
	
	var result = lexer.nextToken();
	
	test.ok(result);
	test.equal(result.type, TokenType.Real);
	test.equal(result.value, '3.14159');
	
	test.equal(lexer.nextToken(), null);
}

exports['get parenthesis as delimiters'] = function (test) {
	var lexer = lexers.lexer('()');
	
	var result = lexer.nextToken();
	
	test.ok(result);
	test.equal(result.type, TokenType.Delimiter);
	test.equal(result.value, '(');
	
	var result = lexer.nextToken();
	
	test.ok(result);
	test.equal(result.type, TokenType.Delimiter);
	test.equal(result.value, ')');
	
	test.equal(lexer.nextToken(), null);
}

exports['get braces as delimiters'] = function (test) {
	var lexer = lexers.lexer('{}');
	
	var result = lexer.nextToken();
	
	test.ok(result);
	test.equal(result.type, TokenType.Delimiter);
	test.equal(result.value, '{');
	
	var result = lexer.nextToken();
	
	test.ok(result);
	test.equal(result.type, TokenType.Delimiter);
	test.equal(result.value, '}');
	
	test.equal(lexer.nextToken(), null);
}

exports['get :: as operator'] = function (test) {
	var lexer = lexers.lexer('::');
	
	var result = lexer.nextToken();
	
	test.ok(result);
	test.equal(result.type, TokenType.Operator);
	test.equal(result.value, '::');
	
	test.equal(lexer.nextToken(), null);
}

exports['get -> as operator'] = function (test) {
	var lexer = lexers.lexer('->');
	
	var result = lexer.nextToken();
	
	test.ok(result);
	test.equal(result.type, TokenType.Operator);
	test.equal(result.value, '->');
	
	test.equal(lexer.nextToken(), null);
}

exports['get semicolon as delimiter'] = function (test) {
	var lexer = lexers.lexer(';');
	
	var result = lexer.nextToken();
	
	test.ok(result);
	test.equal(result.type, TokenType.Delimiter);
	test.equal(result.value, ';');
	
	test.equal(lexer.nextToken(), null);
}

exports['get name and semicolon'] = function (test) {
	var lexer = lexers.lexer('foo;');
	
	var result = lexer.nextToken();
	
	test.ok(result);
	test.equal(result.type, TokenType.Name);
	test.equal(result.value, 'foo');
	
	var result = lexer.nextToken();
	
	test.ok(result);
	test.equal(result.type, TokenType.Delimiter);
	test.equal(result.value, ';');
	
	test.equal(lexer.nextToken(), null);
}

exports['get name in parenthesis'] = function (test) {
	var lexer = lexers.lexer('(foo)');
	
	var result = lexer.nextToken();
	
	test.ok(result);
	test.equal(result.type, TokenType.Delimiter);
	test.equal(result.value, '(');
	
	var result = lexer.nextToken();
	
	test.ok(result);
	test.equal(result.type, TokenType.Name);
	test.equal(result.value, 'foo');
	
	var result = lexer.nextToken();
	
	test.ok(result);
	test.equal(result.type, TokenType.Delimiter);
	test.equal(result.value, ')');
	
	test.equal(lexer.nextToken(), null);
}
