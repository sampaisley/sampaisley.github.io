$(document).ready(function() {

	var errors = [],
		timeoutID;
	//$('#one').toggleClass('hid');
	$("#contact").html("CONTACT").click(
		function() {
			$('#one, #two').toggleClass('hid');
			$('#one, #two').toggleClass('vis');
		}
	);

	function clear_form(ele) {
		$("label").removeClass("bad_input");
		$(ele).find(':input').each(function() {
			switch (this.type) {
				case 'number':
				case 'email':
				case 'text':
				case 'textarea':
					$(this).val('').blur();
			}
		});
	}


	function delayedText() {
		timeoutID = window.setTimeout(changeText, 2000);
	}

	function changeText() {
		$("#contact").html("CONTACT");
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
			$("#msg").focus();
			errors = [];
			return;
		} else if (!phone || isNaN(phone) || phone < 50 || phone > 50) {
			errors.push("Half a ton?");
			$("#error").text(errors).addClass("actif");
			$('#phone_lbl').addClass("bad_input");
			$("#phone").focus();
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
			$("#email").focus();
			errors = [];
			return;
		} else {
			$("#contact").text("MESSAGE SENT");
			delayedText();

			clear_form($("#form"));

			$('#one, #two').toggleClass('vis');
			$('#one, #two').toggleClass('hid');
			console.log('hello');
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
	console.log('95');
	$("#but").click(
		function(e) {
			console.log('97');
			e.preventDefault();
			go();

		}
	);
	$("#close").click(

		function() {

			$("#error").html("&nbsp;").removeClass("actif");
			clear_form($("#form"));

			$('#one, #two').toggleClass('vis');
			$('#one, #two').toggleClass('hid');
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

	///   RE-SIZE FORM


	function resize() {
		var h = "innerHeight" in window ? window.innerHeight : document.documentElement
			.offsetHeight,

			els = document.querySelectorAll(".formEl"),

			lbl = document.querySelectorAll(".lbl"),

			bigBut = document.querySelectorAll(".bigBut");

		[].forEach.call(els, function(els) {
			els.style.height = h / 9 + "px";
			els.style.fontSize = (h / 9) / 3 + "px";
			els.style.marginTop = "-20px";
		});

		[].forEach.call(lbl, function(lbl) {
			lbl.style.height = h / 11 + "px";
			lbl.style.fontSize = (h / 9) / 2 + "px";
			//lbl.style.marginTop = "10px";
		});


		[].forEach.call(bigBut, function(bigBut) {
			bigBut.style.height = h / 12 + "px";
			bigBut.style.fontSize = (h / 9) / 2 + "px";
		});

	}
	window.onresize = resize;
	resize();
});
