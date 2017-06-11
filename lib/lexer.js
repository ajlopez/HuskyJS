
var TokenType = { Name: 1, Integer: 2, Delimiter: 3 };

var delimiters = [ '(', ')' ];

function Token(type, value) {
	this.type = type;
	this.value = value;
}

function Lexer(text) {
	var position = 0;
	var length = text.length;
	
	this.nextToken = function () {
		skipWhiteSpaces();
		
		if (position >= length)
			return null;
			
		var ch = text[position];

		if (isDigit(ch))
			return nextInteger();
			
		if (isDelimiter(ch))
			return new Token(TokenType.Delimiter, text[position++]);
			
		return nextName();
	}
	
	function nextInteger() {
		var value = '';
		
		while (position < length && isDigit(text[position]))
			value += text[position++];
			
		return new Token(TokenType.Integer, value);
	}
	
	function nextName() {
		var value = '';
		
		while (position < length && !isSpace(text[position]))
			value += text[position++];
			
		return new Token(TokenType.Name, value);
	}
	
	function skipWhiteSpaces() {
		while (position < length && isSpace(text[position]))
			position++;
	}
	
	function isDelimiter(ch) {
		return delimiters.indexOf(ch) >= 0;
	}
	
	function isSpace(ch) {
		return ch <= ' ';
	}
	
	function isDigit(ch) {
		return ch >= '0' && ch <= '9';
	}
}

function createLexer(text) {
	return new Lexer(text);
}

module.exports = {
	lexer: createLexer,
	TokenType: TokenType
};

