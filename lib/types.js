
function Integer() {
}

function isType(type) {
	return type instanceof Integer;
}

module.exports = {
	Integer: new Integer(),
	isType: isType
}