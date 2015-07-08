var dragger = document.querySelector('#draggable');
var checkers = document.querySelector('#checkers');
var thumbDiv = document.querySelector('#thumbs');
var toggleMode = document.querySelector("#toggleMode");
var numOfThumbs = 0;
var borderWidth = 10;
checkers.style.borderWidth = borderWidth + "px";
var theImage = document.querySelector('#theImage');
var title = document.querySelector('#title');
var tit;
var grid_size = dragger.offsetWidth;
var wide = document.querySelector('#checkers').clientWidth;
var high = document.querySelector('#checkers').clientHeight;
var squaresAccross = wide / grid_size;
var thumbsMode = true;
//var totalSquares = (squaresAccross) * (high / grid_size);
var images = [];
var Draggabilly; // declare Draggabilly to keep jsHint quiet;
var jso = {};
var tag = 'france';
var currentThumb = 0;
var dragStartPoint = 0;
var _X = 0,
  _Y = 0;
var oldNumOfPhotos;
var timeoutID;
//var windowWidth = window.innerWidth;
var flickrURL =
  "https://api.flickr.com/services/rest/?method=flickr.people.getPhotos&api_key=2fdc79859cd894e55ee6fb2d0a4e6acf&user_id=100786833%40N08&extras=tags%2Curl_n%2Curl_c%2Curl_sq%2Cdate_taken&format=json";

//add the flickr javascript to the page so it gets executed
//flickr automatically calls jsonflickrAPI(rsp)

var script = document.createElement('script');
script.type = 'text/javascript';
script.src = flickrURL;
document.head.appendChild(script);

function wordInString(s, word) {
  return new RegExp('\\b' + word + '\\b', 'gi').test(s);
}

function setImage(i) {
  i = i || currentThumb;
  if (i < images.length) {
    theImage.src = images[i][0];
  } else {
    theImage.src =
      "../img/noImage.jpg";
    timeoutID = window.setTimeout(function() {
      reJig(dragger.style.left);
    }, 300);

  }
}


function reJig(draggerLeft) {

  var newDragLeft = parseInt(draggerLeft) - grid_size;
  dragger.style.left = newDragLeft + 'px';
  dragger.innerHTML = currentThumb;
  window.clearTimeout(timeoutID);
  currentThumb--;

  setImage();
  setTitle();
  title.classList.remove("noImage");
}

function setTitle(n) {
  n = n || currentThumb;
  if (n < images.length) {
    title.innerHTML = images[n][2];
  } else {
    title.innerHTML = "No Image";

  }
}

function reSetDragger(numOfPhotos) {
  var newDraggerTop, t, l;
  if (numOfPhotos < oldNumOfPhotos && parseInt(dragger.style.top) + 1.5 *
    grid_size > high) {
    newDraggerTop = Math.ceil(numOfPhotos / squaresAccross - 1) *
      grid_size + "px";

    dragger.style.top = newDraggerTop;

    t = parseInt(dragger.style.top) / grid_size;
    l = parseInt(dragger.style.left) / grid_size;
    //dragger.innerHTML =(t+l) || 1;
    _X = l;
    _Y = t * squaresAccross;
    dragger.innerHTML = t * squaresAccross + l + 1;
    currentThumb = t * squaresAccross + l;
    setImage();
    setTitle();
  }
  oldNumOfPhotos = numOfPhotos;

}

function draggerShadowThumbs(x, y) {
  dragger.style.left = x + "px";
  dragger.style.top = y + "px";
}

function setActiveClass(e, c, t) {
  var a = document.querySelectorAll(e),
    i;
  for (i = a.length; i--;) {
    a[i].classList.remove(c);
  }
  t.classList.add(c);
}

function setDivHeight(l) {

  var w = 3,
    h = Math.ceil(l / w);
  //  if (windowWidth > 790) {
  //    w=3;
  //    h = Math.ceil(l / w);
  //  }
  //  if (l % 2 !== 0 && l <= 10) {
  //    h = Math.ceil(l / 3);
  //
  //  } else if (l % 2 !== 0 && l > 10) {
  //    h = Math.ceil(l / 3);
  //
  //  } else if (l % 2 === 0 && l <= 10) {
  //    h = l / 3;
  //
  //  } else if (l % 2 === 0 && l > 10) {
  //    h = Math.ceil(l / 3);
  //
  //  }

  checkers.style.height = h * grid_size + (2 * borderWidth) + 'px';
  checkers.style.width = w * grid_size + (2 * borderWidth) + 'px';
  // update the vars
  wide = document.querySelector('#checkers').clientWidth;
  high = document.querySelector('#checkers').clientHeight;
  squaresAccross = wide / grid_size;
  reSetDragger(l);
}


function sortbydate(a, b) {
  if (a.datetaken > b.datetaken) {
    return 1;
  }
  if (a.datetaken < b.datetaken) {
    return -1;
  }
  // a must be equal to b
  return 0;
}


function makeArray(t) {
  var i, src, src_sq, dat, large;
  jso.sort(sortbydate);
  images = [];
  for (i = jso.length; i--;) {
    if (wordInString(jso[i].tags, t)) {
      numOfThumbs++;
      //  var src = 'http://farm' + jso[i].farm +
      //    '.staticflickr.com/' + jso[i].server + '/' + jso.photos
      //    .photo[i].id + '_' + jso[i].secret + '_n.jpg';
      src = jso[i].url_n;
      src_sq = jso[i].url_sq;
      tag = jso[i].tags;
      tit = jso[i].title;
      dat = jso[i].datetaken;
      large = jso[i].url_c;
      images.unshift([src, tag, tit, src_sq, dat, large]);
    }
  }
}

