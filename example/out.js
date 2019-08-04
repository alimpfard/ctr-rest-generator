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

const {ArrayType} = require("./types.js");
const {Person, City} = require("./models.js");
const testUserExists = require("./utilities/testUserExists.js");

function getOrFail(obj, prop) {
	let oprop = obj[prop];
	if (oprop !== null) return oprop;
	throw new Error(`missing argument ${prop}`);
}
app.get("/countUsers", async (req, res) => {
			let res_input = {};
			let res_output = {
				'count': Number,
			};

			res.send(await process_countUsers(res_input, res_output));


});
app.post("/deletePerson", async (req, res) => {
	var bodyStr = "";
	req.on("data", function(chunk) { 
		bodyStr += chunk.toString();
	});
	req.on("end", async function() {
		let ok = false, handled = false, res_input = null, res_output = null;
		try {
			let jsondec = JSON.parse(bodyStr);
			res_input = {
				'personId': getOrFail(jsondec, 'personId'),
			};

			let failure = {error:null, ok:null};
			if (!(await testUserExists(res_input["personId"], failure) &&
			    true)) {
				handled = true;
				res.status(500).send(failure);
				return;
			}
			res_output = {};
			dbsession.startTransaction();
			if (await action_deletePerson_0(res, req, res_output, res_input) &&
			    await action_deletePerson_1(res, req, res_output, res_input) &&
			    true) {
				res.send(await process_deletePerson(res_input, res_output));
				ok = true;
			}
			else {
				ok = false;
			}
		} catch(e) {
			ok = false;
			handled = true;
			res.status(500).send({_error: e.toString(), ...res_output});
		} finally {
			if (ok)
				await dbsession.commitTransaction();
			else await dbsession.abortTransaction();
			if (!handled) res.status(500).send(res_output);
			}
	});
});
app.post("/getPeopleFromCity", async (req, res) => {
	var bodyStr = "";
	req.on("data", function(chunk) { 
		bodyStr += chunk.toString();
	});
	req.on("end", async function() {
		let ok = false, handled = false, res_input = null, res_output = null;
		try {
			let jsondec = JSON.parse(bodyStr);
			res_input = City.call(_, jsondec);
			res_output = {
				'person': ArrayType(Person),
			};

			dbsession.startTransaction();
			if (await action_getPeopleFromCity_0(res, req, res_output, res_input) &&
			    true) {
				res.send(await process_getPeopleFromCity(res_input, res_output));
				ok = true;
			}
			else {
				ok = false;
			}
		} catch(e) {
			ok = false;
			handled = true;
			res.status(500).send({_error: e.toString(), ...res_output});
		} finally {
			if (ok)
				await dbsession.commitTransaction();
			else await dbsession.abortTransaction();
			if (!handled) res.status(500).send(res_output);
			}
	});
});
MongoClient.connect(config.mongo_addr, {useNewUrlParser: true}, (err, client) => {
	if (err) return console.log(err);
	dbsession = client.startSession();
	db = client.db(config.database);
	app.listen(config.port, () => console.log("App listening on port " + config.port));
});
