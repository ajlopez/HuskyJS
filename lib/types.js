
function Integer() {
}

function Int() {
}

function String() {
	
}

function Double() {
	
}

function Float() {
	
}

function String() {
	
}

function Char() {
	
}

function Bool() {
	
}

function Func(from, to) {
	this.from = function() { return from; };
	this.to = function() { return to; };
}

function isType(type) {
	return type instanceof Integer || type instanceof Int || type instanceof Double || type instanceof Float || type instanceof Char || type instanceof Bool || type instanceof String || type instanceof Func;
}

function createFunc(from, to) {
	return new Func(from, to);
}

module.exports = {
	Int: new Int(),
	Integer: new Integer(),
	String: new String(),
	Bool: new Bool(),
	Char: new Char(),
	Float: new Float(),
	Double: new Double(),
	isType: isType,
	func: createFunc
}

