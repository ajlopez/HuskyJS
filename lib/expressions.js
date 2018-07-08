
function ConstantExpression(value) {
	this.evaluate = function () { return value; };
}

function NameExpression(name) {
	this.evaluate = function (ctx) { return ctx.get(name); };
	this.name = function () { return name; };
}

function OperatorExpression(name) {
	this.evaluate = function (ctx) { return ctx.get(name); };
	this.name = function () { return name; };
}

function CompositeExpression(expr, argexprs) {
	var nargs = argexprs.length;
	
	this.evaluate = function (ctx) {
		var fn = expr.evaluate(ctx);

		if (fn.lazy)
			for (k = 0; k < nargs; k++)
				fn = fn(argexprs[k], ctx);
		else
			for (k = 0; k < nargs; k++)
				fn = fn(argexprs[k].evaluate(ctx));
			
		return fn;
	}
}

function createConstantExpression(value) {
	return new ConstantExpression(value);
}

function createNameExpression(name) {
	return new NameExpression(name);
}

function createOperatorExpression(name) {
	return new OperatorExpression(name);
}

function createCompositeExpression(expr, argexprs) {
	return new CompositeExpression(expr, argexprs);
}

module.exports = {
	constant: createConstantExpression,
	name: createNameExpression,
	operator: createOperatorExpression,
	composite: createCompositeExpression,
	
	isOperator: function (arg) { return arg instanceof OperatorExpression; }
}

