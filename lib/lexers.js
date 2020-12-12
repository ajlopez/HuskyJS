
const TokenType = { Name: 1, Integer: 2, Real: 3, String: 4, Character: 5, Delimiter: 6, Operator: 7, EndOfExpression: 8 };

const delimiters = [ '(', ')', ';', '{', '}'  ];

function Token(type, value) {
	this.type = type;
	this.value = value;
}

function Lexer(text) {
	const length = text.length;
	let position = 0;
	let token;
	
	this.nextToken = function () {
		if (token) {
			const result = token;
            
			token = null;
            
			return result;
		}
		
		skipWhiteSpaces();
		
		if (position >= length)
			return null;
			
		var ch = text[position];
		
		if (ch === '\n') {
			position++;
			
			return { value: ch, type: TokenType.EndOfExpression };			
		}
		
		if (ch === '"')
			return nextString();

		if (ch === "'")
			return nextCharacter();

		if (ch === '`')
			return nextOperatorName();
		
		if (isDigit(ch))
			return nextInteger();
			
		if (isDelimiter(ch))
			return new Token(TokenType.Delimiter, text[position++]);
			
		if (ch === '_' || isLetter(ch))
			return nextName();
			
		return nextOperator();
	}
	
	this.pushToken = function (tok) {
		token = tok;
	}
	
	function nextOperator() {
		let value = '';

		while (position < length && isOperatorCharacter(text[position]))
			value += text[position++];
			
		return new Token(TokenType.Operator, value);
	}
	
	function nextString() {
		let value = '';
		position++;
		
		while (position < length && text[position] !== '"')
			value += text[position++];
		
		if (position < length)
			position++;
			
		return new Token(TokenType.String, value);
	}
	
	function nextCharacter() {
		let value = '';
		position++;
		
		while (position < length && text[position] !== "'")
			value += text[position++];
		
		if (position < length)
			position++;
			
		return new Token(TokenType.Character, value);
	}
	
	function nextOperatorName() {
		let value = '';
		position++;
		
		while (position < length && text[position] !== '`')
			value += text[position++];
		
		if (position < length)
			position++;
			
		return new Token(TokenType.Operator, value);
	}
	
	function nextInteger() {
		let value = '';
		
		while (position < length && isDigit(text[position]))
			value += text[position++];
		
		if (text[position]=='.')
			return nextReal(value);
			
		return new Token(TokenType.Integer, value);
	}
	
	function nextReal(value) {
		value += '.';
		position++;
		
		while (position < length && isDigit(text[position]))
			value += text[position++];
			
		return new Token(TokenType.Real, value);
	}

	function nextName() {
		let value = '';
		
		while (position < length && (text[position] === '_' || text[position] === "'" || isLetter(text[position]) || isDigit(text[position])))
			value += text[position++];
			
		return new Token(TokenType.Name, value);
	}
	
	function skipWhiteSpaces() {
		while (true) {
			while (position < length && isSpace(text[position]))
				position++;
			
			if (text[position] === '-' && text[position+1] === '-')
				while (position < length && text[position] !== '\n')
					position++;
			else
				return;
		}
	}
	
	function isOperatorCharacter(ch) {
		return !isSpace(ch) && !isDigit(ch) && !isLetter(ch) && !isDelimiter(ch);
	}
	
	function isDelimiter(ch) {
		return delimiters.indexOf(ch) >= 0;
	}
	
	function isSpace(ch) {
		return ch <= ' ' && ch !== '\n';
	}
	
	function isDigit(ch) {
		return ch >= '0' && ch <= '9';
	}
	
	function isLetter(ch) {
		return ch >= 'a' && ch <= 'z' || ch >= 'A' && ch <= 'Z';
	}
}

function createLexer(text) {
	return new Lexer(text);
}

module.exports = {
	lexer: createLexer,
	TokenType: TokenType
};

