
function Context() {
	var values = {};
	
	this.get = function (key) { return values[key]; };
	this.set = function (key, value) { values[key] = value; };
}

function createContext() {
	return new Context();
}

module.exports = {
	context: createContext
};