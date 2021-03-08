"use strict";

let seekBar = $("#seekBar");

let info_pos = $("#info_pos");

let playStop2 = 0;
let playPause = $("#playPause");



let vid1 = $("#vid1");

let vidLength;
let hours = 0;
let mins = 0;
let secs = 0;
let xPercent = 0;
let rect = seekBar.getRect();
let infoRect = $("#vid").getRect();

let fin = rect.right;

let seekBg = 1.5;

if (infoRect.bottom > screen.height) {
  $("#info").putClass('d-none');
} else {
  $("#info").takeClass('d-none');
}

//document.getElementById('topInfo').innerHTML= 'touch ' + xPercent;

let x = '';


setTimeout(afterVidLoad, 500);
// belt & braces

vid1.on('loadeddata', function () {

  if (vid1.readyState() >= 2) {

    afterVidLoad('dataload ');
  }

});

function afterVidLoad(n = "time ") {

  x += n + " - " + vid1.readyState() + ' ';
  $("#info_length").text(vid1.duration().toFixed(1));
 // document.getElementById('topInfo').innerHTML = ' vid ' + x;
  vidLength = Math.round(vid1.duration());

  if (vidLength > 60) {
    mins = Math.round(vidLength / 60);
    secs = vidLength % 60;

    $("#info_length").text(mins + ' : ' + secs);
  }


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
      "background-size": ` ${xPercent}% ${seekBg}em`
    });
    console.log('%c  xPercent:', 'color: #0e93e0;background: #aaefe5;', xPercent);

    vid1.currentTime(xPercent * (vidLength / 100));

    info_pos.text(vid1.currentTime().toFixed(1));
  }


}


seekBar.on("click", move);



seekBar.on('touchmove', function (e) {

  let changedTouch = event.changedTouches[0];
  let elem = document.elementFromPoint(changedTouch.clientX, changedTouch.clientY);
  xPercent = Math.round((changedTouch.clientX - rect.x) * 100 / rect.width);


  if (xPercent >= 0 && xPercent <= 100) {

    seekBar.css({
      "background-size": ` ${xPercent}% ${seekBg}em`
    });
    vid1.currentTime(xPercent * (vidLength / 100));
    info_pos.text(vid1.currentTime().toFixed(1));
  }




});

//let mql = window.matchMedia('(orientation:portrait)');
//
//mql.addEventListener("change",OrientChange);

$().window("resize", OrientChange);

 
  function OrientChange() {
    console.log('OrientChange');
    rect = seekBar.getRect();
    fin = Math.round(rect.right);

//
//    if (xPercent > 100) {
//      xPercent = 100;
//
//    }
    seekBar.css({
      "background-size": ` ${xPercent}% ${seekBg}em`
    });



  }
 










function resetControles() {

  playPause.text("Play");
  playStop2++;

}


vid1.on('ended', function () {
  resetControles();
});

vid1.on("timeupdate", function () {
  

  //   info_pos.text(vid1.currentTime().toFixed());
  xPercent = Math.ceil((vid1.currentTime() / vidLength) * 100);

  seekBar.css({
    "background-size": ` ${xPercent}% ${seekBg}em`
  });


  mins = Math.floor(vid1.currentTime() / 60);
  secs = (vid1.currentTime() % 60).toFixed(1);
  info_pos.text(mins + ' : ' + secs);


  //   secs = (vid1.currentTime() % 60).toFixed();
  //      mins = ((vid1.currentTime() / 60) % 60).toFixed();
  //  info_pos.text(mins + ' : ' + secs);


});


playPause.on("click", function () {

//  playPause.togClass("play");
  if (playStop2++ % 2 === 0) {
    vid1.play();
    playPause.text("Pause");

    return;
  }
  playPause.text("Play");
  vid1.pause();


});

////////// FULL SCREEN \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\


$("#full").on("click", function () {

  fullScreen(document.getElementById('vid1'));
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
