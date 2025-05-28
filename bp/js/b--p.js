"use strict";
Storage.prototype.setObj = function (key, obj) {
  return this.setItem(key, JSON.stringify(obj));
};
Storage.prototype.getObj = function (key) {
  return JSON.parse(this.getItem(key));
};
let sysList;
let diaList;
let counter;
let sysTotal = 0;
let diaTotal = 0;
let listVisable = true;


if (localStorage.getObj("sysStore")) {
  counter = localStorage.getObj("sysStore").length;
  sysList = localStorage.getObj("sysStore");
} else {
  sysList = [];
  counter = [];
}

if (localStorage.getObj("diaStore")) {
  diaList = localStorage.getObj("diaStore");
} else {
  diaList = [];
}

 

$("#sys").val("").focus();
$("#dia").val("");

$("#sys").on("keyup", function () {
  if (this.value.length == 3) {
    $("#dia").focus();
  }
});


function showData() {

  if (counter && counter >0) {

    $("#list").html("");
    $("#average").html("");
    for (let i = 0; i < counter; i++) {

      if(listVisable){
      $("#list").append(`<li class="foo">${sysList[i]} - ${diaList[i]}  	&rarr; <img src = "img/delete.svg" data-del="${i}"></li>`);
      }
      sysTotal += parseInt(sysList[i]);
      
      diaTotal += parseInt(diaList[i]);
    }
    $("#average").append(`<h4>Average</h4><li>${parseInt(sysTotal / counter)} - ${parseInt(diaTotal / counter)}</li>`);

    sysTotal = diaTotal = 0;
  }


}

showData();
console.log(77);


$("#add_record").click(function (e) {

 e.preventDefault();

  if ($("#sys").val().length > 1 && $("#dia").val().length > 1) {
   // $("#display").append(`<li>${$("#sys").val()} - ${$("#dia").val()}</li>`);

    sysList.push($("#sys").val());
    diaList.push($("#dia").val());

    localStorage.setObj('sysStore',sysList );
    localStorage.setObj('diaStore',diaList );
  

    $("#sys").val("").focus();
    $("#dia").val("");

    counter = localStorage.getObj("sysStore").length;

    showData();
    
  }
});


let mod = 0;
//  DELETE record \\\\\\\\\\\\\\\\\\\\
$(window).click(function (e) {
  
  if (e.target.nodeName == "IMG") {
    e.preventDefault();
    if (window.confirm("Really?")) {
    
    sysList.splice([e.target.getAttribute("data-del")], 1);
    diaList.splice([e.target.getAttribute("data-del")], 1);

    localStorage.setObj("sysStore", sysList);
    localStorage.setObj("diaStore", diaList);

    counter = localStorage.getObj("sysStore").length;

    showData();
    if(counter==0){ //showData() won't run
      $("#list").html("");
      $("#average").html("");
    }

   }
  }

  

});



$("#showList").click(function () {
  if ($("#showList").is(":checked")) {
    listVisable = false;
  } else {
    listVisable = true;
  }
 
  showData();

  
});


