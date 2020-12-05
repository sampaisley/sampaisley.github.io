(function () {
	'use strict';

	const picsDiv = document.getElementById("picsDiv");
	const solve = document.getElementById("solve");
	const unsolve = document.getElementById("unsolve");
	const numOfPics = 20;

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
		"disconcert",
		"puzzle",
		"discombobulate",
		"muddy",
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

		let picsArray = [...Array(numOfPics).keys()];
		picsDiv.innerHTML = '';

		if (shuf) {
			shuffleArray(picsArray);
		}

		for (; i < numOfPics;) {
			picsDiv.innerHTML += `
                                  <img src="img/2020/${picsArray[i]}.gif" class="item post img-fluid"  id="${picsArray[i]}" alt="hohoho ${i++} ">
                             `;
		}
	}


	showPics(1);


	function shuffleArray(array) {
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
				[array[i], array[j]] = [array[j], array[i]];
		}
	}

	/////////////////////////
	//let child='' ;

	// The equivalent of parent.children.indexOf(child)



	///////////////////
	let dropedImg;
	let dropedPosition;

	//	dragula([document.querySelector('#picsDiv')]).on("drop", function(n){
	//		console.log(n.getAttribute('data-d'));
	//		//console.log("-> ", n.parentElement.childElementCount);
	//	});
	//	
	//	picsDiv.addEventListener('mousedown', function(n){
	//		//console.log('n--', n.target.getAttribute("data-img"));	
	//	});

	let drake = dragula([document.querySelector('#picsDiv')], {
		moves: function (el, source, handle) {
			
			 return el.className !== 'noDragin'; 
		},
		accepts: function (el, target, source, sibling) {

			 return sibling === null || sibling.classList.contains('post');
		},
		invalid: function (el, handle) {
			//return el.classList.contains('noDragin');
		}
	});



	drake.on("drop", function (el, target, source, sibling) {
		
		dropedImg = el.getAttribute('data-img');

		dropedPosition = Number(getIndexFromParent(el));

		if (dropedImg == dropedPosition) {
			let i = document.getElementById("17");
			
			i.classList.remove('post');
			i.classList.add("noDragin");
			
		}
	});



	function getIndexFromParent(node) {
		let children = node.parentNode.children;
		let i = 0;
		let len = children.length;
		for (; i < len && children[i] !== node; i++);

		return i === len ? -1 : i;
	}





}());
