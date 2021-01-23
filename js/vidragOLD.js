"use strict";

let slider = document.getElementById("slider");
let sliderWidth = slider.getBoundingClientRect().width / 2;
let info_pos = $("#info_pos");

let slideTrack = document.getElementById("slideTrack");
let vid1 = document.getElementById("vid1");

let vidLength;
let xPercent = 0;
let rect = slideTrack.getBoundingClientRect();
let fin = rect.right;
let inc;

//document.getElementById('topInfo').innerHTML= 'touch ' + xPercent;

setTimeout(waitForVid, 1);

function waitForVid() {
 afterVidLoad();
}

// belt & braces
let v1 = $("#vid1");
vid1.addEventListener('loadeddata', function () {
  
  

  if (vid1.readyState >= 2) {
    
    console.log(v1.duration()  );
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




function move(e) {
  
  xPercent = Math.round((e.clientX - rect.x) * 100 / rect.width);
  
  if (xPercent >= 0 && xPercent <= 100){

 slider.style.left = `${xPercent}%`;

  vid1.currentTime = xPercent * (vidLength / 100);

  info_pos.text(vid1.currentTime.toFixed());
  }


}

slideTrack.addEventListener("click", move);

slideTrack.addEventListener("touchstart", handleStart, false);
window.addEventListener("touchend", handleEnd, false);
function handleStart(){
  slideTrack.classList.add("op-1");
 
}
function handleEnd(){
  slideTrack.classList.remove("op-1");
 
}



slideTrack.addEventListener('touchmove', function (e) {

  let changedTouch = event.changedTouches[0];
  let elem = document.elementFromPoint(changedTouch.clientX, changedTouch.clientY);
  xPercent = Math.round((changedTouch.clientX - rect.x) * 100 / rect.width);

  if (xPercent >= 0 && xPercent <= 100) {
    
     slider.style.left = `${xPercent}%`;
     vid1.currentTime = xPercent * (vidLength / 100);
     info_pos.text(vid1.currentTime.toFixed());
  }

   


});



window.addEventListener('orientationchange', function () {
  // After orientationchange, add a one-time resize event
  let afterOrientationChange = function () {
    rect = slideTrack.getBoundingClientRect();
    fin = Math.round(rect.right);



    let posUpdate = Math.round((rect.width / 100) * xPercent);

    if (xPercent > 100) {
      xPercent = 100;

    }

    slider.style.left = `${xPercent}%`;





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

  info_pos.text(vid1.currentTime.toFixed());
  slider.style.left = `${Math.floor((vid1.currentTime / vidLength) * 100)}%`;
  //  slider.style.left =`${inc}px`;
 

});


playPause.on("click", function () {

  playPause.togClass("pause");
  if (playStop2++ % 2 === 0) {
    vid1.play();

    return;
  }

  vid1.pause();


});


