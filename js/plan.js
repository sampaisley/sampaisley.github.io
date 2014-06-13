var i = 1,
plan = document.querySelector("#plan");
function initDrag(el) {
  var youAreHere = document.querySelector(el),
  draggie = new Draggabilly(youAreHere, {

    //containment: '#planImage'
  });
}
initDrag(".youAreHere0");
////// add new
document.querySelector('#add').onclick = function () {

    var newDiv = document.createElement("div");
  
    var newClassName = "youAreHere"+i++;
    newDiv.setAttribute("class", newClassName);

    plan.appendChild(newDiv);
  initDrag('.'+newClassName);
};
