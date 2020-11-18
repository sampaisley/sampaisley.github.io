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


solve.onclick = function () {
	showPics(50,0);
}

unsolve.onclick = function () {
	showPics(10,1);
};



function showPics(speed,shuf){
	var i = 0;
//	if(!speed){
//		speed=0;
//	}
	const ar = [...Array(numOfPics).keys()];
	divi.innerHTML = '';

	if(shuf){
		shuffleArray(ar);
	}

	var countdown = setInterval(function () {
		divi.innerHTML += '<div class="item"><img src="img/2020/' + ar[i++] + '.gif"  class="img-fluid" alt=""></div>';
		if (i == numOfPics) {
			clearTimeout(countdown);
		}
	}, speed);
}
showPics(0,1);
 
dragula([document.querySelector('#picsDiv')]);
