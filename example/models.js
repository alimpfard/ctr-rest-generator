const {ArrayType, Enum0} = require("./types.js");
const { ObjectId } = require("mongodb");
module.exports = {};
let City = {
	'city': arg => String.call(null, arg),
	'cityCode': arg => Number.call(null, arg),
	'SOME_CONSTANT': constant value,
	'countryCode': arg => Number.call(null, arg),
	'country': arg => String.call(null, arg),
	graphqlSchema: `type City { city: String cityCode: Long! SOME_CONSTANT: String countryCode: Long! country: String  } type CityID { city: String cityCode: Long! SOME_CONSTANT: String countryCode: Long! country: String  } `,	staticProperties: ["call", "db", "findById", "staticProperties", "forEach", "SOME_CONSTANT", "graphqlSchema"],
	call(_, value) {
		let obj = {};
		for (property in City)
			if ((!City.staticProperties.includes(property)) && City.hasOwnProperty(property))
				obj[property] = City[property](value[property]);
		return obj;
	},
	forEach(self, callback) {
		for (property in City)
			if ((!City.staticProperties.includes(property)) && self.hasOwnProperty(property))
				callback(property, self[property], self);
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

let Person = {
	'city': arg => String.call(null, arg),
	'firstName': arg => String.call(null, arg),
	'lastName': arg => String.call(null, arg),
	graphqlSchema: `type Person { city: CityID firstName: String lastName: String  } type PersonID { city: CityID firstName: String lastName: String  } `,	staticProperties: ["call", "db", "findById", "staticProperties", "forEach", "graphqlSchema"],
	call(_, value) {
		let obj = {};
		for (property in Person)
			if ((!Person.staticProperties.includes(property)) && Person.hasOwnProperty(property))
				obj[property] = Person[property](value[property]);
		return obj;
	},
	forEach(self, callback) {
		for (property in Person)
			if ((!Person.staticProperties.includes(property)) && self.hasOwnProperty(property))
				callback(property, self[property], self);
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

