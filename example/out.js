var express = require("express");
var app = express();

db = null; const config = require("./config.js");
const MongoClient = require("mongodb").MongoClient;

const process_countUsers = require("./endpoints/countUsers.js");
const process_deletePerson = require("./endpoints/deletePerson.js");
const action_deletePerson_0 = require("./actions/deletePerson-action0.js");
const action_deletePerson_1 = require("./actions/deletePerson-action1.js");
const process_getPeopleFromCity = require("./endpoints/getPeopleFromCity.js");
const action_getPeopleFromCity_0 = require("./actions/getPeopleFromCity-action0.js");

const {ArrayType} = require("./types.js");
const {City, Person} = require("./models.js");

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
		try {
			let jsondec = JSON.parse(bodyStr);
			let res_input = {
				'personId': getOrFail(jsondec, 'personId'),
			};

			let res_output = {};
			if (await action_deletePerson_0(res, req, res_output, res_input))
				if (await action_deletePerson_1(res, req, res_output, res_input))
					res.send(await process_deletePerson(res_input, res_output));

		} catch(e) { res.status(500).send({error: e.toString()}); }
	});
});
app.post("/getPeopleFromCity", async (req, res) => {
	var bodyStr = "";
	req.on("data", function(chunk) { 
		bodyStr += chunk.toString();
	});
	req.on("end", async function() {
		try {
			let jsondec = JSON.parse(bodyStr);
			let res_input = City.call(_, jsondec);
			let res_output = {
				'person': ArrayType(Person),
			};

			if (await action_getPeopleFromCity_0(res, req, res_output, res_input))
				res.send(await process_getPeopleFromCity(res_input, res_output));

		} catch(e) { res.status(500).send({error: e.toString()}); }
	});
});
MongoClient.connect(config.mongo_addr, {useNewUrlParser: true}, (err, client) => {
	if (err) return console.log(err);
	db = client.db(config.database);
	app.listen(config.port, () => console.log("App listening on port " + config.port));
});
