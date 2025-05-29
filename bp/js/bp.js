"use strict";

Storage.prototype.setObj = function (key, obj) {
  return this.setItem(key, JSON.stringify(obj));
};
Storage.prototype.getObj = function (key) {
  return JSON.parse(this.getItem(key));
};
let sysList;
let diaList;
let datList;
let counter;
let sysTotal = 0;
let diaTotal = 0;
let startFrom;
let endAt;
const today = new Date();
const dialog = document.querySelector("dialog");



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

// datList = [];
// localStorage.setObj('datStore',datList );

if (localStorage.getObj("datStore")) {
  datList = localStorage.getObj("datStore");
  datList.length = localStorage.getObj("diaStore").length;
} else {
  datList = [];
  datList.length = diaList.length;
  
}



datList.forEach(function(item, index, array) {
 if(item == null){
  datList[index] = "-";
 }
    
});



$("#sys").val("").focus();
$("#dia").val("");

$("#sys").on("keyup", function () {
  if (this.value.length == 3) {
    $("#dia").focus();
  }
});


function closeDialog(e){
  
reset();
  dialog.close();
  console.log(73);
 
 dialog.removeEventListener('mousedown', closeDialog);
}


function showData(startFrom, endAt) {

  let i = 0;

  if(startFrom){
    i = startFrom;
    
    
  }
   
  if(endAt){
    counter = endAt+1 ;
    
   
  }
  if (counter && counter >0) {

    $("#list").html("");
    $("dialog").html("");
    for (; i < counter; i++) {
     

     
      $("#list").append(`<li class="foo">${sysList[i]} - ${diaList[i]}  	&rarr; <img src = "img/delete.svg" data-del="${i}"> ${datList[i]}<input type="checkbox" data_i="${i}" name="dat" id=""></li>`);
     
      sysTotal += parseInt(sysList[i]);
     
      
      diaTotal += parseInt(diaList[i]);
    }
   if(endAt>0){
    $("dialog").append(`<h4>Average</h4><p>${parseInt(sysTotal / (endAt - startFrom+1))} - ${parseInt(diaTotal / (endAt - startFrom+1))}</p>`);
   }else{
    $("dialog").append(`<h4>Average</h4><p>${parseInt(sysTotal / counter)} - ${parseInt(diaTotal / counter)}</p>`);
   }
    

    sysTotal = diaTotal = 0;
  }


  dialog.showModal();

   dialog.addEventListener("mousedown", closeDialog);

}

showData();


///////////////////// Add Record  \\\\\\\\\\\\\\\\\\\\\\\\\\\

$("#add_record").click(function (e) {

 e.preventDefault();

  if ($("#sys").val().length > 1 && $("#dia").val().length > 1) {
   // $("#display").append(`<li>${$("#sys").val()} - ${$("#dia").val()}</li>`);

   let day = today.getDate();
   let month = today.getMonth()+1;// zero indexed
    
    datList.push([day,month]);
    sysList.push($("#sys").val());
    diaList.push($("#dia").val());

    localStorage.setObj('sysStore',sysList );
    localStorage.setObj('diaStore',diaList );
    localStorage.setObj('datStore',datList );
  

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
    datList.splice([e.target.getAttribute("data-del")], 1);

    localStorage.setObj("sysStore", sysList);
    localStorage.setObj("diaStore", diaList);
    localStorage.setObj("datStore", datList);

    counter = localStorage.getObj("sysStore").length;

    showData();
    if(counter==0){ //showData() won't run
      $("#list").html("");
      $("dialog").html("");
    }

   }
  }

  

});







////// checkboxes   \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
//let clickedBoxes=[];
$("#list").on("click",".foo",(function (e) {
  

  
 
 let k = document.querySelectorAll('ul input[type="checkbox"]:checked').length;
 

 if (k == 1) {
   startFrom = parseInt(e.target.getAttribute("data_i"));
 }

 if (k == 2) {
   endAt = parseInt(e.target.getAttribute("data_i"));

   showData(startFrom, endAt);

   $("dialog").append("<span class='reset'>Reset<span>");
   
 } 
  
  
  
  /* 
  if (e.target.checked) {
    clickedBoxes.push(e.target.getAttribute("data_i"));

    //clickedBoxes.sort();
    //clickedBoxes = clickedBoxes.slice(-2);
    //  if(clickedBoxes.length>2){
    //   clickedBoxes.pop();
    //  }
    console.log(
      "%c clickedBoxes:",
      "color: #0e93e0;background: #aaefe5;",
      clickedBoxes
    );
  } */
}));

/* 
window.addEventListener("click", function(e){
  console.log('%c e:', 'color: #0e93e0;background: #aaefe5;', e);

}); */

let reset = () =>{
  startFrom = '';
  endAt = '';
  counter = sysList.length;
  showData();
};

/* $("dialog").on("click", function () {
  reset();console.log(252);
}); */



