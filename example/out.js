var express = require("express");
var app = express();

db = null;
dbsession = null;
const config = require("./config.js");
const MongoClient = require("mongodb").MongoClient;

const process_countUsers = require("./endpoints/countUsers.js");
const process_deletePerson = require("./endpoints/deletePerson.js");
const action_deletePerson_0 = require("./actions/deletePerson-action0.js");
const action_deletePerson_1 = require("./actions/deletePerson-action1.js");
const process_getPeopleFromCity = require("./endpoints/getPeopleFromCity.js");
const action_getPeopleFromCity_0 = require("./actions/getPeopleFromCity-action0.js");

const {ArrayType, Enum0} = require("./types.js");
const {City, Person} = require("./models.js");
const testUserExists = require("./utilities/testUserExists.js");

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
		try {
			res_input = {};
			res_output = {
				'count': null /* Number */,
			};

			res.send(await process_countUsers(res_input, res_output));
			ok = true;

		} catch(e) {
			ok = false;
			handled = true;
			res.status(500).send({_error: e.toString(), ...res_output});
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
				'personId': getOrFail(Number, jsondec, 'personId', undefined),
				'method': getOrFail(Enum0, jsondec, 'method', undefined),
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
				res.send(await process_deletePerson(res_input, res_output));
				ok = true;
			}
			else {
				ok = false;
			}
			handled = total_failure.action_handled_response;
		} catch(e) {
			ok = false;
			handled = true;
			res.status(500).send({_error: e.toString(), ...res_output});
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
				res.send(await process_getPeopleFromCity(res_input, res_output));
				ok = true;
			}
			else {
				ok = false;
			}
			handled = total_failure.action_handled_response;
		} catch(e) {
			ok = false;
			handled = true;
			res.status(500).send({_error: e.toString(), ...res_output});
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
