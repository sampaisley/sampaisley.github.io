"use strict";
let slide = document.getElementById("slide");
let outer = document.getElementById("outer");
let vid1 = document.getElementById("vid1");
let divW = outer.offsetWidth ;
let vidLength;
let rect = outer.getBoundingClientRect();
console.log('rect', rect.x);



vid1.addEventListener('loadedmetadata', function (a) {


  vidLength = Math.round(vid1.duration);
  $("#info_length").text(vid1.duration.toFixed(2));
 

});



slide.onmousedown = function () {


  outer.addEventListener('mousemove',
    move,
    false
  );
};


window.onmouseup = function () {

  outer.removeEventListener('mousemove',
    move,
    false
  );


};
const fin = divW + rect.x;
 
function move(e) {

  if (e.clientX < fin && e.clientX > rect.x)
    slide.style.left = `${e.clientX - rect.x}px`;
 

 let xPercent = (e.clientX - rect.x ) * 100 / rect.width;

 
 
   vid1.currentTime = xPercent * (vidLength / 100);
 
   $("#info_pos").text(vid1.currentTime.toFixed(2));
 
 
}

outer.addEventListener('touchmove', function (e) {
        
  
   var changedTouch = event.changedTouches[0];
  var elem = document.elementFromPoint(changedTouch.clientX, changedTouch.clientY);
  let xPercent = (changedTouch.clientX - rect.x ) * 100 / rect.width;
  console.log('elem', xPercent);
  slide.style.left = `${changedTouch.clientX - rect.x}px`;
   vid1.currentTime = xPercent * (vidLength / 100);
  
     });
//$("#slide").on("mousedown", move);
