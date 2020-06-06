var express = require("express");
var app = express();

db = null;
dbsession = null;
const config = require("./config.js");
const MongoClient = require("mongodb").MongoClient;

const process_Person = require("./endpoints/Person.js");
const process_countUsers = require("./endpoints/countUsers.js");
const process_deletePerson = require("./endpoints/deletePerson.js");
const action_deletePerson_0 = require("./actions/deletePerson-action0.js");
const action_deletePerson_1 = require("./actions/deletePerson-action1.js");
const process_getPeopleFromCity = require("./endpoints/getPeopleFromCity.js");
const action_getPeopleFromCity_0 = require("./actions/getPeopleFromCity-action0.js");

const {ArrayType, Enum0} = require("./types.js");
const {Person, City} = require("./models.js");
const testUserExists = require("./utilities/testUserExists.js");
var graphqlHTTP = require("express-graphql");
var graphql = require("graphql");
var graphql_root = {
	Person: async (res_input) => {
		let res_output = {} /* ArrayType(Person) */;
		return await process_Person(res_input, res_output);
	},
};
var graphql_schema = graphql.buildSchema(`
        scalar Long
        ${Enum0.graphqlSchema}
         ${Person.graphqlSchema}   ${City.graphqlSchema} 
        type Query { Person(firstName: String): [Person]! }
      `);
const _models = {
	Person: Person,
	City: City,
};
for (let _type of ["Person", "City"])
	for (let name of Object.keys(graphql_schema._typeMap[_type + "ID"]._fields))
		graphql_schema._typeMap[_type + "ID"]._fields[name].resolve = function(obj) {
			if (obj._data)
				return obj._data.then(auth => auth[name]);
			else {
				obj._data = _models[_type].findById(obj);
				return obj._data.then(auth => auth[name]);
			}
		};

app.use("/gql", graphqlHTTP({
  schema: graphql_schema,
  rootValue: graphql_root,
  graphiql: true
}));
function getOrFail(type, obj, prop, _default) {
	let oprop = obj[prop];
	if ((typeof(oprop) === "undefined" || oprop === null) && typeof(_default) === "undefined") {
		throw new Error(`missing argument ${prop}`);
	}
	if (typeof(oprop) === "undefined" || oprop === null)
		return _default;
	oprop = type.call(null, oprop);
	if ((typeof(oprop) === "undefined" || oprop === null) && typeof(_default) === "undefined") {
		throw new Error(`wrong type for argument ${prop}`);
	}
	return (typeof(oprop) === "undefined" || oprop === null) ? _default : oprop;
}
app.get("/countUsers", async (req, res) => {
		let total_failure = {fail_early: false, action_handled_response: false};
		try {
			res_input = {};
			res_output = {
				'count': null /* Number */,
			};

			(total_failure.action_handled_response ? (x=>{console.log(x)}) : x=>{res.send(x)})(await process_countUsers(res_input, res_output));
			ok = true;

		} catch(e) {
			console.error(e);
			ok = false;
			if (!total_failure.action_handled_response) {
				handled = true;
				res.status(500).send({_error: e.toString(), ...res_output});
			} else {
				handled = true;
			}
		} finally {
			if (!ok && !handled) res.status(500).send(res_output);
			}

});
app.post("/deletePerson", async (req, res) => {
	var bodyStr = "";
	req.on("data", function(chunk) { 
		bodyStr += chunk.toString();
	});
	req.on("end", async function() {
		bodyStr = bodyStr
		let ok = false, handled = false, res_input = null, res_output = null;
		let jsondec = JSON.parse(bodyStr);
			dbsession.startTransaction();
		let total_failure = {fail_early: false, action_handled_response: false};
		try {
			res_input = {
				'method': getOrFail(Enum0, jsondec, 'method', undefined),
				'personId': getOrFail(Number, jsondec, 'personId', undefined),
			};

			let failure = {error:null, ok:null};
			let testUserExists_exists = {set value(val) { res_input["exists"] = val; }};
			if (!(await testUserExists({"personId": res_input["personId"]}, failure, testUserExists_exists) &&
			    true)) {
				handled = true;
				res.status(500).send(failure);
				return;
			}
			res_output = {};
			if (await action_deletePerson_0(res, req, res_output, res_input, total_failure) &&
			    await action_deletePerson_1(res, req, res_output, res_input, total_failure) &&
			    true) {
				(total_failure.action_handled_response ? (x=>{console.log(x)}) : x=>{res.send(x)})(await process_deletePerson(res_input, res_output));
				ok = true;
			}
			else {
				ok = false;
			}
			handled = total_failure.action_handled_response;
		} catch(e) {
			console.error(e);
			ok = false;
			if (!total_failure.action_handled_response) {
				handled = true;
				res.status(500).send({_error: e.toString(), ...res_output});
			} else {
				handled = true;
			}
		} finally {
			if (ok && !total_failure.fail_early)
				await dbsession.commitTransaction();
			else await dbsession.abortTransaction();
			if (!ok && !handled) res.status(500).send(res_output);
			}
	});
	});
app.post("/getPeopleFromCity", async (req, res) => {
	var bodyStr = "";
	req.on("data", function(chunk) { 
		bodyStr += chunk.toString();
	});
	req.on("end", async function() {
		bodyStr = bodyStr
		let ok = false, handled = false, res_input = null, res_output = null;
		let jsondec = JSON.parse(bodyStr);
			dbsession.startTransaction();
		let total_failure = {fail_early: false, action_handled_response: false};
		try {
			res_input = City.call(_, jsondec);
			res_output = {
				'person': null /* ArrayType(Person) */,
			};

			if (await action_getPeopleFromCity_0(res, req, res_output, res_input, total_failure) &&
			    true) {
				(total_failure.action_handled_response ? (x=>{console.log(x)}) : x=>{res.send(x)})(await process_getPeopleFromCity(res_input, res_output));
				ok = true;
			}
			else {
				ok = false;
			}
			handled = total_failure.action_handled_response;
		} catch(e) {
			console.error(e);
			ok = false;
			if (!total_failure.action_handled_response) {
				handled = true;
				res.status(500).send({_error: e.toString(), ...res_output});
			} else {
				handled = true;
			}
		} finally {
			if (ok && !total_failure.fail_early)
				await dbsession.commitTransaction();
			else await dbsession.abortTransaction();
			if (!ok && !handled) res.status(500).send(res_output);
			}
	});
	});
MongoClient.connect(config.mongo_addr, {useNewUrlParser: true}, (err, client) => {
	if (err) return console.log(err);
	dbsession = client.startSession();
	db = client.db(config.database);
	app.listen(config.port, () => console.log("App listening on port " + config.port));
});
