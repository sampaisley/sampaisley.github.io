var s = document.querySelector('#mail') ;
var p = document.querySelector('#pop') ;
var cp = document.querySelectorAll('.close_pop');
var b = document.querySelectorAll('.b');
var circ = document.querySelector('.circle');

s.onclick = function () {
    for (var i = 0; i < b.length; i++) {
        b[i].classList.add('_fade_out');
        b[i].classList.remove('_fade_in');
    }
    p.classList.add('show');
    //p.classList.remove("hide") ;
    circ.classList.add('circleBorder');

}
s.onmouseover = function(){
    circ.classList.add('fat');
    circ.classList.remove('finn');
}
s.onmouseout = function(){
    circ.classList.add('finn');
    circ.classList.remove('fat');

}
cp[0].onclick = cp[1].onclick = function () {
    p.classList.remove('show');
   //p.classList.add('hide');
    circ.classList.remove('circleBorder');
    for (var i = 0; i < b.length; i++) {
        b[i].classList.remove('_fade_out');
        b[i].classList.add('_fade_in');
    }

}


s.classList.remove('no-js');
