"use strict";





Storage.prototype.setObj = function(key, obj) {
    return this.setItem(key, JSON.stringify(obj));
  };
  Storage.prototype.getObj = function(key) {
    return JSON.parse(this.getItem(key));
  };
  




  //build the boxes & keyboard
(function makeTheThing(){
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

const kboard = document.createElement("div");
kboard.id="kbord";
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
        kboardLow.innerHTML += `<div id='enter' data-l='${lowRow[i]}' class="padLong low"><img id="enterIcon"  data-l='${lowRow[i]}' src="svg/ent.svg" /></div>`;
      }else if(i==8){
        kboardLow.innerHTML += `<div id='back' data-l='${lowRow[i]}' class="padLong low"><img id="backIcon"  data-l='${lowRow[i]}' src="svg/back.svg" /></div>`;
      }else
    kboardLow.innerHTML += `<div data-l='${lowRow[i]}' class="pad low">${lowRow[i]}</div>`;
  }

  kboardLow.innerHTML += '</div>';


 container.after(kboard);
 kboard.append(kboardTop);
 kboardTop.after(kboardMid);
 kboardMid.after(kboardLow);
 kboardLow.after(alertzDiv);

})();

let boxes = document.querySelectorAll(".box");

const keys = (() => {
  
  const caps = [...Array(26)].map((val, i) => String.fromCharCode(i + 65));
  return caps.concat(caps.map(letter => letter.toLowerCase()));
})();//https://gist.github.com/bendc/1e6af8f2d8027f2965da


const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
const firstDate = new Date(' Feb 19 2022').setHours(0,0,0,0);
const today = new Date().setHours(0,0,0,0);
const diffDays = Math.round(Math.abs((firstDate - today) / oneDay));


let theWord = Array.from(wordList[diffDays]);
//let theWord = Array.from('model');
let copy = Array.from(theWord);
let wordLength = 5;
let inputWord =[];
let triedWords = localStorage.getObj("triedWords") || [];


$("#list").text(wordList[diffDays]); // show the word on  screen

//let row=0;
let lettersCorect=0;
let enterKeyWorks = false;
let savedClasses = localStorage.getObj('savedClasses') || [];

let pads = document.querySelectorAll('.pad');



let greenKeys=[];
let blackKeys=[];
let orangeKeys = [];



let score = localStorage.getObj("storeScore") || {
  gamesPlayed: 0,
  level: 0,
  pastLevels: [],
  lastPlayed: today,
  streak: 1,
  maxStreak: 1,
  gameOver: false
};

if (score.lastPlayed != today) {

  triedWords = [];
  savedClasses = [];

  localStorage.setObj("triedWords", null);
  localStorage.setObj("savedClasses", null);
  localStorage.setObj("blakKeys", null);
  localStorage.setObj("greenKeys", null);
  localStorage.setObj("orangeKeys", null);
  localStorage.removeItem("box");
  localStorage.removeItem("start");
  localStorage.removeItem("end");
  localStorage.removeItem("rowPad");

} else {

  setClasses();

}

let box= parseInt(localStorage.getItem("box")) || 0;
let start = parseInt(localStorage.getItem("start")) || 0;
let end = parseInt(localStorage.getItem("end")) || start + wordLength;
let rowPad = parseInt(localStorage.getItem("rowPad")) || 0;

// reset box on page reload.  ie:  command + R pressed , adding 1 to box
if(box > 0 && box+1%wordLength !=0){
  box -= box%rowPad;
 
  
}


window.onkeydown =  (e) =>{
  
  if(score.gameOver == 1)return;
  
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
         localStorage.setItem("box", box);
     
         inputWord.push(l.toLowerCase()) ;
      
    }
 
  if (l == "Backspace" && box > start) {
    

      inputWord.pop();
    
      
        boxes[--box].innerHTML = "";
        localStorage.setItem("box", box);
        
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
        localStorage.setItem("start", start);
        end += 5;
        localStorage.setItem("end", end);

        checkWord();

       
        

    }
}

