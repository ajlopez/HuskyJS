
const types = require('./types');

function Context(parent) {
	const values = {};
	const types = {};
	
	this.get = function (key) { 
		const value = values[key];
		
		if (value == null && parent)
			return parent.get(key);
		
		return value;
	};
	
	this.set = function (key, value) { values[key] = value; };

	this.getType = function (name) { return types[name]; };
	this.defineType = function (name, type) { types[name] = type; };
}

function createContext(parent) {
	return new Context(parent);
}

function defineLogicalFunctions(ctx) {
	ctx.set('||', function (ctx, x) {
		const xval = x.evaluate(ctx);
		
		return function (ctx, y) {
			const yval = y.evaluate(ctx);
			
			return xval || yval;
		}
	});

	ctx.set('&&', function (ctx, x) {
		const xval = x.evaluate(ctx);
		
		return function (ctx, y) {
			const yval = y.evaluate(ctx);
			
			return xval && yval;
		}
	});

	ctx.set('not', function (ctx, x) {
		const xval = x.evaluate(ctx);
		
		if (xval)
			return false;
		else
			return true;
	});
}

function defineMathFunctions(ctx) {
	ctx.set('+', function (xctx, x) {
		return function (yctx, y) {
            const xval = x.evaluate(xctx);
			const yval = y.evaluate(yctx);
			
			return xval + yval;
		}
	});
	
	ctx.set('-', function (xctx, x) {
		return function (yctx, y) {
            const xval = x.evaluate(xctx);
			const yval = y.evaluate(yctx);
			
			return xval - yval;
		}
	});
	
	ctx.set('*', function (ctx, x) {
		const xval = x.evaluate(ctx);
		
		return function (ctx, y) {
			const yval = y.evaluate(ctx);
			
			return xval * yval;
		}
	});
	
	ctx.set('/', function (ctx, x) {
		const xval = x.evaluate(ctx);
		
		return function (ctx, y) {
			const yval = y.evaluate(ctx);
			
			return xval / yval;
		}
	});
	
	ctx.set('^', function (ctx, x) {
		const xval = x.evaluate(ctx);
		
		return function (ctx, y) {
			const yval = y.evaluate(ctx);
			
			return Math.pow(xval, yval);
		}
	});

	ctx.set('div', function (ctx, x) {
		const xval = x.evaluate(ctx);
		
		return function (ctx, y) {
			const yval = y.evaluate(ctx);
			
			return Math.floor(xval / yval);
		}
	});

	ctx.set('mod', function (ctx, x) {
		const xval = x.evaluate(ctx);
		
		return function (ctx, y) {
			const yval = y.evaluate(ctx);
			
			return xval % yval;
		}
	});

	ctx.set('sqrt', function (ctx, x) {
		const xval = x.evaluate(ctx);
		
		return Math.sqrt(xval);
	});

	ctx.set('exp', function (ctx, x) {
		const xval = x.evaluate(ctx);
		
		return Math.exp(xval);
	});

	ctx.set('abs', function (ctx, x) {
		const xval = x.evaluate(ctx);
		
		return Math.abs(xval);
	});

	ctx.set('sin', function (ctx, x) {
		const xval = x.evaluate(ctx);
		
		return Math.sin(xval);
	});

	ctx.set('asin', function (ctx, x) {
		const xval = x.evaluate(ctx);
		
		return Math.asin(xval);
	});

	ctx.set('cos', function (ctx, x) {
		const xval = x.evaluate(ctx);
		
		return Math.cos(xval);
	});

	ctx.set('acos', function (ctx, x) {
		const xval = x.evaluate(ctx);
		
		return Math.acos(xval);
	});

	ctx.set('tan', function (ctx, x) {
		const xval = x.evaluate(ctx);
		
		return Math.tan(xval);
	});

	ctx.set('atan', function (ctx, x) {
		const xval = x.evaluate(ctx);
		
		return Math.atan(xval);
	});

	ctx.set('floor', function (ctx, x) {
		const xval = x.evaluate(ctx);
		
		return Math.floor(xval);
	});
}

