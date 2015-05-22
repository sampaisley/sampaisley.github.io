$(document).ready(function() {

	var errors = [],
		timeoutID;
	//$('#one').toggleClass('hid');
	$("#contact").html("CONTACT").click(
		function() {

			moveTo(".main", 3);
		}
	);
	$("#q_mark").click(
		function() {
			moveTo(".main", 2);
		}
	);

	function clear_form(ele) {
		$("label").removeClass("bad_input");
		$("#error").html("&nbsp;");
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
		$("#tit").fadeOut(200, function() {
			$(this).html("SAM&nbsp;PAISLEY").fadeIn();
		});
		window.clearTimeout(timeoutID);
	}

	function go() {

		var msg = $("#msg").val(),
			phone = $("#phone").val(),
			email = $("#email").val();

		if (!msg) {
			errors.push("Wots the message Doc?");
			$("#error").text(errors).addClass("actif");
			$('#msg_lbl').addClass("bad_input");
			$("#msg").focus();
			errors = [];
			return;
		} else if (!email) {
			errors.push("Hombre! Email! Wake up!");
			$("#error").text(errors).addClass("actif");
			$('#email_lbl').addClass("bad_input");
			$("#email").focus();
			errors = [];
			return;
		} else if (!isValidEmailAddress(email)) {
			errors.push("Is that an address?");
			$("#error").text(errors).addClass("actif");
			$('#email_lbl').addClass("bad_input");
			$("#email").focus();
			errors = [];
			return;
		} else if (!phone || isNaN(phone) || phone < 50 || phone > 50) {
			errors.push("Half a ton?");
			$("#error").text(errors).addClass("actif");
			$('#phone_lbl').addClass("bad_input");
			$("#phone").focus();
			errors = [];
			return;
		} else {
			clear_form($("#form"));
			moveTo(".main", 1);
			$("#tit").html("MESSAGE&nbsp;SENT");
			delayedText();



		}

		$.ajax({
			type: "POST",
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
	$("#close").click(
		function() {

			$("#error").html("&nbsp;").removeClass("actif");
			clear_form($("#form"));


		}
	);

	$("input,textarea").on("keydown", function() {
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
