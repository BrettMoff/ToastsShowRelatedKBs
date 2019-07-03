/* ------------------------------------------------------- */
/* --------------- Toasts Show Related KB's -------------- */
/* ------------------------------------------------------- */
/*
Author: Adrian Paech, Jeff Lang, Brett Moffett, Joivan Hedrick
Description: Adds a custom badge on the menu item counting all active work items. Refreshes every minute.

v1.0 	Initial community release

TO DO LIST:
- Have the JS look up the navigation column colour and set the background colour to match.

*/


// Add "Search Knowledge Base" Task (to Incidents).
app.custom.formTasks.add('Incident', 'Quick Search KB Articles', function (formObj, viewModel) {
//	if (session.user.Analyst) {
		showRelatedKBs(false, true, 0);
//	}
});
// Add "Search Knowledge Base" Task (to Incidents).
app.custom.formTasks.add('Incident', 'Search KB Articles', function (formObj, viewModel) {
//	if (session.user.Analyst) {
		showRelatedKBs(true, true, 0);
//	}
});

// Add "Search Knowledge Base" Task (to Service Requests).
app.custom.formTasks.add('ServiceRequest', 'Quick Search KB Articles', function (formObj, viewModel) {
//	if (session.user.Analyst) {
		showRelatedKBs(false, true, 0);
//	}
});
// Add "Search Knowledge Base" Task (to Service Requests).
app.custom.formTasks.add('ServiceRequest', 'Search KB Articles', function (formObj, viewModel) {
//	if (session.user.Analyst) {
		showRelatedKBs(true, true, 0);
//	}
});



app.custom.formTasks.add('Incident', null, function (formObj, viewModel) {
	formObj.boundReady(function () {
		kbSearchOnTyping();
	});
});
app.custom.formTasks.add('ServiceRequest', null, function (formObj, viewModel) {
	formObj.boundReady(function () {
		kbSearchOnTyping();
	});
});

var oldKBToast = '';
var validSearchNumber = 0;

var typingDelay = 0;
var searchAfterTypingDelay = 500;

/*
 * add function to allow detection of changes to title and description
*/
function kbSearchOnTyping() {
	$('input[name="Title"]').keyup(function(){
		if ($('input[name="Title"]').val()) {
			var d = new Date();
			typingDelay = d.getTime();
			validSearchNumber = validSearchNumber + 1;
			setTimeout(function() {
				var d = new Date();
				if( typingDelay < d.getTime() - searchAfterTypingDelay) {
					typingDelay = 0;
					showRelatedKBs(false, true, validSearchNumber);
				}				
			},searchAfterTypingDelay + 10);
		} else {
			typingDelay = 0;
			showRelatedKBs(false, true, validSearchNumber);
		}
	});
	$('textarea[name="Description"]').keyup(function(){
		if ($('textarea[name="Description"]').val()) {
			// validSearchNumber = validSearchNumber + 1;
			// showRelatedKBs(true, true, validSearchNumber);
			var d = new Date();
			typingDelay = d.getTime();
			validSearchNumber = validSearchNumber + 1;
			setTimeout(function() {
				var d = new Date();
				if( typingDelay < d.getTime() - searchAfterTypingDelay) {
					typingDelay = 0;
					showRelatedKBs(true, true, validSearchNumber);
				}				
			},searchAfterTypingDelay + 10);
		} else {
			typingDelay = 0;
			showRelatedKBs(true, true, validSearchNumber);
		}
	});
}

