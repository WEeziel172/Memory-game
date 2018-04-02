/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
const modal = document.querySelector(".modal");
const end_modal = document.querySelector("#endGameModal");
let modal_test = modal.setAttribute('style', 'display: block;');
let gamemode = "";

modal.querySelector('.start').addEventListener('click', function (evt) {
	gamemode = modal.querySelector('input[name="gamemode"]:checked').value
	console.log(gamemode);
	
	if(gamemode == "classic") {
		classic_gamemode();
	}
	if(gamemode == "attack") {
		attack_gamemode();
	}

    modal.style.display = "none";
});

const all_cards = ['fa fa-cube','fa fa-paper-plane-o','fa fa-bicycle','fa fa-bolt','fa fa-bomb','fa fa-leaf','fa fa-bomb','fa fa-diamond','fa fa-bicycle','fa fa-leaf','fa fa-anchor','fa fa-cube','fa fa-bolt','fa fa-anchor','fa fa-paper-plane-o','fa fa-diamond']
let all_cards_i = document.querySelector('.deck').querySelectorAll('li > i');

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

for (i=0; i<all_cards_i.length; i++) {
    all_cards_i[i].className += ' ' + array[i%array.length];
}
    return array;
}
shuffle(all_cards);


let time = 60;
let shuffle_timer = 30;
let pairs_in_row = 0;
let interval_time = 1000;


let all_cards_li = document.querySelector('.deck').querySelectorAll('li');
let available_cards = [...all_cards_li];
let card_pairs = [];


let selectedCell;
let clicked_cards = [];
let clicks = 0;
let matched_cards = [];

let moves = document.querySelector('.moves');
let counter = document.querySelector('#counter');
///////////////////////////////////////////////////////////
////////////////// ATTACK GAMEMODE ////////////////////////
///////////////////////////////////////////////////////////
let perk_buttons = document.querySelector('.perks').querySelectorAll('button');
document.querySelector('.perks').addEventListener('click', function (evt) {
if (evt.target.nodeName === 'BUTTON') {  // ← verifies target is desired element
			let target = event.target.closest('button'); //The actual LI element
			
			let i_target = target.value; // We get the child <i> element of the specific clicked element
			console.log(target);
			

			if(i_target == "reveal_all") {
				reveal("all");
				console.log("reveal all");
				target.disabled = true;
				
			}
			if(i_target == "reveal_two") {
				reveal("two");
				console.log("reveal_two");
				target.disabled = true;
				
			}
			if(i_target == "+30") {
				time += 30;
				console.log(time);
				target.disabled = true;
			}
			if(i_target == "+60") {
				time += 60;
				console.log(time);
				target.disabled = true;
			}
			if(i_target == "helping_hand") {
				helping_hand();
				target.disabled = true;
			}
}
});

let x;
let y;
let b;

function attack_gamemode() {
	counter.textContent = "Pairs";
    document.getElementById("countdown").innerHTML = "60";
	document.querySelector("h1").textContent = "MEMORY ATTACK";
	document.querySelector(".stars").setAttribute('style', 'display: none;');
	document.querySelector(".countdown_div").setAttribute('style', 'display: block;');
	document.querySelector(".perk_list").setAttribute('style', 'display: block;');
	
	for(button of perk_buttons) {
		button.disabled = false;
		
	}
	clearInterval(x);
	clearInterval(y);
	time = 60;
	re_start();
	countdown("true", "false", "false", "false");

	
}
function classic_gamemode() {
	clearInterval(b);
	time = 0;
	counter.textContent = "Moves";
	
	//star_li = document.createElement("LI");
	//star = document.createElement("i");
	//star.classList.add('fa', 'fa-star');
	
	//star_li.appendChild(star);
	
	all_stars = document.querySelector(".stars");
	all_stars_li = all_stars.querySelectorAll('li');
	all_stars_length = 	all_stars.querySelectorAll("li").length;
	
	while (all_stars.hasChildNodes()) {   
		all_stars.removeChild(all_stars.firstChild);
	}
	for(i=0;i <= 2;i++) {
		star_li = document.createElement("LI");
		star = document.createElement("i");
		star.classList.add('fa', 'fa-star');
	
		star_li.appendChild(star);
		all_stars.appendChild(star);		
		console.log(star);
		}
	
	document.querySelector("h1").textContent = "Classic Memory";
	document.querySelector(".stars").setAttribute('style', 'display: block;');
    document.getElementById("countdown").innerHTML = "0";
	document.querySelector(".countdown_div").setAttribute('style', 'display: block;');
	document.querySelector(".perk_list").setAttribute('style', 'display: none;');

	re_start();
	countdown("false", "false", "false", "true");
	
}

