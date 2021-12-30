"use strict";


let jabber= document.getElementById("jabber");
let jw = jabber.width;
let container = document.getElementById("container");

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
    let speedModifier = 0.4;
    let speed = Math.ceil(larger / speedModifier);
    return speed;	
}

function floatArm() {
    let newPos = makeNewPosition();
    let oldTop = target.offsetTop;
    let oldLeft = target.offsetLeft;
	target.animate([
		{ top: oldTop+"px", left: oldLeft+"px" },
		{ top: newPos[0]+"px", left: newPos[1]+"px" }
		], {
	duration: velocity([oldTop, oldLeft],newPos),
	fill: 'forwards'
	}).onfinish = function() {
		floatArm();
	};
}


let target = document.createElement("img");
target.id = "target";
target.onload = function() {
    floatArm();
};
target.src = "../img/arm2.png";
container.appendChild(target);

////////////////////
let hits = 0;
target.onclick = function(){
    
    console.log("ooo " +hits);
   if(hits++ >=2){
       target.remove();
       jabber.remove();
   }
};


target.ondragstart = jabber.ondragstart = function() { // pervents image dragging
    return false;
  };


  /////////////////////////////////

  

  container.onmousemove = function(e){
    jabber.style.left = e.x -jw + "px";
    jabber.style.top = e.y  + "px";
  };



  ///////////// TOUCH   \\\\\\\\\\\\\\\\\\\\\\\\\
 
      

  container.ontouchmove = function(event){
    event.preventDefault();
    event.stopPropagation();
    var changedTouch = event.changedTouches[0];
  //  var elem = document.elementFromPoint(changedTouch.clientX, changedTouch.clientY);
   
    jabber.style.left = changedTouch.clientX -jw + "px";
    jabber.style.top = changedTouch.clientY  + "px";
  };

  alert("foo");