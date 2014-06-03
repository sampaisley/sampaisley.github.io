     var dragger = document.querySelector('#draggable');
     var strips = document.querySelector('#strips');
     var thumbDiv = document.querySelector('#thumbs');
     var numOfThumbs = 0;
     var borderWidth = 10;
     strips.style.borderWidth = borderWidth + "px";
     var theImage = document.querySelector('#theImage');
     var title = document.querySelector('#title');
     var tit;
     var grid_size = dragger.clientWidth;
     var wide = document.querySelector('#strips').clientWidth;
     var high = document.querySelector('#strips').clientHeight;
     var squaresAccross = wide / grid_size;
     var thumbsMode=false;
      //var totalSquares = (squaresAccross) * (high / grid_size);
     var images = [];
     var Draggabilly; // declare Draggabilly to keep jsHint quiet;
     var jso = {};
     var tag = 'france';
     var currentThumb = 0;
     var dragStartPoint = 0;
     var _X = 0,
       _Y = 1; //ensure initial setting of _Y + _X - 1  is 0
     var oldNumOfPhotos;
     /* document.flickrURL =
       "https://api.flickr.com/services/rest/?method=flickr.people.getPhotos&api_key=2fdc79859cd894e55ee6fb2d0a4e6acf&user_id=100786833%40N08&extras=tags&format=json";

      //add the flickr javascript to the page so it gets executed
      //flickr automatically calls jsonflickrAPI(rsp)

     var script = document.createdraggerent('script');
     script.setAttribute('type', 'text/javascript');
     script.setAttribute('src', document.flickrURL);
     document.head.appendChild(script);
*/
     function wordInString(s, word) {
       return new RegExp('\\b' + word + '\\b', 'gi').test(s);
     }

     function setImage(i) {
       i = i || _Y + _X - 1;
       if (i < images.length) {
         theImage.src = images[i][0];
       } else {
         theImage.src =
           "../img/noImage.jpg";
       }
     }

     function setTitle(n) {
       n=n || _Y + _X - 1;
       if (n < images.length) {
         title.innerHTML = images[n][2];
       } else {
         title.innerHTML = "No Image";
       }
     }

     function reSetDragger(numOfPhotos) {
       if (numOfPhotos < oldNumOfPhotos && parseInt(dragger.style.top) + 1.5 * grid_size > high) {
         var newDraggerTop = Math.ceil(numOfPhotos / squaresAccross - 1)* grid_size + "px";

         dragger.style.top = newDraggerTop ;

         var t = parseInt(dragger.style.top) / grid_size;
         var l = parseInt(dragger.style.left) / grid_size ;
         //dragger.innerHTML =(t+l) || 1;
         _X = l + 1;
         _Y = t * squaresAccross;
         dragger.innerHTML = t * squaresAccross + l + 1;
         currentThumb =  t * squaresAccross + l ;
         setImage();
         setTitle();
       }
       oldNumOfPhotos = numOfPhotos;

     }
     function draggerShadowThumbs(x,y) {
       dragger.style.left = x+"px";
       dragger.style.top = y+"px";
     }
     function setDivHeight(l) {
       var w = 3,
         h = Math.ceil(l / 3);
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

       strips.style.height = h * grid_size + (2 * borderWidth) + 'px';
       strips.style.width = w * grid_size + (2 * borderWidth) + 'px';
       // update the vars
       wide = document.querySelector('#strips').clientWidth;
       high = document.querySelector('#strips').clientHeight;
       squaresAccross = wide / grid_size;
       reSetDragger(l);
     }

     function makeArray(t) {
       images = [];
       for (var i = jso.photos.photo.length; i--;) {
         if (wordInString(jso.photos.photo[i].tags, t)) {
           numOfThumbs++;
           //  var src = 'http://farm' + jso.photos.photo[i].farm +
           //    '.staticflickr.com/' + jso.photos.photo[i].server + '/' + jso.photos
           //    .photo[i].id + '_' + jso.photos.photo[i].secret + '_n.jpg';
           var src = jso.photos.photo[i].url_n;
           var src_sq = jso.photos.photo[i].url_sq;
           tag = jso.photos.photo[i].tags;
           tit = jso.photos.photo[i].title;
           images.unshift([src, tag, tit, src_sq]);
         }
       }
     }

      ///////////////  THUMBS  \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
     function thumbs() {
       thumbDiv.innerHTML = "";
       var thum;
       for (var i = 0; i < numOfThumbs; ++i) {
         thum = document.createElement("img");
         thum.src = images[i][3];
         thum.setAttribute('class', " thumb");
         thum.setAttribute('id', i);
         //if (i % 3 === 0 && i !== 0) {
           //thumbDiv.innerHTML += "<br>";
         //}
         thumbDiv.appendChild(thum);
       }

       thumbDiv.addEventListener('click', function(e) {
         if (e.target.nodeName ==="IMG") {// make sure it's an image;


         currentThumb = e.target.getAttribute('id');
         setImage(currentThumb);
         setTitle(currentThumb);
         dragger.innerHTML=parseInt(currentThumb)+1 ;
         draggerShadowThumbs(e.target.offsetLeft- borderWidth, e.target.offsetTop - borderWidth);
         setActiveClass('.thumb', "active",e.target);
       }
       }, false);
     }

document.querySelector("#check").onclick=function () {
  dragger.classList.toggle("hidden");
  thumbDiv.classList.toggle("hidden");
  thumbsMode = !thumbsMode;
  thumbs();
  this.innerHTML==="Thumbs" ? this.innerHTML="Dragger" : this.innerHTML="Thumbs";
  if(thumbsMode && _Y + _X - 1 < images.length){
  setActiveClass('.thumb', "active",document.getElementById(_Y + _X - 1));
}
};
     function jsonFlickrApi(result) {
       jso = result;
       makeArray(tag);
       setImage();
       setTitle();
       setDivHeight(images.length);
     }



     var draggie = new Draggabilly(dragger, {
       grid: [grid_size, grid_size],
       containment: true
     });

      //  function updateTitle() {
      //
      //  }

     draggie.on('dragStart', function() { //...
       dragStartPoint = _X + _Y;
     });

     function onDragMove(instance) {
       _X = instance.position.x / grid_size + 1;
       _Y = Math.floor(instance.position.y / grid_size * squaresAccross);
       dragger.innerHTML = _Y + _X;
       setTitle();
       if (_X + _Y !== dragStartPoint) {
         title.classList.add("moving");
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
     var field = document.querySelector('#field');
     var sea = document.querySelector('#sea');
     var numbers = document.querySelector('#numbers');
      // var tagName = document.querySelector('#tagName');
      // tagName.innerHTML = "Tag: " + tag;

     function setActiveClass(e, c,t) {
       var a = document.querySelectorAll(e);
       for (var i = a.length; i--;) {
         a[i].classList.remove(c);
       }
       t.classList.add(c);
     }

     function changeSet(set) {
       numOfThumbs = 0;
       makeArray(tag = set);

       setImage(currentThumb);
       setTitle();
       setDivHeight(images.length);

if (thumbsMode) {
  thumbs();
  setActiveClass('.thumb', "active",document.getElementById(currentThumb));
}
     }
     france.onclick =
       numbers.onclick =
       field.onclick =
       sea.onclick = function() {
         changeSet(this.getAttribute('id'));

         setActiveClass('.butto', "active",this);
     };
     dragger.ondblclick = function() {
       alert("Don't click it dumbo, drag it");

     };
