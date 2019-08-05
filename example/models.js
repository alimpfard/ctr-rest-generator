const {ArrayType, Enum0} = require("./types.js");
module.exports = {};
let City = {
	'countryCode': arg => Number.call(null, arg),
	'SOME_CONSTANT': constant value,
	'country': arg => String.call(null, arg),
	'cityCode': arg => Number.call(null, arg),
	'city': arg => String.call(null, arg),
	staticProperties: ["call", "db", "staticProperties", "SOME_CONSTANT"],
	call(_, value) {
		let obj = {};
		for (property in City)
			if ((!City.staticProperties.includes(property)) && City.hasOwnProperty(property))
				obj[property] = City[property](value[property]);
		return obj;
	},
	db() { return db.collection("City") },
};
module.exports["City"] = City

let Person = {
	'city': arg => String.call(null, arg),
	'firstName': arg => String.call(null, arg),
	'lastName': arg => String.call(null, arg),
	staticProperties: ["call", "db", "staticProperties"],
	call(_, value) {
		let obj = {};
		for (property in Person)
			if ((!Person.staticProperties.includes(property)) && Person.hasOwnProperty(property))
				obj[property] = Person[property](value[property]);
		return obj;
	},
	db() { return db.collection("Person") },
};
module.exports["Person"] = Person

