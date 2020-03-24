module.exports = {};
let Enum0 = {
	graphqlSchema: `enum Enum0 { wipe hide }`,
	choices: ["wipe", "hide"],
	call(_, value) {
		if (Enum0.choices.includes(value))
			return value;
		else
			return undefined;
	}
};
module.exports["Enum0"] = Enum0
function ArrayType(inner) {
	return {
		call(_, value) {
			return Array.prototype.slice.call(value).map(x => inner.call(null, x));
		}
	};
};
module.exports["ArrayType"] = ArrayType;
