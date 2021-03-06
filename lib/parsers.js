
const lexers = require('./lexers');
const TokenType = lexers.TokenType;
const expressions = require('./expressions');

function Parser(text) {
	const lexer = lexers.lexer(text);
	
	this.parse = function () {
		const expr = parseExpression();
        
        parseEndOfExpression();
        
        return expr;
	};
	
	function parseExpression() {
		let expr = parseBinaryExpression();

		if (expr == null)
			return null;
			
		const args = [];
		
		for (let arg = parseSimpleExpression(); arg != null; arg = parseSimpleExpression()) {
			if (args.length === 0 && expressions.isOperator(arg)) {
				args.push(expr);
				expr = arg;
				args.push(parseExpression());
                break;
			}
            
			if (expressions.isOperator(arg) && arg.name() === '=') {
                let rexpr = parseExpression();
                
                while (args.length)
                    rexpr = expressions.apply(rexpr, args.pop().name());
                
                args.push(expr);
				expr = arg;
				args.push(rexpr);
                
                break;
			}
            
            args.push(arg);
        }
			
		if (args.length)
			return expressions.composite(expr, args);
			
		return expr;
	}
    
    function parseEndOfExpression() {
        const token = lexer.nextToken();
        
        if (token == null || token.type === TokenType.EndOfExpression)
            return;

        throw new Error();
    }
    
    function parseBinaryExpression() {
        const expr = parseSimpleExpression();
        
        if (!expr)
            return null;
        
        const token = lexer.nextToken();
        
        if (!token)
            return expr;
        
        if (token.type != TokenType.Operator) {
            lexer.pushToken(token);
            return expr;
        }

        // TODO review get full expression after =
        if (token.value === '=')
            return expressions.binary(expressions.name(token.value), expr, parseExpression());
        
        return expressions.binary(expressions.name(token.value), expr, parseSimpleExpression());
    }
	
	function parseSimpleExpression() {
		const token = lexer.nextToken();
		
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
				const expr = parseExpression();
				parseToken(TokenType.Delimiter, ')');
				return expr;
			}
			else if (token.value === ')') {
				lexer.pushToken(token);
				return null;
			}
            
        lexer.pushToken(token);
	}
	
	function parseToken(type, value) {
		const token = lexer.nextToken();
		
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

