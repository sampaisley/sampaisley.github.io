"use strict";
Storage.prototype.setObj = function(key, obj) {
    return this.setItem(key, JSON.stringify(obj));
  };
  Storage.prototype.getObj = function(key) {
    return JSON.parse(this.getItem(key));
  };
  
  //build the boxes
let topRow=['q','w','e','r','t','y','u','i','o','p'];  
let midRow=['a','s','d','f','g','h','j','k','l']; 
let lowRow=['Enter','z','x','c','v','b','n','m','Backspace']; 

let container = document.getElementById("container");
for (let i = 0; i < 30; i++) {
  container.innerHTML += '<div class="box">&nbsp;</div>';
}
const alertzDiv = document.createElement("div");
alertzDiv.id='alert';
alertzDiv.classList.add('alert');
alertzDiv.classList.add('d-none');


const kboardTop = document.createElement("div");
kboardTop.id="kBoardTop";

const kboardMid = document.createElement("div");
kboardMid.id="kBoardMid";

const kboardLow = document.createElement("div");
kboardLow.id="kBoardLow";

kboardTop.innerHTML += '<div id="topRow">';

for (let i = 0; i < 10; i++) {
    kboardTop.innerHTML += `<div data-l='${topRow[i]}' class="pad top">${topRow[i]}</div>`;
  }
  kboardTop.innerHTML += '</div>';

  kboardMid.innerHTML += '<div id="midRow">';

 for (let i = 0; i < 9; i++) {
    kboardMid.innerHTML += `<div data-l='${midRow[i]}' class="pad mid">${midRow[i]}</div>`;
  }
  kboardMid.innerHTML += '</div>';

  kboardLow.innerHTML += '<div id="lowRow">';
  for (let i = 0; i < 9; i++) {
      if(i==0){
        kboardLow.innerHTML += `<div id='enter' data-l='${lowRow[i]}' class="padLong low">${lowRow[i]}</div>`;
      }else if(i==8){
        kboardLow.innerHTML += `<div id='back' data-l='${lowRow[i]}' class="padLong low">&#8592;</div>`;
      }else
    kboardLow.innerHTML += `<div data-l='${lowRow[i]}' class="pad low">${lowRow[i]}</div>`;
  }

  kboardLow.innerHTML += '</div>';


 container.after(kboardTop);
 kboardTop.after(kboardMid);
 kboardMid.after(kboardLow);
 kboardLow.after(alertzDiv);

let box = 0;
let start = 0;
let end = start + 5;
let boxes = document.querySelectorAll(".box");
//let keys= ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];


const keys = (() => {
  
  const caps = [...Array(26)].map((val, i) => String.fromCharCode(i + 65));
  return caps.concat(caps.map(letter => letter.toLowerCase()));
})();//https://gist.github.com/bendc/1e6af8f2d8027f2965da


const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
const firstDate = new Date(' Feb 06 2022').setHours(0,0,0,0);
const secondDate = new Date().setHours(0,0,0,0);
const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));

let theWord = Array.from(wordList[diffDays]);
//let theWord = Array.from('focal');
let copy = Array.from(theWord);
let wordLength = 5;
let inputWord =[];
let rowPad = 0;
//let row=0;
let lettersCorect=0;
let enterKeyWorks = false;


let greenKeys=[];
let blackKeys=[];
let orangeKeys = [];

let score = localStorage.getObj('storeScore') || { gamesPlayed: 0, level: 0 };


            

window.onkeydown =  (e) =>{
  
  if(e.key == "Enter"){
  enterPressed(e.key);
  }
  
    makeWord(e.key);

};

/* window.onkeyup = (e) => {
    
    enterPressed(e.key);
};
 */

function makeWord(l){
       //l = l.toLowerCase();
    if (keys.indexOf(l) != -1 && box < end) {
        if(box>29 || lettersCorect>=wordLength)return;
        

        if(box%wordLength==0){enterKeyWorks=true;}
       
       
         boxes[box].classList.add('darkBorder');
         boxes[box++].innerHTML = l;
     
         inputWord.push(l.toLowerCase()) ;
      
    }
 
  if (l == "Backspace" && box > start) {
    

      inputWord.pop();
    
      
        boxes[--box].innerHTML = "";
        
        boxes[box].classList.remove('darkBorder');
    
    
  }
}


