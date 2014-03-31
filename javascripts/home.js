var s = document.querySelector('#mail') ;
var p = document.querySelector('#pop') ;
var cp = document.querySelectorAll('.close_pop');
var b = document.querySelectorAll('.b');
var circ = document.querySelector('.circle');

s.onclick = function () {
    for (var i = 0; i < b.length; i++) {
        b[i].classList.add('body_fade');
    }
    p.classList.add('show');
    circ.classList.add('circleFill');

}
cp[0].onclick = cp[1].onclick = function () {
    p.classList.remove('show');
    circ.classList.remove('circleFill');
    for (var i = 0; i < b.length; i++) {
        b[i].classList.remove('body_fade');
    }

}


s.classList.remove('no-js');
