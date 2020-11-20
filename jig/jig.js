(function () {
	'use strict';

	function shuffleArray(array) {
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
				[array[i], array[j]] = [array[j], array[i]];
		}
	}


	const picsDiv = document.getElementById("picsDiv");
	const solve = document.getElementById("solve");
	const unsolve = document.getElementById("unsolve");
	let numOfPics = 20;

	const synomns = [
		"confound",
		"obfuscate",
		"problemise",
		"perplex",
		"obscure",
		"muddle",
		"becloud",
		"mystify",
		"befuddle",
		"complicate",
	];

	solve.onclick = function () {
		showPics(0);
	};

	unsolve.onclick = function () {
		showPics(1);
		shuffleArray(synomns);
		this.innerHTML = synomns[0];
	};



	function showPics(shuf) {
		let i = 0;

		const ar = [...Array(numOfPics).keys()];
		picsDiv.innerHTML = '';

		if (shuf) {
			shuffleArray(ar);
		}

		for (; i < numOfPics;) {
			picsDiv.innerHTML += '<div class="item"><img src="img/2020/' + ar[i++] + '.gif"  class="img-fluid" alt="hohoho' + i + '"></div>';
		}
	}


	showPics(1);



	dragula([document.querySelector('#picsDiv')]);



	function ElFromId(e) {
		this.el = document.getElementById(e);
		
		this.text = function (tx) {
			this.el.innerHTML = tx;
			return this;
		};
		this.addClass = function (cl) {

			this.el.classList.add(cl);
			return this;

		};
		this.removeClass = function (cl) {
			
			this.el.classList.remove(cl);
			return this;
		};
	}
	let dog = new ElFromId("dog");

	dog.addClass('big').text("green").removeClass("underline").addClass("green");


}());
