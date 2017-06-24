
function Integer() {
}

function String() {
	
}

function Func(from, to) {
	this.from = function() { return from; };
	this.to = function() { return to; };
}

function isType(type) {
	return type instanceof Integer || type instanceof String || type instanceof Func;
}

function createFunc(from, to) {
	return new Func(from, to);
}

module.exports = {
	Integer: new Integer(),
	String: new String(),
	isType: isType,
	func: createFunc
}