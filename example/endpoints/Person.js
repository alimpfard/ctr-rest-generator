const {ArrayType, Enum0} = require("../types.js");

const {City, Person} = require("../models.js");

/**
 * res_output
 * = ArrayType(Person)
 */

/**
 * res_input
 * @param firstName: String
 */

let constructReturn = x => (ArrayType(Person)).call(null, x);


module.exports = async function process_Person(res_input, res_output) {
	// TODO: implement
	return res_output;
}