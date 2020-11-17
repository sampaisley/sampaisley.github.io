function shuffleArray(array) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
				[array[i], array[j]] = [array[j], array[i]];
	}
}


const divi = document.getElementById("picsDiv");
const solve = document.getElementById("solve");
const unsolve = document.getElementById("unsolve");
var numOfPics = 20;

const ar = [...Array(numOfPics).keys()];


function jig() {

	shuffleArray(ar);
	for (var j = 0; j < numOfPics; j++) {
		divi.innerHTML += '<div class="item"><img src="img/' + ar[j] + '.jpg"  class="img-fluid" alt=""></div>';
	}
};


solve.onclick = function () {
	divi.innerHTML = '';
	for (var j = 0; j < numOfPics; j++) {
		divi.innerHTML += '<div class="item"><img src="img/' + j + '.jpg"  class="img-fluid" alt=""></div>';
	}
}

unsolve.onclick = function () {
	divi.innerHTML = '';
	jig();
};

jig();


dragula([document.querySelector('#picsDiv')]);
