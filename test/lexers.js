
const lexers = require('../lib/lexers');
const TokenType = lexers.TokenType;

exports['get name'] = function (test) {
	const lexer = lexers.lexer('foo');
	
	const result = lexer.nextToken();
	
	test.ok(result);
	test.equal(result.type, TokenType.Name);
	test.equal(result.value, 'foo');
	
	test.equal(lexer.nextToken(), null);
}

exports['get name and skip comment'] = function (test) {
	const lexer = lexers.lexer('foo -- a comment');
	
	const result = lexer.nextToken();
	
	test.ok(result);
	test.equal(result.type, TokenType.Name);
	test.equal(result.value, 'foo');
	
	test.equal(lexer.nextToken(), null);
}

exports['get name and skip comment and get end of expression'] = function (test) {
	const lexer = lexers.lexer('foo -- a comment\n');
	
	const result = lexer.nextToken();
	
	test.ok(result);
	test.equal(result.type, TokenType.Name);
	test.equal(result.value, 'foo');
	
	const result2 = lexer.nextToken();
	
	test.ok(result2);
	test.equal(result2.type, TokenType.EndOfExpression);
	test.equal(result2.value, '\n');
	
	test.equal(lexer.nextToken(), null);
}

exports['get names skipping multiline comment'] = function (test) {
    const lexer = lexers.lexer('foo {- a multiline\r\ncomment -} bar');
	
	const result = lexer.nextToken();
	
	test.ok(result);
	test.equal(result.type, TokenType.Name);
	test.equal(result.value, 'foo');
	
	const result2 = lexer.nextToken();
	
	test.ok(result2);
	test.equal(result2.type, TokenType.Name);
	test.equal(result2.value, 'bar');
	
	test.equal(lexer.nextToken(), null);
}

exports['get name with digits'] = function (test) {
	const lexer = lexers.lexer('foo42');
	
	const result = lexer.nextToken();
	
	test.ok(result);
	test.equal(result.type, TokenType.Name);
	test.equal(result.value, 'foo42');
	
	test.equal(lexer.nextToken(), null);
}

exports['get name with underscore'] = function (test) {
	const lexer = lexers.lexer('foo_bar');
	
	const result = lexer.nextToken();
	
	test.ok(result);
	test.equal(result.type, TokenType.Name);
	test.equal(result.value, 'foo_bar');
	
	test.equal(lexer.nextToken(), null);
}

exports['get name with apostrophe'] = function (test) {
	const lexer = lexers.lexer("foo'");
	
	const result = lexer.nextToken();
	
	test.ok(result);
	test.equal(result.type, TokenType.Name);
	test.equal(result.value, "foo'");
	
	test.equal(lexer.nextToken(), null);
}

exports['get underscore as name'] = function (test) {
	const lexer = lexers.lexer('_');
	
	const result = lexer.nextToken();
	
	test.ok(result);
	test.equal(result.type, TokenType.Name);
	test.equal(result.value, '_');
	
	test.equal(lexer.nextToken(), null);
}

exports['get name starting with underscore'] = function (test) {
	const lexer = lexers.lexer('_foo');
	
	const result = lexer.nextToken();
	
	test.ok(result);
	test.equal(result.type, TokenType.Name);
	test.equal(result.value, '_foo');
	
	test.equal(lexer.nextToken(), null);
}

exports['get names'] = function (test) {
	const lexer = lexers.lexer('foo bar');
	
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
	const lexer = lexers.lexer('  foo   ');
	
	const result = lexer.nextToken();
	
	test.ok(result);
	test.equal(result.type, TokenType.Name);
	test.equal(result.value, 'foo');
	
	test.equal(lexer.nextToken(), null);
}

exports['get name, operator and integer'] = function (test) {
	const lexer = lexers.lexer('n+1');
	
	var result = lexer.nextToken();
	
	test.ok(result);
	test.equal(result.type, TokenType.Name);
	test.equal(result.value, 'n');
	
	var result = lexer.nextToken();
	
	test.ok(result);
	test.equal(result.type, TokenType.Operator);
	test.equal(result.value, '+');
	
	var result = lexer.nextToken();
	
	test.ok(result);
	test.equal(result.type, TokenType.Integer);
	test.equal(result.value, '1');
	
	test.equal(lexer.nextToken(), null);
}

exports['get name, operator and name'] = function (test) {
	const lexer = lexers.lexer('m>=n');
	
	var result = lexer.nextToken();
	
	test.ok(result);
	test.equal(result.type, TokenType.Name);
	test.equal(result.value, 'm');
	
	var result = lexer.nextToken();
	
	test.ok(result);
	test.equal(result.type, TokenType.Operator);
	test.equal(result.value, '>=');
	
	var result = lexer.nextToken();
	
	test.ok(result);
	test.equal(result.type, TokenType.Name);
	test.equal(result.value, 'n');
	
	test.equal(lexer.nextToken(), null);
}

