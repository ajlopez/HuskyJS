
const contexts = require('./contexts');

function ConstantExpression(value) {
	this.value = function () { return value; };
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
	
	this.expression = function () { return expr; };
	this.expressions = function () { return argexprs; };
	
	this.evaluate = function (ctx) {
		var fn = expr.evaluate(ctx);

		for (k = 0; k < nargs; k++)
			fn = fn(ctx, argexprs[k]);
			
		return fn;
	}
}

function ApplyExpression(expr, argname) {
	this.evaluate = function (ctx) {
        return function (arg) {
            const newctx = contexts.context(ctx);
            newctx.set(argname, arg);
            
            return expr.evaluate(newctx);
        }
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

function createApplyExpression(expr, argname) {
    return new ApplyExpression(expr, argname);
}

module.exports = {
	constant: createConstantExpression,
	name: createNameExpression,
	operator: createOperatorExpression,
	composite: createCompositeExpression,
    
    apply: createApplyExpression,
	
	isOperator: function (arg) { return arg instanceof OperatorExpression; }
}

