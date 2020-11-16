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

myData = ["https://en.wiktionary.org/wiki/b%C4%9B%C5%BEet"];


for (var i = 0; i < myData.length; i++) {
	try {
	myRes = request('GET', myData[i]);
	var body = myRes.getBody().toString('utf8');
	var myHtml = $(body).find("#Czech");
	var czechHTML = myHtml.parent().nextUntil("h2");
	var wordType = undefined;
	var wordGender = ""
	
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
	
	for (var i = 0; i < tab1Rows.length; i++) {
		if (i >= 2) {
			var cells = $(tab1Rows[i]).find("td");
			
			if (i == 2) {
				presentForms.firstIndicativeSingular = cells[1].innerText;
				presentForms.firstIndicativePlural = cells[2].innerText;
				presentForms.firstImperativeSingular = cells[3].innerText;
				presentForms.firstImperativePlural = cells[4].innerText;
			}
			
			if (i == 3) {
				presentForms.secondIndicativeSingular = cells[1].innerText;
				presentForms.secondIndicativePlural = cells[2].innerText;
				presentForms.secondImperativeSingular = cells[3].innerText;
				presentForms.secondImperativePlural = cells[4].innerText;
			}
			
			if (i == 4) {
				presentForms.thirdIndicativeSingular = cells[1].innerText;
				presentForms.thirdIndicativePlural = cells[2].innerText;
				presentForms.thirdImperativeSingular = cells[3].innerText;
				presentForms.thirdImperativePlural = cells[4].innerText;
			}
		}
	}
	
	var participles = {masculineAnimatePastSingularParticiple: "", masculineAnimatePastPluralParticiple: "", masculineAnimatePassiveSingularParticiple: "", masculineAnimatePassivePluralParticiple: "",
					masculineInanimatePastSingularParticiple: "", masculineInanimatePastPluralParticiple: "", masculineInanimatePassiveSingularParticiple: "", masculineInanimatePassivePluralParticiple: "",
					femininePastSingularParticiple: "", femininePastPluralParticiple: "", femininePassiveSingularParticiple: "", femininePassivePluralParticiple: "",
					neuterPastSingularParticiple: "", neuterPastPluralParticiple: "", neuterPassiveSingularParticiple: "", neuterPassivePluralParticiple: ""};
	
	var tab2Rows = (tab2).find("tr");
	
	for (var i = 0; i < tab2Rows.length; i++) {
		if (i >= 2) {
			var cells = $(tab2Rows[i]).find("td");
			
			if (i == 2) {
				participles.masculineAnimatePastSingularParticiple = cells[1].innerText;
				participles.masculineAnimatePastPluralParticiple = cells[2].innerText;
				participles.masculineAnimatePassiveSingularParticiple = cells[3].innerText;
				participles.masculineAnimatePassivePluralParticiple = cells[4].innerText;
				
				//masculine inanimate past singular and passive singular are usually the same as the masculine animate ones:
				
				participles.masculineInanimatePastSingularParticiple = cells[1];
				participles.masculineInanimatePassiveSingularParticiple = cells[3];
			}
			
			if (i == 3) {
				participles.masculineAnimatePastPluralParticiple = cells[1].innerText;
				participles.masculineAnimatePassivePluralParticiple = cells[2].innerText;
			}
			
			if (i == 4) {
				participles.femininePastSingularParticiple = cells[1].innerText;
				participles.femininePastPluralParticiple = cells[2].innerText;
				participles.femininePassiveSingularParticiple = cells[3].innerText;
				participles.femininePassivePluralParticiple = cells[4].innerText;
			}
			
			if (i == 5) {
				participles.neuterPastSingularParticiple = cells[1].innerText;
				participles.neuterPastPluralParticiple = cells[2].innerText;
				participles.neuterPassiveSingularParticiple = cells[3].innerText;
				participles.neuterPassivePluralParticiple = cells[4].innerText;
			}
		}
	}
	
	var transgressives = {masculineSingularPresentTransgressive: "", masculineSingularPastTransgressive: "",
							feminineSingularPresentTransgressive: "", feminineSingularPastTransgressive: "",
							neuterSingularPresentTransgressive: "", neuterSingularPastTransgressive: "",
							pluralPresentTransgressive: "", pluralPastTransgressive: ""};
							
	var tab3Rows = (tab3).find("tr");
	
	for (var i = 0; i < tab3Rows.length; i++) {
		if (i >= 1) {
			var cells = $(tab3Rows[i]).find("td");
			
			if (i == 1) {
				transgressives.masculineSingularPresentTransgressive = cells[1];
				transgressives.masculineSingularPastTransgressive = cells[2];
			}
			
			if (i == 2) {
				transgressives.feminineSingularPresentTransgressive = cells[1];
				transgressives.feminineSingularPastTransgressive = cells[2];
				transgressives.neuterSingularPresentTransgressive = cells[1];
				transgressives.neuterSingularPastTransgressive = cells[2];
			}
			
			if (i == 3) {
				transgressives.pluralPresentTransgressive = cells[1];
				transgressives.pluralPastTransgressive = cells[2];
			}
			
		}
	}
	
	var myJson = {...presentForms, ...participles, ...transgressives};
	
	var verbObject = {word: word, meanings: meanings, wordType: wordType, ...myJson};
	
	ret.push(verbObject);
	
	} catch(e) {
		continue;
	}
}

// console.log(ret);

fs.writeFileSync("adjs.json", JSON.stringify(ret), 'utf8');