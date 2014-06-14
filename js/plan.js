var i = 1,del= false,
plan = document.querySelector("#plan"),
select = document.querySelector("#select"),
selectedItem ='youAre';
function initDrag(el) {
  var youAreHere = document.querySelector(el),
  draggie = new Draggabilly(youAreHere, {

    //containment: '#planImage'
  });
}
initDrag(".youAreHere0");
////// add new
document.querySelector('#add').onclick = function () {

    var newDiv = document.createElement("p"),
    newClassName;
  if (selectedItem === "youAre") {
    newClassName = "youAreHere" + i++;
  } else if (selectedItem === "Hydrent") {
    newClassName = "hydrent" + i++;
  }else if (selectedItem === "smoke") {
    newClassName = "smoke" + i++;
  }else if (selectedItem === "smoke_e") {
    newClassName = "smoke_e" + i++;
  }else if (selectedItem === "firePoint") {
    newClassName = "firePoint" + i++;
  }
  newDiv.setAttribute("class", newClassName);

  plan.appendChild(newDiv);
  initDrag('.' + newClassName);
  };
  ///////////////////// select

select.onchange=function () {
  console.log(this.value);
  selectedItem=this.value;
}
 /// z key down
  window.onkeydown = function(e) {
  // console.log(e.which);
  if(e.which===90){del=true;}
  e.target.classList.add("beGone");
};
  window.onkeyup  = function(e) {
     del=false;
     e.target.classList.remove("beGone");
  };

plan.onclick = function (e) {
  if(del && e.target.nodeName==="P"){
    e.target.classList.remove("beGone");
    plan.removeChild(e.target);
  }
};

plan.onmouseover = function (e) {
  if(del && e.target.nodeName==="P"){
    e.target.classList.add("beGone");
  }
};
plan.onmouseout = function (e) {
  //if(){
    e.target.classList.remove("beGone");
  //}
};
