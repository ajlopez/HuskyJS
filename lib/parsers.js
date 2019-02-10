
var lexers = require('./lexers');
var TokenType = lexers.TokenType;
var expressions = require('./expressions');

function Parser(text) {
	var lexer = lexers.lexer(text);
	
	this.parse = function () {
		return parseExpression();
	};
	
	function parseExpression() {
		var expr = parseSimpleExpression();
		
		if (expr == null)
			return null;
			
		var args = [];
		
		for (var arg = parseSimpleExpression(); arg != null; arg = parseSimpleExpression())
			if (args.length === 0 && expressions.isOperator(arg)) {
				args.push(expr);
				expr = arg;
				args.push(parseExpression());
                break;
			}
			else
				args.push(arg);
			
		if (args.length)
			return expressions.composite(expr, args);
			
		return expr;
	}
	
	function parseSimpleExpression() {
		var token = lexer.nextToken();
		
		if (token == null)
			return null;
		
		if (token.type === TokenType.Integer)
			return expressions.constant(parseInt(token.value));
		
		if (token.type === TokenType.Real)
			return expressions.constant(parseFloat(token.value));

		if (token.type === TokenType.String)
			return expressions.constant(token.value);

		if (token.type === TokenType.Character)
			return expressions.constant(token.value);

		if (token.type === TokenType.Name)
			return expressions.name(token.value);
		
		if (token.type === TokenType.Operator)
			return expressions.operator(token.value);
		
		if (token.type === TokenType.Delimiter)
			if (token.value === '(') {
				var expr = parseExpression();
				parseToken(TokenType.Delimiter, ')');
				return expr;
			}
			else if (token.value === ')') {
				lexer.pushToken(token);
				return null;
			}
	}
	
	function parseToken(type, value) {
		var token = lexer.nextToken();
		
		if (!token || token.type !== type || token.value !== value)
			throw new Error('Expected ' + value);
	}
}

function createParser(text) {
	return new Parser(text);
}

module.exports = {
	parser: createParser
}

