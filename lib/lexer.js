
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
			
		var token = new Token(TokenType.Name, text.trim());
		
		length = position;
		
		return token;
	}
}

function createLexer(text) {
	return new Lexer(text);
}

module.exports = {
	lexer: createLexer,
	TokenType: TokenType
};