function defineTypes(ctx)
{
	ctx.set('String', types.String);
	ctx.set('Int', types.Int);
	ctx.set('Integer', types.Integer);
	ctx.set('Float', types.Float);
	ctx.set('Double', types.Double);
	ctx.set('Char', types.Char);
}

function defineStringFunctions(ctx) {
	ctx.set('++', function (ctx, x) {
		const xval = x.evaluate(ctx);
		
		return function (ctx, y) {
			const yval = y.evaluate(ctx);
			
			return xval.toString() + yval.toString();
		}
	});

	ctx.set('!!', function (ctx, x) {
		const xval = x.evaluate(ctx);
		
		return function (ctx, y) {
			const yval = y.evaluate(ctx);
			
			return xval[yval];
		}
	});

	ctx.set('chr', function (ctx, x) {
		const xval = x.evaluate(ctx);
		
        return String.fromCharCode(xval);
	});

	ctx.set('ord', function (ctx, x) {
		const xval = x.evaluate(ctx);
		
        return xval.charCodeAt(0);
	});
}

function defineComparisonFunctions(ctx) {
	ctx.set('==', function (ctx, x) {
		const xval = x.evaluate(ctx);
		
		return function (ctx, y) {
			const yval = y.evaluate(ctx);
			
			return xval === yval;
		}
	});

	ctx.set('/=', function (ctx, x) {
		const xval = x.evaluate(ctx);
		
		return function (ctx, y) {
			const yval = y.evaluate(ctx);
			
			return xval !== yval;
		}
	});

	ctx.set('<', function (ctx, x) {
		const xval = x.evaluate(ctx);
		
		return function (ctx, y) {
			const yval = y.evaluate(ctx);
			
			return xval < yval;
		}
	});

	ctx.set('<=', function (ctx, x) {
		const xval = x.evaluate(ctx);
		
		return function (ctx, y) {
			const yval = y.evaluate(ctx);
			
			return xval <= yval;
		}
	});

	ctx.set('>', function (ctx, x) {
		const xval = x.evaluate(ctx);
		
		return function (ctx, y) {
			const yval = y.evaluate(ctx);
			
			return xval > yval;
		}
	});

	ctx.set('>=', function (ctx, x) {
		const xval = x.evaluate(ctx);
		
		return function (ctx, y) {
			const yval = y.evaluate(ctx);
			
			return xval >= yval;
		}
	});
}

function defineConstants(ctx) {
	ctx.set('False', false);
	ctx.set('True', true);
}

function defineFunctionalFunctions(ctx) {
	ctx.set('.', function (ctx, x) {
		const xval = x.evaluate(ctx);
		
		return function (ctx, y) {
			const yval = y.evaluate(ctx);
			
			return function (ctx, z) {
                const zval = z.evaluate(ctx);
                
                return xval(ctx, yval(ctx, zval));
            }
		}
	});	
}
    
function createTopContext() {
	const ctx = new Context();
	
    defineTypes(ctx);
	defineConstants(ctx);
	
	ctx.set('->', function (ctx, x) { 
		return function (ctx, y) { 
			return types.func(x.evaluate(ctx), y.evaluate(ctx)); 
		} 
	});
	
	const fnDefine = function (ctx, x) {
		return function (ctx, y) {
			const yval = y.evaluate ? y.evaluate(ctx) : y;
			
			ctx.defineType(x.name(), yval);
			
			return yval;
		}
	};
	
	ctx.set('::', fnDefine);
	
	const fnSet = function (ctx, x) {
		return function (ctx, y) {
			const yval = y.evaluate(ctx);

			ctx.set(x.name(), yval);
			
			return yval;
		}
	};
	
	ctx.set('=', fnSet);

    defineMathFunctions(ctx);
    defineLogicalFunctions(ctx);    
	defineStringFunctions(ctx);
	defineComparisonFunctions(ctx);
	defineFunctionalFunctions(ctx);

	return ctx;
}

module.exports = {
	context: createContext,
	topContext: createTopContext
};

