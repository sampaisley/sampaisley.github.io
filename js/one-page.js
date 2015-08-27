$(document).ready(function() {

	if (navigator.appVersion.indexOf("Win") !== -1) { // line-height not working for gill sans on windows so removeClass
		$('#tit').removeClass('lh');

	}
	var
		last_selected_field = null,
		timeoutID,
		msg,
		phone,
		email,
		m = 'otliam',
		s = 'sam',
		p = 'yelsiap',
		a = '&#64;',
		h = 'liamtoh',
		d = '&#46;',
		c = 'com';

	function reverse(s) {
		var o = '';
		for (var i = s.length - 1; i >= 0; i--) {
			o += s[i];
		}
		return o;
	}
	$("#contact").html("CONTACT").click(
		function() {
			//moveTo(".main", 3);
			$(this).html('<a class="cont" href="' + reverse(m) + ':' + s + reverse(p) + a + reverse(h) + d + c +
				'?subject=Mail from Git Site">' + s + reverse(p) + a + reverse(h) + d + c + '</a>');
		}
	);
	$("#q_mark").click(
		function() {
			moveTo(".main", 2);
		}
	);
	$("#top, .left_side").click(
		function() {
			moveTo(".main", 1);
		}
	);
	$("section").click(
		function(e) {
			//	console.log(e.target.id);
			if (e.target.id !== 'contact') {
				$("#contact").html("CONTACT");
			}

		});

	function clear_form(ele) {

		$("input, textarea").removeClass("bollox");
		last_selected_field = null;

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
		$("#tit").fadeOut(501, function() {
			$(this).html("SAM&nbsp;PAISLEY").fadeIn();
		});
		window.clearTimeout(timeoutID);
	}

	function warning(e) {
		$(e).addClass("bollox").focus();
	}

	function sendMessage() {
		$.ajax({
			type: "POST",
			url: "http://cmh.netne.net/mail.php",
			//url: "http://petalski.byethost7.com/mail.php",
			data: {
				msg: msg,
				phone: phone,
				email: email
			}
		});
	}

	function go() {

		msg = $("#msg").val();
		phone = parseInt($("#phone").val());
		email = $("#email").val();

		///////////////////////// first check for selected field

		if (!msg && last_selected_field === 'msg') {

			warning("#msg");

			return;
		} else if (!isValidEmailAddress(email) && last_selected_field === 'email') {

			warning("#email");

			return;
		} else if ((!phone || isNaN(phone) || phone < 50 || phone > 50) &&
			last_selected_field === 'phone') {

			$("#phone").val("");

			warning("#phone");
			return;
			///////////////////////// no focus, start at the top
		} else if (!msg) {
			warning("#msg");
			return;
		} else if (!isValidEmailAddress(email)) {

			warning("#email");

			return;
		} else if (!phone || isNaN(phone) || phone < 50 || phone > 50) {

			$("#phone").val("");

			warning("#phone");
			return;

		} else { ////////////////// all is good
			clear_form($("#form"));
			moveTo(".main", 1);
			$("#tit").html("MESSAGE&nbsp;SENT");
			delayedText();
			sendMessage();
		}
	}
	$("#but").click(
		function(e) {

			e.preventDefault();
			go();

		}
	);
	$("#close").click(
		function() {
			clear_form($("#form"));
		}
	);

	$("input,textarea").on("keydown", function() {

		$("input, textarea").removeClass("bollox");
	});
	$("input,textarea").on("click", function() {

		last_selected_field = document.activeElement.id;

		$("input, textarea").removeClass("bollox");
	});


	//////// EMAIL \\\\\\\\\\\\\\\\

	function isValidEmailAddress(emailAddress) {
		var pattern = new RegExp(
			/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i
		);
		return pattern.test(emailAddress);
	}


});
