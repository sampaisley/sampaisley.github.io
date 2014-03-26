var s = document.querySelector('#mail') ;
var p = document.querySelector('#pop') ;
var cp = document.querySelectorAll('.close_pop');
var b = document.querySelectorAll('.b');
s.onclick = function () {
    for (var i = 0; i < b.length; i++) {
        b[i].classList.add('body_fade');
    }
    p.classList.add('show');

}
cp[0].onclick = cp[1].onclick = function () {
    p.classList.remove('show');
    for (var i = 0; i < b.length; i++) {
        b[i].classList.remove('body_fade');
    }

}