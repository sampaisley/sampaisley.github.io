$(document).ready(function() {
  var opeen = true,
    errors = [],
    timeoutID;
  $("#contact").html("CONTACT");

  function clear_form(ele) {
    $("label").removeClass("bad_input");
    $(ele).find(':input').each(function() {
      switch (this.type) {
        case 'number':
        case 'email':
        case 'text':
        case 'textarea':
          $(this).val('');
      }
    });
  }


  function delayedText() {
    timeoutID = window.setTimeout(changeText, 2000);
  }

  function changeText() {
    $("#contact").text("CONTACT");
    window.clearTimeout(timeoutID);
  }

  function go() {

    var msg = $("#msg").val(),
      phone = $("#phone").val(),
      email = $("#email").val();
    // if (!msg || !phone || isNaN(phone) || !email || phone != 50 || !
    //   isValidEmailAddress(email)) {
    //   $("#error").text("Check Your Input Values.").addClass("actif");
    //   return;
    // }
    if (!msg) {
      errors.push("Wots the message Doc?");
      $("#error").text(errors).addClass("actif");
      $('#msg_lbl').addClass("bad_input");
      errors = [];
      return;
    } else if (!phone || isNaN(phone) || phone < 50 || phone > 50) {
      errors.push("Half a ton?");
      $("#error").text(errors).addClass("actif");
      $('#phone_lbl').addClass("bad_input");
      errors = [];
      return;
    } else if (!email) {
      errors.push("Hombre! Email! Wake up!");
      $("#error").text(errors).addClass("actif");
      $('#email_lbl').addClass("bad_input");
      errors = [];
      return;
    } else if (!isValidEmailAddress(email)) {
      errors.push("Is that an address?");
      $("#error").text(errors).addClass("actif");
      errors = [];
      return;
    } else {
      $("#contact").text("MESSAGE SENT");
      delayedText();

      clear_form($("#form"));
      $("#form").fadeToggle("slow").toggleClass("vis");
      //$('h4,h3,p,ul,li').toggleClass("fade");
      $('h1,h4,h3,p,ul,li').fadeTo("slow", 1);
      opeen = !opeen;

    }

    $.ajax({
      type: "POST",
      //url: "http://cmh.netne.net/mail/mail.php",
      //url:"http://paisley.orgfree.com/mail.php",
      url: "http://cmh.netne.net/mail.php",
      data: {
        msg: msg,
        phone: phone,
        email: email
      }
    });

  }

  $("#but").click(
    function(e) {
      e.preventDefault();
      go();
    }
  );
  $("#contact, #close").click(



    function() {
      if ($("#form:animated").length) {
        return false; // prevent double clicking during fade
      }
      $("#error").text("").removeClass("actif");
      clear_form($("#form"));
      $("#form").fadeToggle("slow").toggleClass("vis");
      // $('h4,h3,p,ul,li').toggleClass("fade");
      if (opeen) {
        $('h1,h4,h3,p,ul,li').fadeTo("slow", 0.5);
      } else {
        $('h1,h4,h3,p,ul,li').fadeTo("slow", 1);
      }
      opeen = !opeen;
    }
  );

  $("input,textarea").on("click", function() {
    $("label").removeClass("bad_input");
  });

  //////// EMAIL \\\\\\\\\\\\\\\\

  function isValidEmailAddress(emailAddress) {
    var pattern = new RegExp(
      /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i
    );
    return pattern.test(emailAddress);
  }
});
