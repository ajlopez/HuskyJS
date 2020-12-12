
const contexts = require('./contexts');
const parsers = require('./parsers');

function Machine() {
	const ctx = contexts.topContext();
	
	this.evaluate = function (text) {
		const parser = parsers.parser(text);
		
		const expr = parser.parse();
		
		if (expr == null)
			return null;
		
		return expr.evaluate(ctx);
	}
    
    this.execute = function (text) {
        const parser = parsers.parser(text);
        let result = null;
        
        for (let expr = parser.parse(); expr != null; expr = parser.parse())
            result = expr.evaluate(ctx);
        
        return result;
    }
	
	this.get = function (name) { return ctx.get(name); };
	
	this.getType = function (name) { return ctx.getType(name); };
}

function createMachine() {
	return new Machine();
}

module.exports = {
	machine: createMachine
};

