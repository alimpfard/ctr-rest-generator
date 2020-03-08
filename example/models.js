const {ArrayType, Enum0} = require("./types.js");
const { ObjectId } = require("mongodb");
module.exports = {};
let Person = {
	'firstName': arg => String.call(null, arg),
	'lastName': arg => String.call(null, arg),
	'city': arg => String.call(null, arg),
	staticProperties: ["call", "db", "findById", "staticProperties"],
	call(_, value) {
		let obj = {};
		for (property in Person)
			if ((!Person.staticProperties.includes(property)) && Person.hasOwnProperty(property))
				obj[property] = Person[property](value[property]);
		return obj;
	},
	db() { return db.collection("Person") },
	async findById(id) {
		return await db.collection("Person").findOne({
			$and:
				[
					{_id: new ObjectId(id)},
					...(Array.prototype.slice.call(arguments, 1))
				]
		});
	},
};
module.exports["Person"] = Person

let City = {
	'country': arg => String.call(null, arg),
	'cityCode': arg => Number.call(null, arg),
	'SOME_CONSTANT': constant value,
	'countryCode': arg => Number.call(null, arg),
	'city': arg => String.call(null, arg),
	staticProperties: ["call", "db", "findById", "staticProperties", "SOME_CONSTANT"],
	call(_, value) {
		let obj = {};
		for (property in City)
			if ((!City.staticProperties.includes(property)) && City.hasOwnProperty(property))
				obj[property] = City[property](value[property]);
		return obj;
	},
	db() { return db.collection("City") },
	async findById(id) {
		return await db.collection("City").findOne({
			$and:
				[
					{_id: new ObjectId(id)},
					...(Array.prototype.slice.call(arguments, 1))
				]
		});
	},
};
module.exports["City"] = City