function countdown(change_time, plus_time, minus_time, classic_time){


//if (change_time == "true") {
	
	if(plus_time == "true" && minus_time == "false") {
		time += 10;
		document.getElementById("countdown").innerHTML = time;
	}
	else if(minus_time == "true" && plus_time == "false") {
		time -= 2;
		document.getElementById("countdown").innerHTML = time;
	}

//}
	else if (change_time == "true") {
		x = setInterval(function() {

		time -= 1;
		document.getElementById("countdown").innerHTML = time; 
		
		if (time <= 0) {
			clearInterval(x);
			document.getElementById("countdown").innerHTML = "GAME OVER";
			modal.querySelector('.score-panel-modal').setAttribute('style', 'display: block;');
			let show_score = modal.querySelector('.your_score');
			show_score.setAttribute('style', 'display: block;');
			show_score.querySelector('h2').textContent = matched_cards.length / 2 + " pairs";
			modal.setAttribute('style', 'display: block;');	

	
		}
	}, interval_time);
	console.log(time);


	let shuffle_time = 0;

  
	function re_shuffle() {
		y	= setInterval(function() {
		shuffle_time += 1;

  // If the count down is finished, write some text 
		if (shuffle_time == 20) {
    //clearInterval(y);
			shuffle_time = 0;
			for (card of all_cards_li) {
				card.classList.remove('show', 'open', 'match', 'show_reveal', 'reveal');

			}
			for (card of all_cards_i) {
				card.classList = "";
			}
			shuffle(all_cards);
			all_cards_li = [];
			all_cards_li = document.querySelector('.deck').querySelectorAll('li');
			available_cards = [...all_cards_li];

		}
		if(time <= 0) {
			clearInterval(y);
			}
		}, 1000);
	}
  re_shuffle();
}
else if (classic_time == "true") {
		 b = setInterval(function() {

		time += 1;
		document.getElementById("countdown").innerHTML = time;
		}, interval_time);
	}
}
//countdown();


function reveal(amount) {

	if(amount == "two") {	
		for (i=0; i < 2; i++) {
			let rand = all_cards_li[Math.floor(Math.random() * all_cards_li.length)];
			//i++;
			rand.classList.add('show_reveal', 'reveal');
			//if(i == 2) break;
			console.log(rand);
		}
	}
	if(amount == "all") {
		for (card of available_cards) {
		card.classList.add('show_reveal', 'reveal');
		//if(i == 2) break;	
	
		}
	}
}



//console.log(all_cards);

document.querySelector('.restart').addEventListener('click', function (evt) {
	document.getElementById("countdown").innerHTML = "GAME OVER";
	modal.setAttribute('style', 'display: block;');
	if (gamemode == "attack") {
		clearInterval(x);
		clearInterval(y);
	}
	if (gamemode == "classic") {
		clearInterval(b);
		
	}
});


document.querySelector('.deck').addEventListener('click', function (evt) {
	event = evt;
	when_clicked (event);
});

