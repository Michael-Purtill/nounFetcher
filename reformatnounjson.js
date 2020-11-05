const bodyParser = require('body-parser');

const cors = require('cors');

var request = require('sync-request');

var jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = (new JSDOM('')).window;
const _ = require('lodash');
global.document = document;
const fs = require('fs');

var $ = jQuery = require('jquery')(window);

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

var data = JSON.parse(fs.readFileSync('./nouns.json').toString());
var ret = [];


for (var i = 0; i < data.length; i++) {
	var retObject = {}
	var keys = _.keys(data[i]);
	
	retObject["singular_nominative"] = "";
	retObject["singular_genitive"] = "";
	retObject["singular_dative"] = "";
	retObject["singular_accusative"] = "";
	retObject["singular_vocative"] = "";
	retObject["singular_locative"] = "";
	retObject["singular_instrumental"] = "";
	retObject["plural_nominative"] = "";
	retObject["plural_genitive"] = "";
	retObject["plural_dative"] = "";
	retObject["plural_accusative"] = "";
	retObject["plural_vocative"] = "";
	retObject["plural_locative"] = "";
	retObject["plural_instrumental"] = "";
	
	for (var j = 0; j < keys.length; j++) {
		if (keys[j] != "singular" && keys[j] != "plural") {
			retObject[keys[j]] = data[i][keys[j]];
		}
		else if (keys[j] == "singular") {
			var singStruct = data[i][keys[j]];
			var singKeys = _.keys(singStruct);
			
			for (var k = 0; k < singKeys.length; k++) {
				retObject["singular_" + singKeys[k]] = singStruct[singKeys[k]];
			}
		}
		else if (keys[j] == "plural") {
			var plurStruct = data[i][keys[j]];
			var plurKeys = _.keys(plurStruct);
			
			for (var k = 0; k < plurKeys.length; k++) {
				retObject["plural_" + plurKeys[k]] = plurStruct[plurKeys[k]];
			}
		}
	}
	ret.push(retObject);
}

fs.writeFileSync("corrected_nouns.json", JSON.stringify(ret), 'utf8');