module.exports = {};
let City = {
	'country': arg => String.call(null, arg),
	'cityCode': arg => Number.call(null, arg),
	'countryCode': arg => Number.call(null, arg),
	'city': arg => String.call(null, arg),
	call(_, value) {
		let obj = {};
		for (property in City)
			if (property !== "call" && property !== "db" && City.hasOwnProperty(property))
				obj[property] = City[property](value[property]);
		return obj;
	},
	db() { return db.collection("City") },
};
module.exports["City"] = City

let Person = {
	'city': arg => Number.call(null, arg),
	'firstName': arg => String.call(null, arg),
	'lastName': arg => String.call(null, arg),
	call(_, value) {
		let obj = {};
		for (property in Person)
			if (property !== "call" && property !== "db" && Person.hasOwnProperty(property))
				obj[property] = Person[property](value[property]);
		return obj;
	},
	db() { return db.collection("Person") },
};
module.exports["Person"] = Person

