
var lexers = require('./lexers');
var TokenType = lexers.TokenType;

function ConstantExpression(value) {
	this.evaluate = function () { return value; };
}

function NameExpression(name) {
	this.evaluate = function (ctx) { return ctx.get(name); };
}

function CompositeExpression(expr, argexprs) {
	var nargs = argexprs.length;
	
	this.evaluate = function (ctx) {
		var fn = expr.evaluate(ctx);

		for (k = 0; k < nargs; k++)
			fn = fn(argexprs[k].evaluate(ctx));
			
		return fn;
	}
}

function Parser(text) {
	var lexer = lexers.lexer(text);
	
	this.parse = function () {
		var expr = parseSimpleExpression();
		
		if (expr == null)
			return null;
			
		var args = [];
		
		for (var arg = parseSimpleExpression(); arg != null; arg = parseSimpleExpression())
			args.push(arg);
			
		if (args.length)
			return new CompositeExpression(expr, args);
			
		return expr;
	};
	
	function parseSimpleExpression() {
		var token = lexer.nextToken();
		
		if (token == null)
			return null;
		
		if (token.type === TokenType.Integer)
			return new ConstantExpression(parseInt(token.value));
		
		if (token.type === TokenType.Real)
			return new ConstantExpression(parseFloat(token.value));

		if (token.type === TokenType.String)
			return new ConstantExpression(token.value);

		if (token.type === TokenType.Name)
			return new NameExpression(token.value);
	}
}

function createParser(text) {
	return new Parser(text);
}

module.exports = {
	parser: createParser
}