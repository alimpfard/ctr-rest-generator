const {ArrayType, Enum0} = require("./types.js");
const { ObjectId } = require("mongodb");
module.exports = {};
let Person = {
	'firstName': arg => String.call(null, arg),
	'city': arg => String.call(null, arg),
	'lastName': arg => String.call(null, arg),
	graphqlSchema: `type Person { firstName: String city: CityID lastName: String  } type PersonID { firstName: String city: CityID lastName: String  } `,	aliasedName: {},
	staticProperties: ["call", "db", "findById", "staticProperties", "forEach", "aliasedName", "graphqlSchema"],
	call(_, value) {
		let obj = {};
		for (property in Person)
			if ((!Person.staticProperties.includes(property))) {
				if (Person.hasOwnProperty(property))
					obj[property] = Person[property](value[property]);
				if (Person.aliasedName[property])
						obj[property] = Person[property](value[Person.aliasedName[property]]);
			}
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

let City = {
	'countryCode': arg => Number.call(null, arg),
	'SOME_CONSTANT': constant value,
	'cityCode': arg => Number.call(null, arg),
	'country': arg => String.call(null, arg),
	'city': arg => String.call(null, arg),
	graphqlSchema: `type City { countryCode: Long! SOME_CONSTANT: String cityCode: Long! country: String city: String  } type CityID { countryCode: Long! SOME_CONSTANT: String cityCode: Long! country: String city: String  } `,	aliasedName: {},
	staticProperties: ["call", "db", "findById", "staticProperties", "forEach", "aliasedName", "SOME_CONSTANT", "graphqlSchema"],
	call(_, value) {
		let obj = {};
		for (property in City)
			if ((!City.staticProperties.includes(property))) {
				if (City.hasOwnProperty(property))
					obj[property] = City[property](value[property]);
				if (City.aliasedName[property])
						obj[property] = City[property](value[City.aliasedName[property]]);
			}
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

