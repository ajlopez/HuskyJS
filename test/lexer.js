
var lexers = require('../lib/lexer');
var TokenType = lexers.TokenType;

exports['get name'] = function (test) {
	var lexer = lexers.lexer('foo');
	
	var result = lexer.nextToken();
	
	test.ok(result);
	test.equal(result.type, TokenType.Name);
	test.equal(result.value, 'foo');
	
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

exports['get integer'] = function (test) {
	var lexer = lexers.lexer('42');
	
	var result = lexer.nextToken();
	
	test.ok(result);
	test.equal(result.type, TokenType.Integer);
	test.equal(result.value, '42');
	
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

exports['get :: as operator'] = function (test) {
	var lexer = lexers.lexer('::');
	
	var result = lexer.nextToken();
	
	test.ok(result);
	test.equal(result.type, TokenType.Operator);
	test.equal(result.value, '::');
	
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

