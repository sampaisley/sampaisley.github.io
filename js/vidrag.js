"use strict";

let seekBar = $("#seekBar");

let info_pos = $("#info_pos");

let playStop2 = 0;
let playPause = $("#playPause");



let vid1 = $("#vid1");

let vidLength;
let xPercent = 0;
let rect = seekBar.getRect();
let fin = rect.right;

let st = document.getElementById('stySheet');
console.log('st', st.lastModified);

//document.getElementById('topInfo').innerHTML= 'touch ' + xPercent;

let x = '';


setTimeout(afterVidLoad, 500);
// belt & braces

vid1.on('loadeddata', function () {

  if (vid1.readyState() >= 2) {

    afterVidLoad();
  }

});

function afterVidLoad() {
  x += " - " + vid1.readyState();
  $("#info_length").text(vid1.duration().toFixed(1));
  document.getElementById('topInfo').innerHTML = ' vid ' + x;
  vidLength = Math.round(vid1.duration());


}



seekBar.on("mousedown", function () {

  seekBar.on('mousemove', move).putClass('dragCurser');




});

seekBar.on("mouseup", function () {
  // document.getElementById('topInfo').innerHTML= 'up ' + xPercent;

}, true);
window.addEventListener('mouseup', function (e) {


  seekBar.off('mousemove', move).takeClass('dragCurser');


});




function move(e) {


  xPercent = Math.round((e.clientX - rect.x) * 100 / rect.width);


  if (xPercent >= 0 && xPercent <= 100) {

    seekBar.css({
      "background-size": ` ${xPercent}% 20px`
    });

    vid1.currentTime(xPercent * (vidLength / 100));

    info_pos.text(vid1.currentTime().toFixed(1));
  }


}


seekBar.on("click", move);

//seekBar.on("touchstart", handleStart);
//window.addEventListener("touchend", handleEnd, false);
//
//function handleStart() {
//  slideTrack.putClass("op-1");
//
//}
//
//function handleEnd() {
// slideTrack.takeClass("op-1");
//}


seekBar.on('touchmove', function (e) {

  let changedTouch = event.changedTouches[0];
  let elem = document.elementFromPoint(changedTouch.clientX, changedTouch.clientY);
  xPercent = Math.round((changedTouch.clientX - rect.x) * 100 / rect.width);


  if (xPercent >= 0 && xPercent <= 100) {

    seekBar.css({
      "background-size": ` ${xPercent}% 20px`
    });
    vid1.currentTime(xPercent * (vidLength / 100));
    info_pos.text(vid1.currentTime().toFixed(1));
  }




});



window.addEventListener('orientationchange', function () {
  // After orientationchange, add a one-time resize event
  let afterOrientationChange = function () {
    rect = seekBar.getRect();
    fin = Math.round(rect.right);


    if (xPercent > 100) {
      xPercent = 100;

    }
    seekBar.css({
      "background-size": ` ${xPercent}% 20px`
    });


    window.removeEventListener('resize', afterOrientationChange);
  };
  window.addEventListener('resize', afterOrientationChange);
});









function resetControles() {

  playPause.togClass("play");
  playStop2++;

}


vid1.on('ended', function () {
  resetControles();
});

vid1.on("timeupdate", function () {

  info_pos.text(vid1.currentTime().toFixed(1));
  xPercent = Math.ceil((vid1.currentTime() / vidLength) * 100);

  seekBar.css({
    "background-size": ` ${xPercent}% 20px`
  });




});


playPause.on("click", function () {

  playPause.togClass("play");
  if (playStop2++ % 2 === 0) {
    vid1.play();

    return;
  }

  vid1.pause();


});

////////// FULL SCREEN \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

let v = document.getElementById('vid1');
$("#full").on("click", function () {
  vid1.attribute();
  fullScreen(v);
});

function fullScreen(elem) {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) {
    /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) {
    /* IE11 */
    elem.msRequestFullscreen();
  }
}
vid1.on("click", function () {
  if (
    document.fullscreenElement || /* Standard syntax */
    document.webkitFullscreenElement || /* Safari and Opera syntax */
    document.msFullscreenElement /* IE11 syntax */
  )
    closeFullscreen();
});

function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    /* Safari */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    /* IE11 */
    document.msExitFullscreen();
  }
}
