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



//document.getElementById('topInfo').innerHTML= 'touch ' + xPercent;

let x=0;

function waitForVid() {
  afterVidLoad();
  
}
setTimeout(afterVidLoad,500);
// belt & braces

vid1.on('loadeddata', function () {
  console.log(vid1.readyState());


  if (vid1.readyState() >= 2) {

    afterVidLoad();
  }

});

function afterVidLoad() {

  $("#info_length").text(vid1.duration().toFixed(1));
  console.log('vid1.duration()', vid1.duration());
document.getElementById('topInfo').innerHTML= 'vid ' + (++x);
  vidLength = Math.round(vid1.duration());


}



seekBar.on("mousedown", function () {

  seekBar.on('mousemove', move);
});

seekBar.on("mouseup", function () {
// document.getElementById('topInfo').innerHTML= 'up ' + xPercent;
  
},true);
//window.addEventListener('mouseup', function (e) {
// 
// slideTrack.takeClass("op-1");
//  
// 
//  slideTrack.off('mousemove', move);
//
//
//});




function move(e) {


  xPercent = Math.round((e.clientX - rect.x) * 100 / rect.width);
 

  if (xPercent >= 0 && xPercent <= 100) {

     seekBar.css({ "background-size": ` ${xPercent}% 20px`});
    console.log('xPercent', xPercent);


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

    seekBar.css({ "background-size": ` ${xPercent}% 20px`});
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
 seekBar.css({ "background-size": ` ${xPercent}% 20px`});
   

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
  xPercent = Math.ceil((vid1.currentTime() / vidLength) * 100);
 
  seekBar.css({ "background-size": ` ${xPercent}% 20px`});
 



});


playPause.on("click", function () {

  playPause.togClass("pause");
  if (playStop2++ % 2 === 0) {
    vid1.play();

    return;
  }

  vid1.pause();


});
