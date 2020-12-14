'use strict';


	const picsDiv = document.getElementById("picsDiv");
	const solve = document.getElementById("solve");
	const unsolve = document.getElementById("unsolve");
	const numOfPics = 20;

	const synomns = [
		"becloud",
		"befuddle",
		"bol-ox",
		"confound",
		"confusticate",
		"complicate",
		"disband",
		"discombobulate",
		"discompose",
		"disconcert",
		"disturb",
		"jumble",
		"muddle",
		"muddy",
		"mystify",
		"obfuscate",
		"obscure",
		"perplex",
		"problemise",
		"puzzle",
		"scramble",
		"shuffle",
		"undo",
		"unsolve",
		];

	changeText(unsolve);


	solve.onclick = function () {
		showPics(0);
		swapButtons(this, unsolve);

	};

	unsolve.onclick = function () {
		showPics(1);
		changeText(this);
		swapButtons(this, solve);

	};

	function changeText(el) {
		shuffleArray(synomns);
		el.innerHTML = synomns[0];
	}


	function swapButtons(el1, el2) {
		el1.classList.add('d-none');
		el2.classList.remove('d-none');
	}



	function showPics(shuf) {
		let i = 0;

		let picsArray = [...Array(numOfPics).keys()];
		picsDiv.innerHTML = '';

		if (shuf) {
			shuffleArray(picsArray);
		}

		for (; i < numOfPics;) {
			picsDiv.innerHTML += `<div class="item">
                                  <img src="img/2020/${picsArray[i]}.gif"  class="img-fluid" alt="pic ${i++} ">
                                  </div>`;
		}
	}


	showPics(1);


	function shuffleArray(array) {
		let i = array.length - 1;
		for (; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
				[array[i], array[j]] = [array[j], array[i]];
		}    
	}




	dragula([document.querySelector('#picsDiv')]).on("drop",
		function () {
			if (solve.classList.contains('d-none')) swapButtons(unsolve, solve);
			changeText(unsolve);
		});
	