/*START Related knowledge articles applet
Updated by Adrian Paech on 31/05/2016 to only add "Related Articles" once.
Required so that it can be triggered when initially entering a title or description on a new incident.
*/
function showRelatedKBs(blnIncludeDescription, blnDisplayResults, searchNumber) {
	var title = $('input[name="Title"]').val();
	var description = $('textarea[name="Description"]').val();
	
	if ( title.length < 1 && description.length < 1) {
		return;
	}
	var srch = title.toLowerCase();
	if (blnIncludeDescription) { 
		srch = srch + ' ' + description.toLowerCase();
	}
	if(srch.length < 2) {
		return;
	}
	//list of common words, anything added to this list will be removed from the title
	var common = "the, of, to, and, a, in, is, it, you, that, he, was, for, on, are, with, as, I, his, they, be, at, one, have, this, from, or, had, by, hot, word, but, what, some, we, can, out, other, were, all, there, when, up, use, your, how, said, an, each, she, which, do, their, time, if, will, way, about, many, then, them, write, would, like, so, these, her, long, make, thing, see, him, two, has, look, more, day, could, go, come, did, number, sound, no, most, people, my, over, know, water, than, call, first, who, may, down, side, been, now, find, any, new, work, part, take, get, place, made, live, where, after, back, little, only, round, man, year, came, show, every, good, me, give, our, under, name, very, through, just, form, sentence, great, think, say, help, low, line, differ, turn, cause, much, mean, before, move, right, boy, old, too, same, tell, does, set, three, want, air, well, also, play, small, end, put, home, read, hand, port, large, spell, add, even, land, here, must, big, high, such, follow, act, why, ask, men, change, went, light, kind, off, need, house, picture, try, us, again, animal, point, mother, world, near, build, self, earth, father, head, stand, own, page, should, country, found, answer, school, grow, study, still, learn, plant, cover, food, sun, four, between, state, keep, eye, never, last, let, thought, city, tree, cross, farm, hard, start, might, story, saw, far, sea, draw, left, late, run, don't, while, press, close, night, real, life, few, north, open, seem, together, next, white, children, begin, got, walk, example, ease, paper, group, always, music, those, both, mark, often, letter, until, mile, river, car, feet, care, second, book, carry, took, science, eat, room, friend, began, idea, fish, mountain, stop, once, base, hear, horse, cut, sure, watch, color, face, wood, main, enough, plain, girl, usual, young, ready, above, ever, red, list, though, feel, talk, bird, soon, body, dog, family, direct, pose, leave, song, measure, door, product, black, short, numeral, class, wind, question, happen, complete, ship, area, half, rock, order, fire, south, problem, piece, told, knew, pass, since, top, whole, king, space, heard, best, hour, better, TRUE, during, hundred, five, remember, step, early, hold, west, ground, interest, reach, fast, verb, sing, listen, six, table, travel, less, morning, ten, simple, several, vowel, toward, war, lay, against, pattern, slow, center, love, person, money, serve, appear, road, map, rain, rule, govern, pull, cold, notice, voice, unit, power, town, fine, certain, fly, fall, lead, cry, dark, machine, note, wait, plan, figure, star, box, noun, field, rest, correct, able, pound, done, beauty, drive, stood, contain, front, teach, week, final, gave, green, oh, quick, develop, ocean, warm, free, minute, strong, special, mind, behind, clear, tail, produce, fact, street, inch, multiply, nothing, course, stay, wheel, full, force, blue, object, decide, surface, deep, moon, island, foot, system, busy, test, record, boat, common, gold, possible, plane, stead, dry, wonder, laugh, thousand, ago, ran, check, game, shape, equate, hot, miss, brought, heat, snow, tire, bring, yes, distant, fill, east, paint, language, among, grand, ball, yet, wave, drop, heart, am, present, heavy, dance, engine, position, arm, wide, sail, material, size, vary, settle, speak, weight, general, ice, matter, circle, pair, include, divide, syllable, felt, perhaps, pick, sudden, count, square, reason, length, represent, art, subject, region, energy, hunt, probable, bed, brother, egg, ride, cell, believe, fraction, forest, sit, race, window, store, summer, train, sleep, prove, lone, leg, exercise, wall, catch, mount, wish, sky, board, joy, winter, sat, written, wild, instrument, kept, glass, grass, cow, job, edge, sign, visit, past, soft, fun, bright, gas, weather, month, million, bear, finish, happy, hope, flower, clothe, strange, gone, jump, baby, eight, village, meet, root, buy, raise, solve, metal, whether, push, seven, paragraph, third, shall, held, hair, describe, cook, floor, either, result, burn, hill, safe, cat, century, consider, type, law, bit, coast, copy, phrase, silent, tall, sand, soil, roll, temperature, finger, industry, value, fight, lie, beat, excite, natural, view, sense, ear, else, quite, broke, case, middle, kill, son, lake, moment, scale, loud, spring, observe, child, straight, consonant, nation, dictionary, milk, speed, method, organ, pay, age, section, dress, cloud, surprise, quiet, stone, tiny, climb, cool, design, poor, lot, experiment, bottom, key, iron, single, stick, flat, twenty, skin, smile, crease, hole, trade, melody, trip, office, receive, row, mouth, exact, symbol, die, least, trouble, shout, except, wrote, seed, tone, join, suggest, clean, break, lady, yard, rise, bad, blow, oil, blood, touch, grew, cent, mix, team, wire, cost, lost, brown, wear, garden, equal, sent, choose, fell, fit, flow, fair, bank, collect, save, control, decimal, gentle, woman, captain, practice, separate, difficult, doctor, please, protect, noon, whose, locate, ring, character, insect, caught, period, indicate, radio, spoke, atom, human, history, effect, electric, expect, crop, modern, element, hit, student, corner, party, supply, bone, rail, imagine, provide, agree, thus, capital, won't, chair, danger, fruit, rich, thick, soldier, process, operate, guess, necessary, sharp, wing, create, neighbor, wash, bat, rather, crowd, corn, compare, poem, string, bell, depend, meat, rub, tube, famous, dollar, stream, fear, sight, thin, triangle, planet, hurry, chief, colony, clock, mine, tie, enter, major, fresh, search, send, yellow, gun, allow, print, dead, spot, desert, suit, current, lift, rose, continue, block, chart, hat, sell, success, company, subtract, event, particular, deal, swim, term, opposite, wife, shoe, shoulder, spread, arrange, camp, invent, cotton, born, determine, quart, nine, truck, noise, level, chance, gather, shop, stretch, throw, shine, property, column, molecule, select, wrong, gray, repeat, require, broad, prepare, salt, nose, plural, anger, claim, continent, oxygen, sugar, death, pretty, skill, women, season, solution, magnet, silver, thank, branch, match, suffix, especially, fig, afraid, huge, sister, steel, discuss, forward, similar, guide, experience, score, apple, bought, led, pitch, coat, mass, card, band, rope, slip, win, dream, evening, condition, feed, tool, total, basic, smell, valley, nor, double, seat, arrive, master, track, parent, shore, division, sheet, substance, favor, connect, post, spend, chord, fat, glad, original, share, station, dad, bread, charge, proper, bar, offer, segment, slave, duck, instant, market, degree, populate, chick, dear, enemy, reply, drink, occur, support, speech, nature, range, steam, motion, path, liquid, log, meant, quotient, teeth, shell, neck, display, uses, browse, allows, relevance, relevant, scroll, brings, looking, service, catalog, catalogue, into, synonyms, prefer, issue, based, smarter, not, user, click, startup, start-up, demo, remove, request, delete, modify, adjust, align, edit, assistance, working, item, i'm, it's, ok, because, onto";
	//convert array  of uncommon words to string for single search
	var searchString = [];
	//this returns a clean array of uncommon words	
	var searchArray = getUncommon(srch, common);
	//Search Title or Title and Description against KB Articles
	for(var i=0;i < searchArray.length; i++) { 
		searchString += searchArray[i] + " ";
	}
	//make sure the search string grab didnt fail or the search string wasnt somehow empty
	if(searchString.length > 0) {				
		//ajax call to the portal API
		$.ajax({
			url: "/api/V3/ArticleList",
			data: {
				searchText: searchString
			},
			type: "GET", //this particular portal API call is a GET type
			success: function (data) {
				// if data returns results, remove any non published items, then continue ( to check length again)
				for (var i = data.length - 1; i > -1; i--) {
					if (data[i].Status.Id != '9508797e-0b7a-1d07-9fa3-587723f09908') {
						data.splice(i,1);
					}
				} 
				//makes sure that the data array returned contains some results or it is ignored
				if (data.length > 0) {							
					//Currently we just grab the first result as the most popular one since popularity is not automatically calculated
					var mostRelevent = 0;
					//Relevance Sorter Hashtable used to sort KB articles by most relevant.
					var htKBRelevanceSorter = new Object ();
					for (var i = 0; i < data.length; i++) {
						var relevence = 0;																
						//Compare Relevance Against Title and Description
						for (var j = 0; j < searchArray.length; j++) {
							var occured = occurrences(data[i].Title.toLowerCase(), searchArray[j])
							relevence += occured;
						}
						//Sets array index element in hashtable, along with associated relevence.
						htKBRelevanceSorter[i] = relevence;
					}
					var notificationMsg = "";
					if (blnDisplayResults) {
						//Sort KBArticles by Relevance
						arrSortedKBs = getKeysSortedDescending(htKBRelevanceSorter);
						//Formulate alertify notification message.
						var intKBLimit = 5;
						var notificationMsg = notificationMsg + "<b><span style=\"font-size: 15px; background-color: rgba(41, 133, 184, 0.6);\">";							
						if (blnIncludeDescription) { 
							notificationMsg = notificationMsg + "Related Knowledge Article(s) - (Full)</span></b>"; 
							intKBLimit = 10;
						} else { 
							notificationMsg = notificationMsg + "Related Knowledge Article(s) - (Quick)</span></b>"; 
						}
						
						if (arrSortedKBs.length > intKBLimit) {
							notificationMsg = notificationMsg + "<br>The top '" + intKBLimit + "' related articles are listed below:"								
						} else {
							notificationMsg = notificationMsg + "<br>Potentially related articles are listed below:"
						}
						notificationMsg = notificationMsg + "<br><br><ol type=\"1\" style=\"line-height: 1.2; text-indent: -4px;\">";
													
						//this runs through the arrSortedKBs array and adds the first 5 returned results (or 10 results for comprehensive search) to the Related KBs table
						for (var i = 0; i < arrSortedKBs.length && i < intKBLimit; i++) {			
							notificationMsg = notificationMsg + "<li><a style=\"color: lightGray;\" href=\"/KnowledgeBase/View/" + data[arrSortedKBs[i]].ArticleId + "\" target=\"KB: " + data[arrSortedKBs[i]].ArticleId + "\"><u><b>KB" + data[arrSortedKBs[i]].ArticleId + "</b></u></a> - <i>" + data[arrSortedKBs[i]].Title.substring(0,60) + "</i>";
							if (data[arrSortedKBs[i]].Title.length > 60) { notificationMsg = notificationMsg + "..."; }
							notificationMsg = notificationMsg + "</li>";
						}							
						notificationMsg = notificationMsg + "</ol>";
						if (blnIncludeDescription == false) { notificationMsg = notificationMsg + "<a class=\"rerunKBSearch\" style=\"color: lightGray; cursor: pointer;\" onclick=\"showRelatedKBs(true, true)\"><u>Run Full Search</u></a> (Title & Description)"; }
						//alert users of related KB articles
						if (oldKBToast != notificationMsg) {
							currKBAlerts = $('article.alertify-log.alertify-log-show span:contains("Related Knowledge Article(s)")');
							for( var i=0; i < currKBAlerts.length; i++) {$(currKBAlerts[i]).parent().parent().click();}
							alertify.log(notificationMsg, "", 0);
							oldKBToast = notificationMsg;
						}
					} else {
						//Only Prompt, instead of displaying results.
						notificationMsg = notificationMsg + "Found '" + data.length + "' Related KB Articles (<a class=\"rerunKBSearch\" onclick=\"showRelatedKBs(false, true)\" style=\"cursor: pointer; color: lightGray;\"><u>view results</u></a>)";
						alertify.log(notificationMsg);
						oldKBToast = notificationMsg;
					}
				} else {
					$('article.alertify-log.alertify-log-show span:contains("Related Knowledge Article(s)")').parent().parent().click();
					oldKBToast = notificationMsg;
				} // if (data.length > 0)
			} // ajax - success: function (data)
		}); // ajax
	} // if(searchString.length > 0)

	//This function cleans up the search string by comparing it against a list of common words and then return an array with uncommon words
	function getUncommon(sentence, common) {
		sentence = sentence.replace("/"," ").replace("\\"," ");
		sentence = sentence.replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()]/g, " ");
		sentence = sentence.replace(/(\r\n|\n|\r)/gm," ");								
		sentence = sentence.replace(String.fromCharCode(8203)," ");
		
		var sentenceArray = sentence.split(' ');
		for (var i = 0; i < sentenceArray.length; i++) {
			sentenceArray[i] = sentenceArray[i].trim();
		}

		//searches through each word in the search array and matches to common words
		//builds a new array that doesn't have the common words in it
		var uncommonArray = [];
		for (var i = 0; i < sentenceArray.length; i++) {
			if (common.indexOf(sentenceArray[i]) == -1) {
				uncommonArray.push(sentenceArray[i]);
			}
		}
		return uncommonArray;
	} // function getUncommon
	/*
		Function count the occurrences of substring in a string;
		@param {String} string   Required. The string;
		@param {String} subString    Required. The string to search for;
		@param {Boolean} allowOverlapping    Optional. Default: false;
	*/
	function occurrences(string, subString, allowOverlapping) {				
		string += ""; subString += "";
		if (subString.length <= 0) {
			return string.length + 1;
		}
		var n = 0, pos = 0;
		var step = (allowOverlapping) ? (1) : (subString.length);
		while (true) {
			pos = string.indexOf(subString, pos);					
			if (pos >= 0) { n++; pos += step; } else break;
		}				
		return (n);
	} // function occurrences
	/* 
		Returns keys of a hashtable, sorted by the value assigned. 
		Used to return KB articles in order of relavence.
	*/
	function getKeysSortedDescending(obj) {
		var keys = []; for(var key in obj) keys.push(key);
		return keys.sort(function(a,b){return obj[b]-obj[a]});
	} // function getKeysSortedDescending
	
} // function showRelatedKBs
/*END Related knowledge articles applet END*/