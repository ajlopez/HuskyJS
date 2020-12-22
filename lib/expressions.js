
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
	const nargs = argexprs.length;
	
	this.expression = function () { return expr; };
	this.expressions = function () { return argexprs; };
	
	this.evaluate = function (ctx) {
		let fn = expr.evaluate(ctx);

		for (let k = 0; k < nargs; k++)
			fn = fn(ctx, argexprs[k]);
			
		return fn;
	}
}

function BinaryExpression(expr, lexpr, rexpr) {
	this.evaluate = function (ctx) {
		const fn = expr.evaluate(ctx);

        return fn(ctx, lexpr)(ctx, rexpr);
	}
}

function ApplyExpression(expr, argname) {
	this.evaluate = function (ctx) {
        return function (ctx, arg) {
            const newctx = contexts.context(ctx);
            
            // TODO review the case arg is a constant
            if (arg.evaluate)
                newctx.set(argname, arg.evaluate(ctx));
            else
                newctx.set(argname, arg);
                
            const result = expr.evaluate(newctx);
            
            if (typeof result === 'function')
                return function (ctx, arg) {
                    return result(newctx, arg);
                }
            
            return result;
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

function createBinaryExpression(expr, lexpr, rexpr) {
    return new BinaryExpression(expr, lexpr, rexpr);
}

module.exports = {
	constant: createConstantExpression,
	name: createNameExpression,
	operator: createOperatorExpression,
	composite: createCompositeExpression,
    binary: createBinaryExpression,
    
    apply: createApplyExpression,
	
	isOperator: function (arg) { return arg instanceof OperatorExpression; }
}

