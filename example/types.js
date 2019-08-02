module.exports = {};
let Person = {
	'lastName': arg => String.call(null, arg),
	'city': arg => City.call(null, arg),
	'firstName': arg => String.call(null, arg),
	call(_, value) {
		let obj = {};
		for (property in Person)
			if (property !== "call" && Person.hasOwnProperty(property))
				obj[property] = Person[property](value[property]);
		return obj;
	}
};
module.exports["Person"] = Person

let City = {
	'country': arg => String.call(null, arg),
	'countryCode': arg => Number.call(null, arg),
	'cityCode': arg => Number.call(null, arg),
	'city': arg => String.call(null, arg),
	call(_, value) {
		let obj = {};
		for (property in City)
			if (property !== "call" && City.hasOwnProperty(property))
				obj[property] = City[property](value[property]);
		return obj;
	}
};
module.exports["City"] = City

function ArrayType(inner) {
	return {
		call(_, value) {
			return Array.prototype.slice.call(value).map(x => inner.call(null, x));
		}
	};
};
module.exports["ArrayType"] = ArrayType;
