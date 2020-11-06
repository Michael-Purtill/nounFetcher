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

const data = fs.readFileSync('./czechadjlinks.txt').toString();

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
	
	// console.log(word);
	
	if (czechHTML.find("[id*='" + "Adjective" + "']").val() != undefined) {
			wordType = "Adjective";
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
	
	var lastLetter = word[word.length - 1];
	
	var truncatedWord = word.substring(0, word.length - 1);
	
	var mascAnimSingNom = truncatedWord;
	var mascAnimSingGen = truncatedWord;
	var mascAnimSingDat = truncatedWord;
	var mascAnimSingAcc = truncatedWord;
	var mascAnimSingVoc = truncatedWord;
	var mascAnimSingLoc = truncatedWord;
	var mascAnimSingIns = truncatedWord;
	var mascInSingNom = truncatedWord;
	var mascInSingGen = truncatedWord;
	var mascInSingDat = truncatedWord;
	var mascInSingAcc = truncatedWord;
	var mascInSingVoc = truncatedWord;
	var mascInSingLoc = truncatedWord;
	var mascInSingIns = truncatedWord;
	
	var mascAnimPlurNom = truncatedWord;
	var mascAnimPlurGen = truncatedWord;
	var mascAnimPlurDat = truncatedWord;
	var mascAnimPlurAcc = truncatedWord;
	var mascAnimPlurVoc = truncatedWord;
	var mascAnimPlurLoc = truncatedWord;
	var mascAnimPlurIns = truncatedWord;
	var mascInPlurNom = truncatedWord;
	var mascInPlurGen = truncatedWord;
	var mascInPlurDat = truncatedWord;
	var mascInPlurAcc = truncatedWord;
	var mascInPlurVoc = truncatedWord;
	var mascInPlurLoc = truncatedWord;
	var mascInPlurIns = truncatedWord;
	
	var femSingNom = truncatedWord;
	var femSingGen = truncatedWord;
	var femSingDat = truncatedWord;
	var femSingAcc = truncatedWord;
	var femSingVoc = truncatedWord;
	var femSingLoc = truncatedWord;
	var femSingIns = truncatedWord;
	
	var neutSingNom = truncatedWord;
	var neutSingGen = truncatedWord;
	var neutSingDat = truncatedWord;
	var neutSingAcc = truncatedWord;
	var neutSingVoc = truncatedWord;
	var neutSingLoc = truncatedWord;
	var neutSingIns = truncatedWord;
	
	if (lastLetter == "ý") {
		mascAnimSingNom = truncatedWord + "ý";
		mascAnimSingGen = truncatedWord + "ého";
		mascAnimSingDat = truncatedWord + "ému";
		mascAnimSingAcc = truncatedWord + "ého";
		mascAnimSingVoc = truncatedWord + "ý";
		mascAnimSingLoc = truncatedWord + "ém";
		mascAnimSingIns = truncatedWord + "ým";
		mascInSingNom = truncatedWord + "ý";
		mascInSingGen = truncatedWord + "ého";
		mascInSingDat = truncatedWord + "ému";
		mascInSingAcc = truncatedWord + "ý";
		mascInSingVoc = truncatedWord + "ý";
		mascInSingLoc = truncatedWord + "ém";
		mascInSingIns = truncatedWord + "ým";
		
		mascAnimPlurNom = truncatedWord + "í";
		mascAnimPlurGen = truncatedWord + "ých";
		mascAnimPlurDat = truncatedWord + "ým";
		mascAnimPlurAcc = truncatedWord + "é";
		mascAnimPlurVoc = truncatedWord + "í";
		mascAnimPlurLoc = truncatedWord + "ých";
		mascAnimPlurIns = truncatedWord + "ými";
		mascInPlurNom = truncatedWord + "é";
		mascInPlurGen = truncatedWord + "ých";
		mascInPlurDat = truncatedWord + "ým";
		mascInPlurAcc = truncatedWord + "é";
		mascInPlurVoc = truncatedWord + "é";
		mascInPlurLoc = truncatedWord + "ých";
		mascInPlurIns = truncatedWord + "ými";
		
		femSingNom = truncatedWord + "á";
		femSingGen = truncatedWord + "é";
		femSingDat = truncatedWord + "é";
		femSingAcc = truncatedWord + "ou";
		femSingVoc = truncatedWord + "á";
		femSingLoc = truncatedWord + "é";
		femSingIns = truncatedWord + "ou";
		
		femPlurNom = truncatedWord + "é";
		femPlurGen = truncatedWord + "ých";
		femPlurDat = truncatedWord + "ým";
		femPlurAcc = truncatedWord + "é";
		femPlurVoc = truncatedWord + "é";
		femPlurLoc = truncatedWord + "ých";
		femPlurIns = truncatedWord + "ými";
		
		neutSingNom = truncatedWord + "é";
		neutSingGen = truncatedWord + "ého";
		neutSingDat = truncatedWord + "ému";
		neutSingAcc = truncatedWord + "é";
		neutSingVoc = truncatedWord + "é";
		neutSingLoc = truncatedWord + "ém";
		neutSingIns = truncatedWord + "ým";
		
		neutPlurNom = truncatedWord + "á";
		neutPlurGen = truncatedWord + "ých";
		neutPlurDat = truncatedWord + "ým";
		neutPlurAcc = truncatedWord + "á";
		neutPlurVoc = truncatedWord + "á";
		neutPlurLoc = truncatedWord + "ých";
		neutPlurIns = truncatedWord + "ými";
	}
	else if (lastLetter = "í") {
		mascAnimSingNom = truncatedWord + "í";
		mascAnimSingGen = truncatedWord + "ího";
		mascAnimSingDat = truncatedWord + "ímu";
		mascAnimSingAcc = truncatedWord + "ího";
		mascAnimSingVoc = truncatedWord + "í";
		mascAnimSingLoc = truncatedWord + "ím";
		mascAnimSingIns = truncatedWord + "ím";
		mascInSingNom = truncatedWord + "í";
		mascInSingGen = truncatedWord + "ího";
		mascInSingDat = truncatedWord + "ímu";
		mascInSingAcc = truncatedWord + "í";
		mascInSingVoc = truncatedWord + "í";
		mascInSingLoc = truncatedWord + "ím";
		mascInSingIns = truncatedWord + "ím";
		
		mascAnimPlurNom = truncatedWord + "í";
		mascAnimPlurGen = truncatedWord + "ích";
		mascAnimPlurDat = truncatedWord + "ím";
		mascAnimPlurAcc = truncatedWord + "í";
		mascAnimPlurVoc = truncatedWord + "í";
		mascAnimPlurLoc = truncatedWord + "ích";
		mascAnimPlurIns = truncatedWord + "ími";
		mascInPlurNom = truncatedWord + "í";
		mascInPlurGen = truncatedWord + "ích";
		mascInPlurDat = truncatedWord + "ím";
		mascInPlurAcc = truncatedWord + "í";
		mascInPlurVoc = truncatedWord + "í";
		mascInPlurLoc = truncatedWord + "ích";
		mascInPlurIns = truncatedWord + "ími";
		
		femSingNom = truncatedWord + "í";
		femSingGen = truncatedWord + "í";
		femSingDat = truncatedWord + "í";
		femSingAcc = truncatedWord + "í";
		femSingVoc = truncatedWord + "í";
		femSingLoc = truncatedWord + "í";
		femSingIns = truncatedWord + "í";
		
		femPlurNom = truncatedWord + "í";
		femPlurGen = truncatedWord + "ích";
		femPlurDat = truncatedWord + "ím";
		femPlurAcc = truncatedWord + "í";
		femPlurVoc = truncatedWord + "í";
		femPlurLoc = truncatedWord + "ích";
		femPlurIns = truncatedWord + "ími";
		
		neutSingNom = truncatedWord + "í";
		neutSingGen = truncatedWord + "ího";
		neutSingDat = truncatedWord + "ímu";
		neutSingAcc = truncatedWord + "í";
		neutSingVoc = truncatedWord + "í";
		neutSingLoc = truncatedWord + "ím";
		neutSingIns = truncatedWord + "ím";
		
		neutPlurNom = truncatedWord + "í";
		neutPlurGen = truncatedWord + "ích";
		neutPlurDat = truncatedWord + "ím";
		neutPlurAcc = truncatedWord + "í";
		neutPlurVoc = truncatedWord + "í";
		neutPlurLoc = truncatedWord + "ích";
		neutPlurIns = truncatedWord + "ími";
	}
	
	var myJson = {mascAnimSingNom:mascAnimSingNom,mascAnimSingGen:mascAnimSingGen,mascAnimSingDat:mascAnimSingDat,mascAnimSingAcc:mascAnimSingAcc,mascAnimSingVoc:mascAnimSingVoc,mascAnimSingLoc:mascAnimSingLoc,mascAnimSingIns:mascAnimSingIns,mascInSingNom:mascInSingNom,mascInSingGen:mascInSingGen,mascInSingDat:mascInSingDat,mascInSingAcc:mascInSingAcc,mascInSingVoc:mascInSingVoc,mascInSingLoc:mascInSingLoc,mascInSingIns:mascInSingIns,mascAnimPlurNom:mascAnimPlurNom,mascAnimPlurGen:mascAnimPlurGen,mascAnimPlurDat:mascAnimPlurDat,mascAnimPlurAcc:mascAnimPlurAcc,mascAnimPlurVoc:mascAnimPlurVoc,mascAnimPlurLoc:mascAnimPlurLoc,mascAnimPlurIns:mascAnimPlurIns,mascInPlurNom:mascInPlurNom,mascInPlurGen:mascInPlurGen,mascInPlurDat:mascInPlurDat,mascInPlurAcc:mascInPlurAcc,mascInPlurVoc:mascInPlurVoc,mascInPlurLoc:mascInPlurLoc,mascInPlurIns:mascInPlurIns,femSingNom:femSingNom,femSingGen:femSingGen,femSingDat:femSingDat,femSingAcc:femSingAcc,femSingVoc:femSingVoc,femSingLoc:femSingLoc,femSingIns:femSingIns,femPlurNom:femPlurNom,femPlurGen:femPlurGen,femPlurDat:femPlurDat,femPlurAcc:femPlurAcc,femPlurVoc:femPlurVoc,femPlurLoc:femPlurLoc,femPlurIns:femPlurIns,neutSingNom:neutSingNom,neutSingGen:neutSingGen,neutSingDat:neutSingDat,neutSingAcc:neutSingAcc,neutSingVoc:neutSingVoc,neutSingLoc:neutSingLoc,neutSingIns:neutSingIns,neutPlurNom:neutPlurNom,neutPlurGen:neutPlurGen,neutPlurDat:neutPlurDat,neutPlurAcc:neutPlurAcc,neutPlurVoc:neutPlurVoc,neutPlurLoc:neutPlurLoc,neutPlurIns:neutPlurIns}
	
	var adjObject = {word: word, meanings: meanings, wordType: wordType, ...myJson};
	
	ret.push(adjObject);
	
	} catch(e) {
		continue;
	}
}

// console.log(ret);

fs.writeFileSync("adjs.json", JSON.stringify(ret), 'utf8');