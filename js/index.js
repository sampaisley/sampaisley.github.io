$( document ).ready(function() {
  $("#contact").html("Contact");
  function clear_form(ele) {
        $(ele).find(':input').each(function() {
            switch(this.type) {
                case 'number':
                case 'email':
                case 'text':
                case 'textarea':
                    $(this).val('');
            }
        });
    }



  function go(){

    var msg = $("#msg").val(),
    phone = $("#phone").val(),
     email = $("#email").val();
    if(!msg || !phone || isNaN(phone) || !email || !isValidEmailAddress(email)){
      $("#error").text("Check Your Input Values.");
      return;
    }else{
      $("#contact").addClass('green').text("Message Sent").fadeOut(3000,function(){$(this).text("Contact").removeClass("green").fadeIn();});
      clear_form($("#form"));
      $("#form").fadeToggle( "slow").toggleClass("vis");
      $('h4,h3,p,ul,li').toggleClass("fade");

    }
    $.ajax({
      type: "POST",
      //url: "http://cmh.netne.net/mail/mail.php",
     //url:"http://paisley.orgfree.com/mail.php",
     url : "http://eatpies.esy.es/mail.php",
      data: { msg: msg, phone: phone, email: email }
    });

  }

  $("#but").click(
    function(e){
      e.preventDefault();
      go();
    }
  );
  $("#contact, #close").click(
    function(){
      $("#error").text("");
      clear_form($("#form"));
      $("#form").fadeToggle( "fast").toggleClass("vis");
      $('h4,h3,p,ul,li').toggleClass("fade");
    }
  );
function isValidEmailAddress(emailAddress) {
    var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
    return pattern.test(emailAddress);
}
});