function enterPressed(z){
 if(rowPad >25)return;
  if(inputWord.length && inputWord.length < wordLength){
    
    alertz('Word too short', 1200);
    return;
  }
  if(!isInWordList() && inputWord.length && inputWord.length == wordLength){
    alertz("Not in word list.", 1200);
    return;}
    if (z == "Enter" && box % wordLength == 0 && box <= boxes.length && enterKeyWorks) {
     
        enterKeyWorks = !enterKeyWorks;

        start += 5;
        end += 5;
        checkWord();

    }
}


function checkWord(){
 
  //if(! isInWordList())return;
  

   
  copy = Array.from(theWord);
  
  

  inputWord.forEach((item, index, array) => {

    if (inputWord[index] == theWord[index]) {

        greenKeys.push(inputWord[index]);

      boxes[index + rowPad].classList.add("green");
      copy[index] = null;
      inputWord[index] = "*";


      if (lettersCorect++ == wordLength-1) {
        winner();
      } 

      



    } else {
      boxes[index + rowPad].classList.add("black");
      blackKeys.push(inputWord[index]);
      lettersCorect = 0;
    }
  });

  orange();
  inputWord.length= 0;
  rowPad+=5;

  setKeyCoulors();


  //faild
  if(lettersCorect <wordLength-1 && box >boxes.length-1){

    score.level = 0 ;
     score.gamesPlayed++;
    localStorage.setObj("storeScore", score);
    let s = localStorage.getObj("storeScore");
       
    setTimeout(() => alertz(`Never mind dear, the word is ' ${theWord.join('').toUpperCase()}
    You scored: ${s.level}
    games played: ${s.gamesPlayed}`), 1000); 
}

}

function orange() {

  for (let i = 0; i < wordLength; i++) {
    let n = copy.indexOf(inputWord[i]);
  
    if (n != -1) {
      boxes[i + rowPad].classList.add("yellow");
      orangeKeys.push(inputWord[i]);
      copy[n] = "]";
    }
  }

}


function isInWordList(){
  let inpw = inputWord.join("");
      if (!wordList.includes(inpw) && !Ta.includes(inpw)) {
        return false;
      }
      return true;
}

function winner(){
     score.gamesPlayed++;
        score.level = rowPad + wordLength ;
        localStorage.setObj("storeScore", score);
        let s = localStorage.getObj("storeScore");
        alertz(`Well done dear,
               games played: ${s.gamesPlayed},
               Score: ${s.level}`);
        return;
}



/////////////// key board \\\\\\\\\\\\\\\\\\\



let pads = document.querySelectorAll('.pad');
function setKeyCoulors(){
for(let i=0;i< pads.length;i++){

    if(blackKeys.includes(pads[i].getAttribute('data-l'))){
        
        pads[i].classList.add('blackKey');

    }

    if(orangeKeys.includes(pads[i].getAttribute('data-l'))){
        pads[i].classList.remove('blackKey');
        pads[i].classList.add('orangeKey');

    } if(greenKeys.includes(pads[i].getAttribute('data-l'))){
        
        pads[i].classList.remove('blackKey');
        pads[i].classList.remove('orangeKey');
        pads[i].classList.add('greenKey');
    }
}
}


let letter;
window.addEventListener("click", (e) => {
  if (e.target.hasAttribute("data-l")) {
    letter = e.target.getAttribute("data-l");
    makeWord(letter);
  }

  if (letter == "Enter") {
    enterPressed(letter);
  }
});


////////////////////////////////////////////////////////////////////////////////////////


function alertz(tx,duration){

  alertzDiv.classList.remove('d-none');
  $('#alert').fadeUp(50, function closeAlertz(){console.log('foo');});
  alertzDiv.innerHTML=`<h1 class="alert">${tx}</h1>`;


  if(duration)
  setTimeout(closeAlertz,duration);
}



window.addEventListener('click',function(e){
  if(e.target.classList.contains("alert")){
    
  closeAlertz();

  }
} );

function closeAlertz() {
  $("#alert").fade(50, false, function closeAlertz() {
    alertzDiv.classList.add("d-none");
    alertzDiv.innerHTML = ``;
  });
}

