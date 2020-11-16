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

const data = fs.readFileSync('./czechverblinks.txt').toString();

// console.log(data);

var myData = data.split(",");
// console.log(myData)

var ret = [];

// myData = ["https://en.wiktionary.org/wiki/b%C4%9B%C5%BEet"];


for (var i = 0; i < myData.length; i++) {
	try {
	myRes = request('GET', myData[i]);
	var body = myRes.getBody().toString('utf8');
	var myHtml = $(body).find("#Czech");
	var czechHTML = myHtml.parent().nextUntil("h2");
	var wordType = undefined;
	
	var fu = myData[i].split("/");
	
	var word = decodeURIComponent(fu[fu.length - 1].split("#")[0]);
	
	if (czechHTML.find("[id*='" + "Verb" + "']").val() != undefined) {
			wordType = "Verb";
	}
	
	var meanings = [];

	var wordMeaningHTML = czechHTML.find(".headword").parent().next();
	
	for (var j = 0; j < wordMeaningHTML.length; j++) {
		var meaningChildren = wordMeaningHTML[j].children;
		for (var k = 0; k < meaningChildren.length; k++) {
			meanings.push(meaningChildren[k].textContent.split("\n")[0]);
		}	
	}
	
	
	console.log((i + 1) + " out of " + myData.length);
	
	var verbTable = $(czechHTML).find(".inflection-table-verb")[0];

	var tables = $(verbTable).find(".wikitable");
	var tab1 = tables[0];
	var tab2 = tables[2];
	var tab3 = tables[3];
	
	var presentForms = {firstIndicativeSingular: "", firstIndicativePlural: "", firstImperativeSingular: "", firstImperativePlural: "",
	secondIndicativeSingular: "", secondIndicativePlural: "", secondImperativeSingular: "", secondImperativePlural: "", 
	thirdIndicativeSingular: "", thirdIndicativePlural: "", thirdImperativeSingular: "", thirdImperativePlural: ""};
	
	var tab1Rows = $(tab1).find("tr");
	
	for (var j = 0; j < tab1Rows.length; j++) {
		if (j >= 2) {
			var cells = $(tab1Rows[j]).find("td");
			
			if (j == 2) {
				presentForms.firstIndicativeSingular = $(cells[1]).text();
				presentForms.firstIndicativePlural = $(cells[2]).text();
				presentForms.firstImperativeSingular = $(cells[3]).text();
				presentForms.firstImperativePlural = $(cells[4]).text();
			}
			
			if (j == 3) {
				presentForms.secondIndicativeSingular = $(cells[1]).text();
				presentForms.secondIndicativePlural = $(cells[2]).text();
				presentForms.secondImperativeSingular = $(cells[3]).text();
				presentForms.secondImperativePlural = $(cells[4]).text();
			}
			
			if (j == 4) {
				presentForms.thirdIndicativeSingular = $(cells[1]).text();
				presentForms.thirdIndicativePlural = $(cells[2]).text();
				presentForms.thirdImperativeSingular = $(cells[3]).text();
				presentForms.thirdImperativePlural = $(cells[4]).text();
			}
		}
	}
	
	var participles = {masculineAnimatePastSingularParticiple: "", masculineAnimatePastPluralParticiple: "", masculineAnimatePassiveSingularParticiple: "", masculineAnimatePassivePluralParticiple: "",
					masculineInanimatePastSingularParticiple: "", masculineInanimatePastPluralParticiple: "", masculineInanimatePassiveSingularParticiple: "", masculineInanimatePassivePluralParticiple: "",
					femininePastSingularParticiple: "", femininePastPluralParticiple: "", femininePassiveSingularParticiple: "", femininePassivePluralParticiple: "",
					neuterPastSingularParticiple: "", neuterPastPluralParticiple: "", neuterPassiveSingularParticiple: "", neuterPassivePluralParticiple: ""};
	
	var tab2Rows = $(tab2).find("tr");
	
	for (var j = 0; j < tab2Rows.length; j++) {
		if (j >= 2) {
			var cells = $(tab2Rows[j]).find("td");
			
			if (j == 2) {
				participles.masculineAnimatePastSingularParticiple = $(cells[1]).text();
				participles.masculineAnimatePastPluralParticiple = $(cells[2]).text();
				participles.masculineAnimatePassiveSingularParticiple = $(cells[3]).text();
				participles.masculineAnimatePassivePluralParticiple = $(cells[4]).text();
				
				//masculine inanimate past singular and passive singular are usually the same as the masculine animate ones:
				
				participles.masculineInanimatePastSingularParticiple = $(cells[1]).text();
				participles.masculineInanimatePassiveSingularParticiple = $(cells[3]).text();
			}
			
			if (j == 3) {
				participles.masculineAnimatePastPluralParticiple = $(cells[1]).text();
				participles.masculineAnimatePassivePluralParticiple = $(cells[2]).text();
			}
			
			if (j == 4) {
				participles.femininePastSingularParticiple = $(cells[1]).text();
				participles.femininePastPluralParticiple = $(cells[2]).text();
				participles.femininePassiveSingularParticiple = $(cells[3]).text();
				participles.femininePassivePluralParticiple = $(cells[4]).text();
			}
			
			if (j == 5) {
				participles.neuterPastSingularParticiple = $(cells[1]).text();
				participles.neuterPastPluralParticiple = $(cells[2]).text();
				participles.neuterPassiveSingularParticiple = $(cells[3]).text();
				participles.neuterPassivePluralParticiple = $(cells[4]).text();
			}
		}
	}
	
	var transgressives = {masculineSingularPresentTransgressive: "", masculineSingularPastTransgressive: "",
							feminineSingularPresentTransgressive: "", feminineSingularPastTransgressive: "",
							neuterSingularPresentTransgressive: "", neuterSingularPastTransgressive: "",
							pluralPresentTransgressive: "", pluralPastTransgressive: ""};
							
	var tab3Rows = $(tab3).find("tr");
	
	for (var j = 0; j < tab3Rows.length; j++) {
		if (j >= 1) {
			var cells = $(tab3Rows[j]).find("td");
			
			if (j == 1) {
				transgressives.masculineSingularPresentTransgressive = $(cells[1]).text();
				transgressives.masculineSingularPastTransgressive = $(cells[2]).text();
			}
			
			if (j == 2) {
				transgressives.feminineSingularPresentTransgressive = $(cells[1]).text();
				transgressives.feminineSingularPastTransgressive = $(cells[2]).text();
				transgressives.neuterSingularPresentTransgressive = $(cells[1]).text();
				transgressives.neuterSingularPastTransgressive = $(cells[2]).text();
			}
			
			if (j == 3) {
				transgressives.pluralPresentTransgressive = $(cells[1]).text();
				transgressives.pluralPastTransgressive = $(cells[2]).text();
			}
			
		}
	}
	
	presentForms = _.mapValues(presentForms, function(d) {return _.replace(d, "\n", "")});
	participles = _.mapValues(participles, function(d) {return _.replace(d, "\n", "")});
	transgressives = _.mapValues(transgressives, function(d) {return _.replace(d, "\n", "")});
	
	var myJson = {...presentForms, ...participles, ...transgressives};
	
	var verbObject = {word: word, meanings: meanings, wordType: wordType, ...myJson};
	
	ret.push(verbObject);
	
	// console.log(verbObject);
	
	} catch(e) {
		console.log(e);
		continue;
	}
}

// console.log(ret);

fs.writeFileSync("verbs.json", JSON.stringify(ret), 'utf8');