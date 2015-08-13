var src,
  title,
  firstImageSrc;


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



function go(tag) {
  var url =
    "https://api.flickr.com/services/rest/?method=flickr.people.getPhotos&api_key=857e33af61016743c64d4aa90fa4782a&user_id=100786833%40N08&tags=" +
    tag + "&extras=tags%2Curl_n%2Curl_c%2Curl_sq%2Cdate_taken&format=json";

  $.getJSON(url + "&format=json&jsoncallback=?", function(data) {

    data.photos.photo.sort(sortbydate);
    $.each(data.photos.photo, function(i, item) {

      src = "http://farm" + item.farm + ".static.flickr.com/" + item.server + "/" + item.id + "_" + item.secret +
        "_s.jpg";
      $("<img/>").attr("src", src).attr("class", "thumb").attr("alt", item.title).appendTo("#images");
      // set main image
      /*if (i == 0) {
        firstImageSrc = "http://farm" + item.farm + ".static.flickr.com/" + item.server + "/" + item.id + "_" +
          item.secret + "_c.jpg";
        $("<img/>").attr("src", firstImageSrc).attr("class", "thumb").attr("alt", item.title).appendTo("#pops");

        //  $("#tit").text(item.title);
        //$(".thumb").addClass("activ");
      }*/
    });
  });
}

$('.but').click(function() {
  $("#images,  #tit").empty();
  go($(this).attr('id'));
})
$("#images").on('click', '.thumb', function(e) {
  title = e.target.alt;
  $(".thumb").removeClass("activ");
  $(this).addClass('activ');
  $("#tit").removeClass("tit_hover")
  $("#pops").removeClass("hid");
  $("#tit").text(title);
  //$("<img/>").attr("src", e.target.src.slice(0, -5) + "c.jpg").attr("class", "pop").appendTo("#pops");
  $("#bigImg").attr("src", e.target.src.slice(0, -5) + "c.jpg").attr("class", "pop");
  $("#casa, #foot").hide();

})
$("#images").on('mouseover', '.thumb', function(e) {
  $("#tit").addClass("tit_hover").text(e.target.alt);
});

$("#images").on('mouseout', function(e) {
  $("#tit").removeClass("tit_hover").text(title);
});

$('#pops').click(function() {
  $(this).addClass("hid");
  $("#bigImg").attr("src", "");
  $("#casa, #foot").show();
});

$("ul").on('click', '.but', function(e) {
  $(".but").removeClass('actif');
  $(this).addClass('actif');
});
go("sea");