function checkWord() {

  copy = Array.from(theWord);

  triedWords.push(Array.from(inputWord));
  localStorage.setObj("triedWords", triedWords);
  
  


  inputWord.forEach((item, index, array) => {


    /// GREEN \\\\\\\\\\\\\\\
    if (inputWord[index] == theWord[index]) {

      greenKeys.push(inputWord[index]);
      savedClasses[index + rowPad]="green";
      localStorage.setObj("savedClasses", savedClasses);
      localStorage.setObj("greenKeys", greenKeys);

     // boxes[index + rowPad].classList.add("green");
      copy[index] = null;
      inputWord[index] = "*";

      if (lettersCorect++ == wordLength - 1) {
       
        winner();

      }

    } else {
       
      //// BLACK  \\\\\\\\\\\\\\\\\\\\\\
      //boxes[index + rowPad].classList.add("black");
      blackKeys.push(inputWord[index]);
      savedClasses[index + rowPad]="black";
      localStorage.setObj("savedClasses", savedClasses);
      localStorage.setObj("blakKeys", blackKeys);
      lettersCorect = 0;

    }
  });

  orange();
  inputWord.length = 0;
  rowPad += 5;
  
 
  
  localStorage.setItem("rowPad",rowPad);
  score.lastPlayed = new Date().setHours(0,0,0,0);
  localStorage.setObj("storeScore", score);


  setKeyCoulors();

  //failed
  if (lettersCorect < wordLength - 1 && box > boxes.length - 1) {

    failed();
lettersCorect = 0;
  }
  setClasses();
}

