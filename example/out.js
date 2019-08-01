var express = require("express");
var app = express();

const process_countUsers = require("./endpoints/countUsers.js");
const process_deletePerson = require("./actions/deletePerson.js");
const action_deletePerson_0 = require("./actions/deletePerson-action0.js");
const action_deletePerson_1 = require("./actions/deletePerson-action1.js");
const process_getPeopleFromCity = require("./actions/getPeopleFromCity.js");
const action_getPeopleFromCity_0 = require("./actions/getPeopleFromCity-action0.js");

function getOrFail(obj, prop) {
	let oprop = obj[prop];
	if (oprop !== null) return oprop;
	throw new Error(`missing argument ${prop}`);
}
let City = {
	'cityCode': Number,
	'city': String,
	'country': String,
	'countryCode': Number,
};
let Person = {
	'lastName': String,
	'city': City,
	'firstName': String,
};
app.post("/countUsers", (res, req) => {
	var bodyStr = "";
	req.on("data",function(chunk) { bodyStr += chunk.toString(); });
	req.on("end", function() {
		let res_input = {};
			let res_output = {
				'count': Number,
			};

			res.send(JSON.stringify(process_countUsers(res_input, res_output)));

		} catch(e) { res.send(JSON.stringify({error: e})); }
	});
});
app.post("/deletePerson", (res, req) => {
	var bodyStr = "";
	req.on("data",function(chunk) { bodyStr += chunk.toString(); });
	req.on("end", function() {
		try {
			let jsondec = JSON.parse(bodyStr);
			let res_input = {
				'personId': getOrFail(jsondec, 'personId'),
			};

			let res_output = {
			};
			if (action_deletePerson_0(res, req, res_output, res_input))
				if (action_deletePerson_1(res, req, res_output, res_input))
					res.send(JSON.stringify(process_deletePerson(res_input, res_output)));

		} catch(e) { res.send(JSON.stringify({error: e})); }
	});
});
app.post("/getPeopleFromCity", (res, req) => {
	var bodyStr = "";
	req.on("data",function(chunk) { bodyStr += chunk.toString(); });
	req.on("end", function() {
		try {
			let jsondec = JSON.parse(bodyStr);
			let res_input = {
				'city': getOrFail(jsondec, 'city'),
			};

			let res_output = {
				'person': JSON.parse(JSON.stringify([Person])),
			};

			if (action_getPeopleFromCity_0(res, req, res_output, res_input))
				res.send(JSON.stringify(process_getPeopleFromCity(res_input, res_output)));

		} catch(e) { res.send(JSON.stringify({error: e})); }
	});
});
