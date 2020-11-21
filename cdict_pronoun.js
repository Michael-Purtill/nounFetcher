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

const data = fs.readFileSync('./czechpronounlinks.txt').toString();

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
	
	if (czechHTML.find("[id*='" + "Pronoun" + "']").val() != undefined) {
			wordType = "Pronoun";
	}
	
	if (wordType == "Pronoun") {
		wordGender = czechHTML.find(".headword").next().text();
	}
	
	var meanings = [];

	var wordMeaningHTML = czechHTML.find("[id*='" + "Pronoun" + "']").parent().next().next();
	
	// word = czechHTML.find(".headword")[0].innerText;
	
	for (var j = 0; j < wordMeaningHTML.length; j++) {
		var meaningChildren = wordMeaningHTML[j].children;
		for (var k = 0; k < meaningChildren.length; k++) {
			meanings.push(meaningChildren[k].textContent.split("\n")[0]);
		}
		
		
	}
	
	var num = ["singular", "plural"];
	var gender = ["masculine_animate", "masculine_inanimate", "feminine", "neuter"];
	var myCase = ["nominative", "genitive", "dative", "accusative", "locative", "instrumental"];
	
	var stupidStuff = {};
	
	for (var x = 0; x < num.length; x++) {
		for (var y = 0; y < gender.length; y++) {
			for (var z = 0; z < myCase.length; z++) {
				stupidStuff[num[x] + "_" + gender[y] + "_" + myCase[z]] = "";
			}
		}	
	}
	
	var decObject = {word: word, meanings: meanings, wordType: wordType, ...stupidStuff};
	
	ret.push(decObject);
	
	console.log((i + 1) + " out of " + myData.length);
	} catch(e) {
		continue;
	}
}

fs.writeFileSync("pronouns.json", JSON.stringify(ret), 'utf8');