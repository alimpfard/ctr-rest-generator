const {ArrayType, Enum0} = require("../types.js");
const {City, Person} = require("../models.js");

module.exports = async function testUserExists(args, failure, exists) {
	let personId = args.personId;
	// TODO: do something you're supposed to do
	exists.value = null; // return boolean
	return true;
}
