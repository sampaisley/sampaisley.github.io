     var elem = document.querySelector('#draggable');
     var theImage = document.querySelector('#theImage');
     var title = document.querySelector('#title');
var tit;
     var grid_size = elem.clientWidth;
     var wide = document.querySelector('#strips').clientWidth;
    // var high = document.querySelector('#strips').clientHeight;
     var squaresAccross = wide / grid_size;
     //var totalSquares = (squaresAccross) * (high / grid_size);
     var images = [];
     var jso = {};
     var tag = 'field';
     var _X=0, _Y=1; //ensure initial setting of _Y + _X - 1  is 0
     document.flickrURL =
         "https://api.flickr.com/services/rest/?method=flickr.people.getPhotos&api_key=2fdc79859cd894e55ee6fb2d0a4e6acf&user_id=100786833%40N08&extras=tags&format=json";

     //add the flickr javascript to the page so it gets executed
     //flickr automatically calls jsonflickrAPI(rsp)

     var script = document.createElement('script');
     script.setAttribute('type', 'text/javascript');
     script.setAttribute('src', document.flickrURL);
     document.head.appendChild(script);
     function wordInString(s, word) {
         return new RegExp('\\b' + word + '\\b', 'gi').test(s);
     }
     function setImage(){
        if(_Y + _X - 1 < images.length) { theImage.src =  images[_Y + _X - 1][0] ;}
        else{ theImage.src ="http://vapordirect.ie/template/eshop/images/no_product_photo.jpg";
      }
     }
     function setTitle() {
       title.innerHTML = "Title: " + images[_Y + _X - 1][2];
     }
     function makeArray(t) {
         images = [];
         for (var i = 0; i < jso.photos.photo.length; ++i) {
             if (wordInString(jso.photos.photo[i].tags, t)) {
                 var src = 'http://farm' + jso.photos.photo[i].farm + '.staticflickr.com/' + jso.photos.photo[i].server + '/' + jso.photos.photo[i].id + '_' + jso.photos.photo[i].secret + '_m.jpg';
                 tag = jso.photos.photo[i].tags;
                  tit = jso.photos.photo[i].title;
                 images.push([src, tag , tit]);
             }
         }
     }
      function jsonFlickrApi(result) {
         jso = result;
         makeArray(tag);
         setImage();
         setTitle();
     }





     var draggie = new Draggabilly(elem, {
         grid: [grid_size, grid_size],
         containment: true
     });


     function onDragMove(instance) {
         _X = instance.position.x / grid_size + 1;
         _Y = Math.floor(instance.position.y / grid_size * squaresAccross);
         elem.innerHTML = _Y + _X;
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
     tagName.innerHTML = "Tag: " +tag;
     function changeSet(set) {
         makeArray(tag = set);
         tagName.innerHTML = "Tag: " +set;
         setImage();
         setTitle();
     }
     france.onclick =
     field.onclick=
     sea.onclick = function(){
       changeSet(this.getAttribute('id'));
     };