exports['get new line as end of expression'] = function (test) {
	const lexer = lexers.lexer('\n');
	
	const result = lexer.nextToken();
	
	test.ok(result);
	test.equal(result.type, TokenType.EndOfExpression);
	test.equal(result.value, '\n');
	
	test.equal(lexer.nextToken(), null);
}

exports['get carriage return and new line as end of expression'] = function (test) {
    const lexer = lexers.lexer('\r\n');
	
	const result = lexer.nextToken();
	
	test.ok(result);
	test.equal(result.type, TokenType.EndOfExpression);
	test.equal(result.value, '\n');
	
	test.equal(lexer.nextToken(), null);
}

exports['get integer'] = function (test) {
	const lexer = lexers.lexer('42');
	
	const result = lexer.nextToken();
	
	test.ok(result);
	test.equal(result.type, TokenType.Integer);
	test.equal(result.value, '42');
	
	test.equal(lexer.nextToken(), null);
}

exports['get string'] = function (test) {
	const lexer = lexers.lexer('"foo"');
	
	const result = lexer.nextToken();
	
	test.ok(result);
	test.equal(result.type, TokenType.String);
	test.equal(result.value, 'foo');
	
	test.equal(lexer.nextToken(), null);
}

exports['get character'] = function (test) {
	const lexer = lexers.lexer("'c'");
	
	const result = lexer.nextToken();
	
	test.ok(result);
	test.equal(result.type, TokenType.Character);
	test.equal(result.value, 'c');
	
	test.equal(lexer.nextToken(), null);
}

exports['get real'] = function (test) {
	const lexer = lexers.lexer('3.14159');
	
	const result = lexer.nextToken();
	
	test.ok(result);
	test.equal(result.type, TokenType.Real);
	test.equal(result.value, '3.14159');
	
	test.equal(lexer.nextToken(), null);
}

exports['get parenthesis as delimiters'] = function (test) {
	const lexer = lexers.lexer('()');
	
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
	const lexer = lexers.lexer('{}');
	
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
	const lexer = lexers.lexer('::');
	
	var result = lexer.nextToken();
	
	test.ok(result);
	test.equal(result.type, TokenType.Operator);
	test.equal(result.value, '::');
	
	test.equal(lexer.nextToken(), null);
}

exports['get . as operator'] = function (test) {
	const lexer = lexers.lexer('.');
	
	var result = lexer.nextToken();
	
	test.ok(result);
	test.equal(result.type, TokenType.Operator);
	test.equal(result.value, '.');
	
	test.equal(lexer.nextToken(), null);
}

exports['get | as operator'] = function (test) {
	const lexer = lexers.lexer('|');
	
	const result = lexer.nextToken();
	
	test.ok(result);
	test.equal(result.type, TokenType.Operator);
	test.equal(result.value, '|');
	
	test.equal(lexer.nextToken(), null);
}

exports['get + as operator'] = function (test) {
	const lexer = lexers.lexer('+');
	
	const result = lexer.nextToken();
	
	test.ok(result);
	test.equal(result.type, TokenType.Operator);
	test.equal(result.value, '+');
	
	test.equal(lexer.nextToken(), null);
}

exports['get - as operator'] = function (test) {
	const lexer = lexers.lexer('-');
	
	const result = lexer.nextToken();
	
	test.ok(result);
	test.equal(result.type, TokenType.Operator);
	test.equal(result.value, '-');
	
	test.equal(lexer.nextToken(), null);
}

exports['get -> as operator'] = function (test) {
	const lexer = lexers.lexer('->');
	
	const result = lexer.nextToken();
	
	test.ok(result);
	test.equal(result.type, TokenType.Operator);
	test.equal(result.value, '->');
	
	test.equal(lexer.nextToken(), null);
}

exports['get `div` as operator'] = function (test) {
	const lexer = lexers.lexer('`div`');
	
	const result = lexer.nextToken();
	
	test.ok(result);
	test.equal(result.type, TokenType.Operator);
	test.equal(result.value, 'div');
	
	test.equal(lexer.nextToken(), null);
}

exports['get semicolon as delimiter'] = function (test) {
	const lexer = lexers.lexer(';');
	
	const result = lexer.nextToken();
	
	test.ok(result);
	test.equal(result.type, TokenType.Delimiter);
	test.equal(result.value, ';');
	
	test.equal(lexer.nextToken(), null);
}

exports['get name and semicolon'] = function (test) {
	const lexer = lexers.lexer('foo;');
	
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
	const lexer = lexers.lexer('(foo)');
	
	const result = lexer.nextToken();
	
	test.ok(result);
	test.equal(result.type, TokenType.Delimiter);
	test.equal(result.value, '(');
	
	const result2 = lexer.nextToken();
	
	test.ok(result2);
	test.equal(result2.type, TokenType.Name);
	test.equal(result2.value, 'foo');
	
	const result3 = lexer.nextToken();
	
	test.ok(result3);
	test.equal(result3.type, TokenType.Delimiter);
	test.equal(result3.value, ')');
	
	test.equal(lexer.nextToken(), null);
}

