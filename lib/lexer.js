
var TokenType = { Name: 1 };

function Token(type, value) {
	this.type = type;
	this.value = value;
}

function Lexer(text) {
	var position = 0;
	var length = text.length;
	
	this.nextToken = function () {
		if (position >= length)
			return null;
			
		skipWhiteSpaces();
			
		var token = new Token(TokenType.Name, text.trim());
		
		length = position;
		
		return token;
	}
	
	function skipWhiteSpaces() {
		while (position < length && isSpace(text[position]))
			position++;
	}
	
	function isSpace(ch) {
		return ch <= ' ';
	}
}

function createLexer(text) {
	return new Lexer(text);
}

module.exports = {
	lexer: createLexer,
	TokenType: TokenType
};

