
function Integer() {
}

function String() {
	
}

function isType(type) {
	return type instanceof Integer || type instanceof String;
}

module.exports = {
	Integer: new Integer(),
	String: new String(),
	isType: isType
}