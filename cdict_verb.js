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

const data = fs.readFileSync('./czechnounlinks.txt').toString();

// console.log(data);

var myData = data.split(",");
// console.log(myData)

var ret = [];


for (var i = 0; i < myData.length; i++) {
	try {
	myRes = request('GET', myData[i]);
	var body = myRes.getBody().toString('utf8');
	var myHtml = $(body).find("#Czech");
	var czechHTML = myHtml.parent().nextUntil("h2");
	var decTable = $(czechHTML).find(".inflection-table");
	var wordType = undefined;
	var wordGender = ""
	
	var fu = myData[i].split("/");
	
	var word = decodeURIComponent(fu[fu.length - 1].split("#")[0]);
	
	console.log(word);
	
	if (czechHTML.find("[id*='" + "Noun" + "']").val() != undefined) {
			wordType = "Noun";
	}
	
	if (wordType == "Noun") {
		wordGender = czechHTML.find(".headword").next().text();
	}
	
	var meanings = [];

	var wordMeaningHTML = czechHTML.find(".headword").parent().next();
	
	// word = czechHTML.find(".headword")[0].innerText;
	
	for (var j = 0; j < wordMeaningHTML.length; j++) {
		var meaningChildren = wordMeaningHTML[j].children;
		for (var k = 0; k < meaningChildren.length; k++) {
			meanings.push(meaningChildren[k].textContent.split("\n")[0]);
		}
		
		
	}
	
	var decRows = decTable.find("tbody").children();
	
	// console.log(wordType);
	
	var decObject = {word: word, singular: {}, plural: {}, wordtype: wordType, gender: wordGender, wordmeaning: meanings};

	for (var j = 1; j < decRows.length; j++) {
		
		// console.log(decRows[i].children[0]);
		decObject.singular[decRows[j].children[0].textContent.split("\n")[0]] = decRows[j].children[1].textContent.split("\n")[0];

		decObject.plural[decRows[j].children[0].textContent.split("\n")[0]] = decRows[j].children[2].textContent.split("\n")[0];
	}
	
	ret.push(decObject);
	
	console.log((i + 1) + " out of " + myData.length);
	} catch(e) {
		continue;
	}
}

fs.writeFileSync("nouns.json", JSON.stringify(ret), 'utf8');