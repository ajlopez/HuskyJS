
function ConstantExpression(value) {
	this.evaluate = function () { return value; };
}

function NameExpression(name) {
	this.evaluate = function (ctx) { return ctx.get(name); };
	this.name = function () { return name; };
}

function createConstantExpression(value) {
	return new ConstantExpression(value);
}

function createNameExpression(name) {
	return new NameExpression(name);
}

module.exports = {
	constant: createConstantExpression,
	name: createNameExpression
}