function orange() {

  for (let i = 0; i < wordLength; i++) {
    let n = copy.indexOf(inputWord[i]);
  
    if (n != -1) {
      //boxes[i + rowPad].classList.add("yellow");
      savedClasses[i + rowPad]="yellow";
      localStorage.setObj("savedClasses", savedClasses);
      orangeKeys.push(inputWord[i]);
      localStorage.setObj("orangeKeys", orangeKeys);
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


function winner() {

  score.gameOver = 1;
  
  if (localStorage.getObj("storeScore") !== null) {

    let lastPl = new Date(localStorage.getObj("storeScore").lastPlayed).setHours(0, 0, 0, 0);// month is zero indexed
    let dd = Math.round(Math.abs((today - lastPl) / oneDay));
    if(dd ===1){
      score.streak++;
    

      if (score.streak >= score.maxStreak) {
        
        score.maxStreak = score.streak;
      }

    }else{
      score.streak=1;
    }
  
  }
 
  score.gamesPlayed++;
  score.level = rowPad / wordLength + 1;
  score.pastLevels.push(score.level);
  // score.lastPlayed = new Date().setHours(0,0,0,0);
  
  localStorage.setObj("storeScore", score);
  let s = localStorage.getObj("storeScore");

  

  
 
  alertz(`Well done dear!<br>
 Games played: ${s.gamesPlayed}<br>Level: ${s.level}<br>Streak: ${s.streak}<br>Max Streak: ${s.maxStreak}<br> Level Distribution:<br>${getLevelDis(s.pastLevels)}`);
  return;
}

function getLevelDis(l) {
  let levelDis = "";
  let count = function (n) {
    return l.filter((x) => x == n).length; //https://stackoverflow.com/questions/37365512/count-the-number-of-times-a-same-value-appears-in-a-javascript-array
  };

  for (let i = 1; i <= 6; i++) {
    levelDis += `<span class="levs lv-${count(i)}">level ${i} --> ${count(i)}</span><br>`;
  }

  return levelDis;
}


function failed() {

  score.gameOver = 1;

  score.level = 0;
  score.pastLevels.push(score.level);
  score.lastPlayed = new Date().setHours(0, 0, 0, 0);
  score.gamesPlayed++;
  localStorage.setObj("storeScore", score);
  let s = localStorage.getObj("storeScore");

  setTimeout(
    () =>
      alertz(`Never mind dear, the word is ${theWord.join("").toUpperCase()}
      <br>
      Games played: ${s.gamesPlayed}<br>Level: ${s.level}<br>Max Streak: ${s.maxStreak}<br> Level Distribution:<br>${getLevelDis(s.pastLevels)}`),
    1000
  );

}



/////////////// key board \\\\\\\\\\\\\\\\\\\




function setKeyCoulors(){
for(let i=0;i< pads.length;i++){

    if(blackKeys.includes(pads[i].getAttribute('data-l'))){
      
        
        pads[i].classList.add('blackKey');

    }

    if(orangeKeys.includes(pads[i].getAttribute('data-l'))){
      
        pads[i].classList.add('orangeKey');

    } if(greenKeys.includes(pads[i].getAttribute('data-l'))){
        
        pads[i].classList.add('greenKey');
    }
}
}


let letter;
window.addEventListener("click", (e) => {
  if(score.gameOver == 1)return;
  if (e.target.hasAttribute("data-l")) {
   
    letter = e.target.getAttribute("data-l");
    makeWord(letter);
  }

  if (letter == "Enter") {
    
    enterPressed(letter);
  }

  letter=null;
});


////////////////////////////////////////////////////////////////////////////////////////

let aalert = $("#alert");

function alertz(tx,duration){

  //alertzDiv.classList.remove('d-none');
  aalert.takeClass("d-none").fadeUp(100).text('<p class="alert">'+tx + '</p>');
  

  // set alert position center
  let l = $(".alert").eq(1).getRect().height;
  let forGoodMeasure = 20;
  let wh = (window.innerHeight/2) - (l/2) - forGoodMeasure;
  
  $(".alert").eq(1).css({'margin-top':`${wh}px`});
 

  if(duration)
  setTimeout(closeAlertz,duration);
}



window.addEventListener('click',function(e){
  if(e.target.classList.contains("alert")){
    
  closeAlertz();

  }
} );

function closeAlertz() {
  aalert.fade(50, false, function() {
    aalert.putClass('d-none').text('');
  });
}





/////////////////////////////////////////////////////  game over set colors


if (score.lastPlayed < today) {
  
  
  score.gameOver = 0;
  localStorage.setObj("storeScore", score);
} else {

  setClasses();
}
function setClasses() {


   // keys  \\\\\\\

  let bk = localStorage.getObj("blakKeys");
  let gk = localStorage.getObj("greenKeys");
  let ok = localStorage.getObj("orangeKeys");

  for (let i = 0; i < pads.length; i++) {

    if (bk && bk.indexOf(pads[i].getAttribute("data-l")) != -1) {
      if(!pads[i].classList.contains("greenKey")){
      pads[i].classList.add("blackKey");
      }

    }
   

    if (ok && ok.indexOf(pads[i].getAttribute("data-l")) != -1) {
      if(!pads[i].classList.contains("greenKey")){
      pads[i].classList.add("orangeKey");
      }

    }

    if (gk && gk.indexOf(pads[i].getAttribute("data-l")) != -1) {
      pads[i].classList.add("greenKey");

    }

  }

  // boxes \\\\\\\\\\\\\\\\\\
  let tries = localStorage.getObj("triedWords") || [];
  let classes = localStorage.getObj('savedClasses') || [];
  
  let r= 0;
  let bxCount = 0;
  for (let i = 0; i < boxes.length; ) {
    if( r >= tries.length)break;
  
   
    boxes[bxCount++].innerHTML = tries[r][i++];
    if(i%wordLength==0 ){
      
      r++;
      
      i=0;
     
    }
  }

  for(let  j=0; j<boxes.length; j++){
     boxes[j].classList.add(classes[j]);
  }
}


























/*

 
/* let s = localStorage.getObj("storeScore");
alertz(`Well done dear.<br>
 Games played: ${s.gamesPlayed}<br>Level: ${s.level}<br>Streak: ${s.streak}<br>Max Streak: ${s.maxStreak}<br> Level Distribution:<br>${getLevelDis(s.pastLevels)}`); */

/* let levelDis = '';
let count = function(n){
  return s.pastLevels.filter(x => x ==n).length;//https://stackoverflow.com/questions/37365512/count-the-number-of-times-a-same-value-appears-in-a-javascript-array
};


 
for(let i = 1; i<= 6;i++){
  
 
  levelDis +=`<span>${i} -- ${count(i)}</span><br>`;
  
} */



//   alertz(`Well done dear.<br>
//  Games played : ${s.gamesPlayed}<br>Level : ${s.level}<br>Streak : ${s.streak}<br>Max Streak : ${s.maxStreak}<br>${levelDis}`);//


$('.box').eq(29).css({"cursor":"pointer"}).on("dblclick",function(){
localStorage.clear();
alertz('storage cleared.');
});

///// foo   "outline":"1px solid green",



