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
      $("#error").text("Check Your Inputs.").css("color","red");
      return;
    }else{
      $("#error").text("Message Sent").css("color","green");
      clear_form($("#form"));
      $("#form").toggleClass("vis");

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
  $("#contact").click(
    function(){
      $("#error").text("")
      $("#form").toggleClass("vis");
    }
  )
});
