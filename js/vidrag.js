"use strict";

let slider = document.getElementById("slider");
let sliderWidth = slider.getBoundingClientRect().width / 2;

let slideTrack = document.getElementById("slideTrack");
let vid1 = document.getElementById("vid1");

let vidLength;
let xPercent;
let rect = slideTrack.getBoundingClientRect();
let inc;

document.getElementById('topInfo').innerHTML= screen.width + " - " + screen.height;

setTimeout(waitForVid, 1);

function waitForVid() {
 afterVidLoad();
}

// belt & braces
vid1.addEventListener('loadeddata', function () {

  if (vid1.readyState >= 2) {
    
   afterVidLoad();
  }

});
function afterVidLoad(){
  inc = vid1.duration;
   $("#info_length").text(vid1.duration.toFixed());
    vidLength = Math.round(vid1.duration);
}



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


let fin = rect.right;

function move(e) {

  if (e.clientX < fin - sliderWidth && e.clientX > rect.x + sliderWidth)

    slider.style.left = `${e.clientX - rect.x}px`;

  xPercent = (e.clientX - rect.x) * 100 / rect.width;

  vid1.currentTime = xPercent * (vidLength / 100);

  $("#info_pos").text(vid1.currentTime.toFixed());


}

slideTrack.addEventListener("click", move);

slideTrack.addEventListener("touchstart", handleStart, false);
slideTrack.addEventListener("touchend", handleEnd, false);
function handleStart(){
  slideTrack.classList.add("op-1");
}
function handleEnd(){
  slideTrack.classList.remove("op-1");
}



slideTrack.addEventListener('touchmove', function (e) {
slideTrack.classList.add("op-1");
  let changedTouch = event.changedTouches[0];
  let elem = document.elementFromPoint(changedTouch.clientX, changedTouch.clientY);
  xPercent = (changedTouch.clientX - rect.x) * 100 / rect.width;


  if (changedTouch.clientX < fin - sliderWidth && changedTouch.clientX > rect.x)

    slider.style.left = `${changedTouch.clientX - rect.x}px`;

  vid1.currentTime = xPercent * (vidLength / 100);
  $("#info_pos").text(vid1.currentTime.toFixed());


});


//window.onresize = function () {
//
//  rect = slideTrack.getBoundingClientRect();
//  fin = rect.right;
//  slider.style.left = `${(rect.width / 100) * xPercent}px`;
//
//};

window.addEventListener('orientationchange', function () {
  // After orientationchange, add a one-time resize event
  let afterOrientationChange = function () {
    rect = slideTrack.getBoundingClientRect();
    fin = Math.round(rect.right);



    let posUpdate = Math.round((rect.width / 100) * xPercent);

    if (posUpdate > (fin - sliderWidth)) {
      posUpdate = fin - sliderWidth;

    }

    slider.style.left = `${posUpdate}px`;



    // setTimeout(resize, 500);

    window.removeEventListener('resize', afterOrientationChange);
  };
  window.addEventListener('resize', afterOrientationChange);
});






let playStop2 = 0;
let playPause = $("#playPause");

function resetControles() {

  playPause.togClass("pause");
  playStop2++;

}


$('#vid1').on('ended', function () {
  resetControles();
});

$("#vid1").on("timeupdate", function () {

  $("#info_pos").text(vid1.currentTime.toFixed());
  slider.style.left = `${Math.floor((vid1.currentTime / vidLength) * 100)}%`;
  //  slider.style.left =`${inc}px`;
  console.log('slider.style.left', inc);

});


playPause.on("click", function () {

  playPause.togClass("pause");
  if (playStop2++ % 2 === 0) {
    vid1.play();

    return;
  }

  vid1.pause();


});

//window.addEventListener('resize', function () {
//    someThingChanged('resize');
//});
//
//window.addEventListener("orientationchange", function() {
//    someThingChanged('orientation');
//});
//function resize(){
//  rect = slideTrack.getBoundingClientRect();
//  fin = rect.right;
//  slider.style.left = `${(rect.width / 100) * xPercent}px`;
//   console.log('slider --> ', slider.style.left );
//  if(1==1){
//        
//      // slider.style.left > fin - rect.x;
//   
//      }
//  
//}
//function someThingChanged(value) {
//    if (value == 'resize') {
//       resize();
//    } else if (value == 'orientation') {
//        resize();
//    }
//}