///////////////  THUMBS  \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
function thumbs(thum, i) { //http://www.adequatelygood.com/JavaScript-Scoping-and-Hoisting.html  -----> see asoff's comment
  thumbDiv.innerHTML = "";
  //var thum, i;
  for (i = 0; i < numOfThumbs; ++i) {
    thum = document.createElement("img");
    thum.src = images[i][3];
    // thum.setAttribute('class', " thumb");
    thum.className = 'thumb';
    thum.id = i;
    //thum.setAttribute('id', i);
    //if (i % 3 === 0 && i !== 0) {
    //thumbDiv.innerHTML += "<br>";
    //}
    thumbDiv.appendChild(thum);
  }
}


thumbDiv.addEventListener('click', function(e) {
  if (e.target.nodeName === "IMG") { // make sure it's an image;


    currentThumb = e.target.getAttribute('id');
    setImage();
    setTitle();
    dragger.innerHTML = parseInt(currentThumb) + 1;
    if (e.target.offsetLeft % grid_size === 0) { // if border size taken into account or not :::: firefox and chrome differ, gawd knows about IE
      draggerShadowThumbs(e.target.offsetLeft, e.target.offsetTop);
    } else {
      draggerShadowThumbs(e.target.offsetLeft - borderWidth, e.target.offsetTop -
        borderWidth);

    }

    setActiveClass('.thumb', "active", e.target);
    title.classList.remove("moving");
  }
}, false);

thumbDiv.addEventListener('mouseover', function(e) {
  if (e.target.nodeName === "IMG") { // make sure it's an image;
    var imgUnderMouse = e.target.id;
    setTitle(imgUnderMouse);
    if (currentThumb !== imgUnderMouse) {
      title.classList.add("moving");
    } else {
      title.classList.remove("moving");
    }
  }
}, false);

thumbDiv.addEventListener('mouseout', function() {
  title.classList.remove("moving");
  setTitle();
}, false);

thumbDiv.addEventListener('dblclick', function(e) {
  if (e.target.nodeName === "IMG") {
    popLargeImage();
  }
}, false);



function swapMode() {
  dragger.classList.toggle("hidden");
  checkers.classList.toggle('checks');
  thumbDiv.classList.toggle("hidden");
  thumbs();
  thumbsMode ? toggleMode.innerHTML = "Dragger" : toggleMode.innerHTML =
    "Thumbs";
  if (thumbsMode && currentThumb < images.length) {
    setActiveClass('.thumb', "active", document.getElementById(currentThumb));
  }

}
toggleMode.onclick = function() {
  thumbsMode = !thumbsMode;
  swapMode();

};



function jsonFlickrApi(result) {
  jso = result.photos.photo;
  makeArray(tag);
  setImage();
  setTitle();
  setDivHeight(images.length);
  if (thumbsMode) {
    swapMode();
  }
}


var draggie = new Draggabilly(dragger, {
  grid: [grid_size, grid_size],
  containment: true
});

//  function updateTitle() {
//
//  }

draggie.on('dragStart', function() { //...
  dragStartPoint = currentThumb;
});

function onDragMove(instance) {
  _X = instance.position.x / grid_size;
  _Y = Math.floor(instance.position.y / grid_size * squaresAccross);
  currentThumb = _Y + _X;
  dragger.innerHTML = currentThumb + 1;
  setTitle();
  if (currentThumb !== dragStartPoint) {
    title.classList.add("moving");
  }
  if (currentThumb > images.length - 1) {
    title.classList.add("noImage");
  } else {
    title.classList.remove("noImage");
  }
}

function onDragEnd() {
  setImage();
  setTitle();
  title.classList.remove("moving");
}
// bind event listeners
draggie.on('dragMove', onDragMove);
draggie.on('dragEnd', onDragEnd);

///set tags
var france = document.querySelector('#france');
var food = document.querySelector('#food');
var sea = document.querySelector('#sea');
var numbers = document.querySelector('#numbers');
// var tagName = document.querySelector('#tagName');
// tagName.innerHTML = "Tag: " + tag;



function changeSet(set) {
  numOfThumbs = 0;
  makeArray(tag = set);


  setTitle();
  setDivHeight(images.length);
  setImage();
  if (thumbsMode) {
    thumbs();
    setActiveClass('.thumb', "active", document.getElementById(currentThumb));
  }
}
france.onclick =
  numbers.onclick =
  food.onclick =
  sea.onclick = function() {
    changeSet(this.getAttribute('id'));
    setActiveClass('.butto', "active", this);
  };
dragger.ondblclick = function() {
  popLargeImage();

};
/////////// POPS \\\\\\\\\\\\\
var pops = document.querySelector('.pops');
var popsDiv = document.querySelector('#popsDiv');
var popsTitle = document.querySelector('.popsTitle');
theImage.onclick = popLargeImage;

function popLargeImage() {
  pops.src = images[currentThumb][5];
  popsDiv.classList.toggle('hidden');
  popsTitle.innerHTML = images[currentThumb][2];

}
popsDiv.onclick = function() {
  pops.src = '';
  popsDiv.classList.toggle('hidden');
};
