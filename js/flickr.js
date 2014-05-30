     var dragger = document.querySelector('#draggable');
     var strips = document.querySelector('#strips');
     var borderWidth = 10;
     strips.style.borderWidth = borderWidth + "px";
     var theImage = document.querySelector('#theImage');
     var title = document.querySelector('#title');
     var tit;
     var grid_size = dragger.clientWidth;
     var wide = document.querySelector('#strips').clientWidth;
     var high = document.querySelector('#strips').clientHeight;
     var squaresAccross = wide / grid_size;
      //var totalSquares = (squaresAccross) * (high / grid_size);
     var images = [];
     var Draggabilly; // declare Draggabilly to keep jsHint quiet;
     var jso = {};
     var tag = 'france';
     var _X = 0,
       _Y = 1; //ensure initial setting of _Y + _X - 1  is 0
     var oldHeight;
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

     function setImage() {
       if (_Y + _X - 1 < images.length) {
         theImage.src = images[_Y + _X - 1][0];
       } else {
         theImage.src =
           "../img/noImage.jpg";
       }
     }

     function setTitle() {
       if (_Y + _X - 1 < images.length) {
         title.innerHTML = "Title: " + images[_Y + _X - 1][2];
       } else {
         title.innerHTML = "No More From " + tag;
       }
     }

     function reSetDragger(h) {
       if (h < oldHeight && parseInt(dragger.style.top) + 1.5 * grid_size > high) {
         var down = Math.ceil(h / squaresAccross - 1);

         dragger.style.top = down * grid_size + "px";

         var t = parseInt(dragger.style.top) / grid_size;
         var l = parseInt(dragger.style.left) / grid_size - 1;
         //dragger.innerHTML =(t+l) || 1;
          _X = l+2;
          _Y = t*squaresAccross ;
         dragger.innerHTML = t * squaresAccross + l + 2;
         setImage();
         setTitle();
       }
       oldHeight = h;

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
      //    h = Math.ceil(l / 3);console.log('obj');
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
       for (var i = 0; i < jso.photos.photo.length; ++i) {
         if (wordInString(jso.photos.photo[i].tags, t)) {
           var src = 'http://farm' + jso.photos.photo[i].farm +
             '.staticflickr.com/' + jso.photos.photo[i].server + '/' + jso.photos
             .photo[i].id + '_' + jso.photos.photo[i].secret + '_m.jpg';
           tag = jso.photos.photo[i].tags.split(' ')[0];
           tit = jso.photos.photo[i].title;
           images.push([src, tag, tit]);
         }
       }
     }

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


     function onDragMove(instance) {
       _X = instance.position.x / grid_size + 1;
       _Y = Math.floor(instance.position.y / grid_size * squaresAccross);
       dragger.innerHTML = _Y + _X;
     }

     function onDragEnd() {
       setImage();
       setTitle();
     }
      // bind event listeners
     draggie.on('dragMove', onDragMove);
     draggie.on('dragEnd', onDragEnd);

      ///set tags
     var france = document.querySelector('#france');
     var field = document.querySelector('#field');
     var sea = document.querySelector('#sea');
     var tagName = document.querySelector('#tagName');
     tagName.innerHTML = "Tag: " + tag;

     function changeSet(set) {
       makeArray(tag = set);
       tagName.innerHTML = "Tag: " + set;
       setImage();
       setTitle();
       setDivHeight(images.length);
     }
     france.onclick =
       field.onclick =
       sea.onclick = function() {
         changeSet(this.getAttribute('id'));
     };
     dragger.ondblclick = function() {
       alert("Don't click it dumbo, drag it");
     };
