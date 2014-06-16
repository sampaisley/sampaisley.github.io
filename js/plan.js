var i = 0,del= false,Draggabilly,
plan = document.querySelector("#plan"),
select = document.querySelector("#select"),
selectedItem ='youAre';
function initDrag(el) {
  var youAreHere = document.querySelector(el),
  draggie;
  draggie = new Draggabilly(youAreHere, {

    //containment: '#planImage'
  });
}

//initDrag(".youAreHere0");
////// add new
var add = function() {
if(i>=30){i=0;}
    var newDiv = document.createElement("p"),
    newClassName;

  switch (selectedItem) {
  case "youAre":
    newClassName = "youAreHere" + i++;
    newDiv.innerHTML = "<p class='inner'></p>";
    break;
  case "Hydrent":
    newClassName = "hydrent" + i++;
    break;
  case "smoke":  newClassName = "smoke" + i++;
    break;
  case "smoke_e": newClassName= "smoke_e" + i++;
    break;
  case "firePoint": newClassName = "firePoint" + i++;
    break;
  }


  newDiv.setAttribute("class", newClassName);

  plan.appendChild(newDiv);
  initDrag('.' + newClassName);
};


  document.querySelector('#add').onclick = add;

  ///////////////////// select

select.onchange=function () {

  selectedItem=this.value;
  add();
};
 /// z key down
  window.onkeydown = function(e) {
  // console.log(e.which);
  if(e.which===90){del=true;}
  if(e.target.nodeName==="P"){
  e.target.classList.add("beGone");
}
};
  window.onkeyup  = function(e) {
     del=false;
     e.target.classList.remove("beGone");
  };

plan.onclick = function (e) {
  if(del && e.target.nodeName==="P"){
    e.target.classList.remove("beGone");
    if (e.target.className==='inner') {//nested p elements
      e.target.parentElement.parentElement.removeChild(e.target.parentElement);i--;
    }else{
      e.target.parentElement.removeChild(e.target);i--;
    }

  }
};

plan.onmouseover = function (e) {
  if(del && e.target.nodeName==="P"){
    e.target.classList.add("beGone");
  }
};
plan.onmouseout = function (e) {
  if(del && e.target.nodeName==="P"){
    e.target.classList.remove("beGone");
    e.target.parentElement.removeChild(e.target);i--;
  }
};
