"use strict";

let slider = document.getElementById("slider");
let slideTrack = document.getElementById("slideTrack");
let vid1 = document.getElementById("vid1");

let vidLength;
let rect = slideTrack.getBoundingClientRect();



 setTimeout(waitForVid, 1);
function waitForVid(){
   $("#info_length").text(vid1.duration.toFixed(2));
    vidLength = Math.round(vid1.duration);
}


vid1.addEventListener('loadeddata', function () {

  if (vid1.readyState >= 2) {
   
    $("#info_length").text(vid1.duration.toFixed(2));
    vidLength = Math.round(vid1.duration);
  }

});



console.log('31');


slider.onmousedown = function () {


  slideTrack.addEventListener('mousemove',
    move,
    false
  );
};


window.onmouseup = function () {

  slideTrack.removeEventListener('mousemove',
    move,
    false
  );


};
const fin = rect.right;

function move(e) {

  if (e.clientX < fin && e.clientX > rect.x)
    slider.style.left = `${e.clientX - rect.x}px`;


  let xPercent = (e.clientX - rect.x) * 100 / rect.width;




  vid1.currentTime = xPercent * (vidLength / 100);

  $("#info_pos").text(vid1.currentTime.toFixed(2));


}

slideTrack.addEventListener('touchmove', function (e) {


  let changedTouch = event.changedTouches[0];
  let elem = document.elementFromPoint(changedTouch.clientX, changedTouch.clientY);
  let xPercent = (changedTouch.clientX - rect.x) * 100 / rect.width;

  if (changedTouch.clientX < fin && changedTouch.clientX > rect.x)

    slider.style.left = `${changedTouch.clientX - rect.x}px`;
  vid1.currentTime = xPercent * (vidLength / 100);
  $("#info_pos").text(vid1.currentTime.toFixed(2));

});