function when_clicked (evt) {
	if (evt.target.nodeName === 'LI' && clicked_cards.length < 2) {  // ← verifies target is desired element
		clicks++;	
		rating();
		if(gamemode == "classic") {
			moves.textContent = clicks;		
		}

		let target = event.target.closest('li'); //The actual LI element
			
		let i_target = target.querySelector('i'); // We get the child <i> element of the specific clicked element
		i_target = i_target.className
		
 		clicked_cards.push (target); // add the selected cards li element into an array
			
		highlight(target); // call the card highlightin function
			
		console.log(i_target);

	
		if (clicked_cards.length == 2){
			let first_click = clicked_cards [0];
			let second_click = clicked_cards [1];
		
			first_click = first_click.querySelector('i');
			second_click = second_click.querySelector('i');

		
			if (first_click.className == second_click.className) {
			
				console.log("ITs a Pair");
				console.log(clicked_cards);
				match(clicked_cards, true);
				//clicks = 0;
			}
			else {
				console.log("Not a pair, sorry!");
				console.log(clicked_cards);
				match(clicked_cards, false);
				//clicks = 0;
			
			}
		
			console.log("No more clicks!");
		}
		console.log(clicks);
	}
}

function highlight(cell) {

  selectedCell = cell;
  if (selectedCell) { // remove the existing highlight if any
    selectedCell.classList.remove('reveal', 'show_reveal');
  }
  console.log(selectedCell);
  selectedCell.classList.add('open', 'show'); // highlight the new td
	}
	function match (cards, boolean) {

		match_cards = cards;
		if_match = boolean;
	
		if(if_match == true) {
			for (card of match_cards) {
		
			card.classList.remove('show', 'open');
			card.classList.add('match');
			matched_cards.push(card);
		
			if(gamemode == "attack") {
				moves.textContent = matched_cards.length / 2;
			}
			if(gamemode == "classic") {
				moves.textContent = clicks;			
			}	
			available_cards.splice( available_cards.indexOf(card), 1 );
		
			if(gamemode == "classic" && available_cards.length == 0) {

			
				let show_score = modal.querySelector('.your_score');
				show_score.setAttribute('style', 'display: block;');
				show_score.querySelector('h2').textContent = clicks + " moves in " + time + " seconds";
		
				let stars_modal = document.querySelector('.stars-modal');
				stars_modal.setAttribute('style', 'display: block;');	
				
				for(i=0;i < document.querySelector('.stars').querySelectorAll("i").length;i++) {
					star_li = document.createElement("LI");
					star = document.createElement("i");
					star.classList.add('fa', 'fa-star');
	
					star_li.appendChild(star);
					modal.querySelector('.stars-modal').appendChild(star);		
					console.log(star);
				}
				modal.setAttribute('style', 'display: block;');			
			}

			}
			clicked_cards.splice(0, 2);
			if (gamemode == "attack") {
				countdown(true, "true", "false");
			}		
	}
	else if(if_match == false) {
		setTimeout(function(){
		for (card of match_cards) {
			card.classList.remove('show', 'open');

		}
		clicked_cards.splice(0, 2);
	},700);
		if (gamemode == "attack") {
			countdown(true, "false", "true");
		}
	}
}

function re_start () {

	clearInterval(b);
	clicked_cards = [];
	clicks = 0;
	matched_cards = [];
	moves.textContent = clicks;

	
		setTimeout(function(){
		for (card of all_cards_li) {
			card.classList.remove('show', 'open', 'match', 'show_reveal', 'reveal');

	}
		for (card of all_cards_i) {
			card.classList = "";
	}
		shuffle(all_cards);
});
	available_cards = [];
	available_cards = [...all_cards_li];
}
function rating () {
	
	if (clicks == 16) {
		let stars = document.querySelector('.stars');
		stars.firstElementChild.remove();
	}
	if (clicks == 22) {
		let stars = document.querySelector('.stars');
		stars.firstElementChild.remove();
	}

}
function helping_hand () {
	var help_time = 15;
	var y	= setInterval(function() {
	
	help_time -= 0.01;
	
	let rand = available_cards[Math.floor(Math.random() * available_cards.length)];
		if(rand.classList.contains("show", "open", "match")) {

		}
		else {
				rand.click()
		}
		//rand.classList.add('show_reveal', 'reveal');
		//if(i == 2) break;
console.log(rand);
  // If the count down is finished, write some text 
  if (help_time <= 0) {
    clearInterval(y);
  }
  if(time <= 0) {
	  clearInterval(y);
	  
  }
}, 10);
  //r
	
}
/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
