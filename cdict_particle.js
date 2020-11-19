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

const data = fs.readFileSync('./czechparticlelinks.txt').toString();

// console.log(data);

var myData = data.split(",");
// console.log(myData)

var ret = [];

// myData = ["https://en.wiktionary.org/wiki/b%C4%9B%C5%BEet"];


for (var i = 0; i < myData.length	; i++) {
	try {
	myRes = request('GET', myData[i]);
	var body = myRes.getBody().toString('utf8');
	var myHtml = $(body).find("#Czech");
	var czechHTML = myHtml.parent().nextUntil("h2");
	var wordType = "Particle";
	
	var fu = myData[i].split("/");
	
	var word = decodeURIComponent(fu[fu.length - 1].split("#")[0]);
	
	if (czechHTML.find("[id*='" + "Particle" + "']").val() != undefined) {
			wordType = "Particle";
	}
	
	var meanings = [];

	var wordMeaningHTML = czechHTML.find("[id*='" + "Particle" + "']").parent().next().next();
	
	for (var j = 0; j < wordMeaningHTML.length; j++) {
		var meaningChildren = wordMeaningHTML[j].children;
		for (var k = 0; k < meaningChildren.length; k++) {
			meanings.push(meaningChildren[k].textContent.split("\n")[0]);
		}	
	}
	
	
	console.log((i + 1) + " out of " + myData.length);
	
	var intjObject = {word: word, meanings: meanings, wordType: wordType};
	
	ret.push(intjObject);
	
	// console.log(verbObject);
	} catch(e) {
		console.log(e);
		continue;
	}
}

console.log(ret);

fs.writeFileSync("particles.json", JSON.stringify(ret), 'utf8');