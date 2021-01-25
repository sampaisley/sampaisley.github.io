"use strict";

let slider = $("#slider");
let sliderWidth = slider.getRect().width / 2;
let info_pos = $("#info_pos");

let playStop2 = 0;
let playPause = $("#playPause");

let slideTrack = $("#slideTrack");
let vid1 = $("#vid1");

let vidLength;
let xPercent = 0;
let rect = slideTrack.getRect();
let fin = rect.right;



//document.getElementById('topInfo').innerHTML= 'touch ' + xPercent;

let x=0;

function waitForVid() {
  afterVidLoad();
  
  console.log('  ', x++  );
}

// belt & braces

vid1.on('loadeddata', function () {
  console.log(vid1.readyState());


  if (vid1.readyState() >= 2) {

    afterVidLoad();
  }

});

function afterVidLoad() {

  $("#info_length").text(vid1.duration().toFixed(1));

  vidLength = Math.round(vid1.duration());


}



slider.on("mousedown", function () {

  slideTrack.on('mousemove', move);
});

slider.on("mouseup", function () {
// document.getElementById('topInfo').innerHTML= 'up ' + xPercent;
  
},true);
window.addEventListener('mouseup', function (e) {
  document.getElementById('topInfo').innerHTML= 'up ' + e.clientX;
 slideTrack.takeClass("op-1");
  
 
  slideTrack.off('mousemove', move);


});




function move(e) {


  xPercent = Math.round((e.clientX - rect.x) * 100 / rect.width);
 

  if (xPercent >= 0 && xPercent <= 100) {

    slider.style("left", `${xPercent}%`);


    vid1.currentTime(xPercent * (vidLength / 100));

    info_pos.text(vid1.currentTime().toFixed(1));
  }


}

slideTrack.on("click", move);

slideTrack.on("touchstart", handleStart);
window.addEventListener("touchend", handleEnd, false);

function handleStart() {
  slideTrack.putClass("op-1");

}

function handleEnd() {
 slideTrack.takeClass("op-1");
}


slider.on('touchmove', function (e) {

  let changedTouch = event.changedTouches[0];
  let elem = document.elementFromPoint(changedTouch.clientX, changedTouch.clientY);
  xPercent = Math.round((changedTouch.clientX - rect.x) * 100 / rect.width);
  

  if (xPercent >= 0 && xPercent <= 100) {

    slider.style("left", `${xPercent}%`);
    vid1.currentTime(xPercent * (vidLength / 100));
    info_pos.text(vid1.currentTime().toFixed(1));
  }




});



window.addEventListener('orientationchange', function () {
  // After orientationchange, add a one-time resize event
  let afterOrientationChange = function () {
    rect = slideTrack.getRect();
    fin = Math.round(rect.right);


    if (xPercent > 100) {
      xPercent = 100;

    }

    slider.style("left", ` ${xPercent}%`);

     window.removeEventListener('resize', afterOrientationChange);
  };
  window.addEventListener('resize', afterOrientationChange);
});









function resetControles() {

  playPause.togClass("pause");
  playStop2++;

}


vid1.on('ended', function () {
  resetControles();
});

vid1.on("timeupdate", function () {

  info_pos.text(vid1.currentTime().toFixed(1));
  xPercent = Math.floor((vid1.currentTime() / vidLength) * 100);
  slider.style("left", ` ${xPercent}%`);



});


playPause.on("click", function () {

  playPause.togClass("pause");
  if (playStop2++ % 2 === 0) {
    vid1.play();

    return;
  }

  vid1.pause();


});
