"use strict";




let jabber = document.getElementById("jabber");

let container = document.getElementById("container");
let score = document.getElementById("score");

let sound1 = new Audio("aaggh.mp3");
let sound2 = new Audio("aaggh2.mp3");
let sound3 = new Audio("aaggh3.mp3");
let start = new Audio("start.mp3");




let sounds = [sound2, sound3, sound1];

function makeNewPosition(c) {
  let vSpace = c.offsetHeight - target.offsetHeight;
  let Hspace = c.offsetWidth - target.offsetWidth;
  let newX = Math.floor(Math.random() * vSpace);
  let newY = Math.floor(Math.random() * Hspace);
  return [newX, newY];
}

function velocity(prev, next) {
  let x = Math.abs(prev[1] - next[1]);
  let y = Math.abs(prev[0] - next[0]);
  let larger = x > y ? x : y;
  let speedModifier = 0.3;
  let speed = Math.ceil(larger / speedModifier);
  return speed;
}

function floatArm() {
  let newPos = makeNewPosition(container);
  let oldTop = target.offsetTop;
  let oldLeft = target.offsetLeft;
  target.animate(
    [
      { top: oldTop + "px", left: oldLeft + "px" },
      { top: newPos[0] + "px", left: newPos[1] + "px" },
    ],
    {
      duration: velocity([oldTop, oldLeft], newPos),
      easing:"ease-in-out",
      fill: "forwards",
    }
  ).onfinish = function () {
    floatArm();
  };
}

let target = document.createElement("img");
target.id = "target";
target.onload = function () {
  floatArm();
};
target.src = "../img/arm2.png";
container.appendChild(target);

////////////////////
function isMob() {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        // true for mobile device
        return true;
    }
        // false for not mobile device
        return false;
   
}
if (!isMob()) {
  
  target.onclick = function () {
    hit();
  };
}

target.ondragstart = jabber.ondragstart = function () {
  // pervents image dragging
  return false;
};

/////////////////////////////////

container.onmousemove = function (e) {
  jabber.style.left = e.x - 100 + "px";
  jabber.style.top = e.y + "px";
};
let hits = 0;
function hit(){

    if (hits > 2) return;
     sounds[hits].play();
     


    /* if (hits == 0) {
      sound3.play();
    } else if (hits == 1) {
      sound2.play();
    } else if (hits == 2) {
      sound1.play();
    } */
   
    floatArm();
    
  score.innerHTML = ++hits;
  score.classList.add("show");
  setTimeout(function () {
    score.classList.remove("show");
  }, 500);

  if (hits >= 3) {
   
    jabber.remove();
    target.classList.add("fadeArm");
    setTimeout(function () {
      container.classList.add("default"); 
      target.remove();
      container.classList.add("happy");
      container.innerHTML = "<h1 id='happy'>Happy New Year</h1>";
    }, 1500);
  }
}


container.addEventListener("click", function(e){
    if(e.target.id == "happy"){
        location.reload();
    }
});


///////////// TOUCH   \\\\\\\\\\\\\\\\\\\\\\\\\
if(isMob()){
let once = 0;

  target.ontouchstart = function () {
      if(once == 0){
    start.play();       // to get around this : play() failed because the user didn't interact with the document first
    
   setTimeout(hit,200);
   once++;
      }else{
          hit();
      }
   
  };

  container.ontouchmove = container.ontouchstart = function (event) {
    event.preventDefault();
    event.stopPropagation();
    
    var changedTouch = event.changedTouches[0];
    //  var elem = document.elementFromPoint(changedTouch.clientX, changedTouch.clientY);

    jabber.style.left = changedTouch.clientX - 100 + "px";
    jabber.style.top = changedTouch.clientY + "px";
  };

  container.addEventListener("touchend", function (event) {
    event.preventDefault();
    event.stopPropagation();
    let changedTouch = event.changedTouches[0];
    let elem = document.elementFromPoint(
      changedTouch.clientX,
      changedTouch.clientY
    );

    if (elem.id == "target") {
      //hit();
    } else if (elem.id == "happy") {
      location.reload();
    }
  });
}

 