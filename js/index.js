$( document ).ready(function() {
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


  function go(e){

    var msg = $("#msg").val();
    var phone = $("#phone").val();
    var email = $("#email").val();
    if(!msg || !phone || !email){
      $("#error").text("Check Your Inputs.");
      return;
    }else{
      $("#contact").addClass('green').text("Message Sent").fadeOut(3000,function(){$(this).text("Contact").removeClass("green").fadeIn()});
      clear_form($("#form"));
      $("#form").toggleClass("vis");
      $('h4,h3,p,ul,li').toggleClass("fade");

    }
    $.ajax({
      type: "POST",
      //url: "http://cmh.netne.net/mail/mail.php",
      url:"http://paisley.orgfree.com/mail.php",
      data: { msg: msg, phone: phone, email: email }
    })

  }

  $("#but").click(
    function(e){
      e.preventDefault();
      go();
    }
  );
  $("#contact, #close").click(
    function(){
      $("#error").text("")
      $("#form").toggleClass("vis");
      $('h4,h3,p,ul,li').toggleClass("fade");
    }
  )
});
