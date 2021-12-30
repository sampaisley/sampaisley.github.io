"use strict";

let jabber = document.getElementById("jabber");
let jw = jabber.width;
let container = document.getElementById("container");
let score = document.getElementById("score");
let sound = new Audio("aaggh.mp3");

function makeNewPosition() {
  let containerVspace = container.offsetHeight - target.offsetHeight,
    containerHspace = container.offsetWidth - target.offsetWidth,
    newX = Math.floor(Math.random() * containerVspace),
    newY = Math.floor(Math.random() * containerHspace);
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
  let newPos = makeNewPosition();
  let oldTop = target.offsetTop;
  let oldLeft = target.offsetLeft;
  target.animate(
    [
      { top: oldTop + "px", left: oldLeft + "px" },
      { top: newPos[0] + "px", left: newPos[1] + "px" },
    ],
    {
      duration: velocity([oldTop, oldLeft], newPos),
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
let hits = 1;
target.onclick = function () {
    sound.play();
  score.innerHTML = hits;
  score.classList.add("show");
  setTimeout(function () {
    score.classList.remove("show");
  }, 500);

  if (hits++ >= 3) {
    target.remove();
    jabber.remove();
    setTimeout(function () {
      container.classList.add("default");
      container.classList.add("happy");
      container.innerHTML = "<h1>Happy New Year</h1>";
    }, 1000);
  }
};

target.ondragstart = jabber.ondragstart = function () {
  // pervents image dragging
  return false;
};

/////////////////////////////////

container.onmousemove = function (e) {
  jabber.style.left = e.x - jw + "px";
  jabber.style.top = e.y + "px";
};

///////////// TOUCH   \\\\\\\\\\\\\\\\\\\\\\\\\

container.ontouchmove = function (event) {
  event.preventDefault();
  event.stopPropagation();
  var changedTouch = event.changedTouches[0];
  //  var elem = document.elementFromPoint(changedTouch.clientX, changedTouch.clientY);

  jabber.style.left = changedTouch.clientX - jw + "px";
  jabber.style.top = changedTouch.clientY + "px";
};
