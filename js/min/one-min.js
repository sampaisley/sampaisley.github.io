$(document).ready(function(){function u(u){$("label").removeClass("bad_input"),$(u).find(":input").each(function(){switch(this.type){case"number":case"email":case"text":case"textarea":$(this).val("").blur()}})}function e(){n=window.setTimeout(F,2e3)}function F(){$("#contact").html("CONTACT"),window.clearTimeout(n)}function t(){var F=$("#msg").val(),t=$("#phone").val(),a=$("#email").val();return F?!t||isNaN(t)||50>t||t>50?(l.push("Half a ton?"),$("#error").text(l).addClass("actif"),$("#phone_lbl").addClass("bad_input"),$("#phone").focus(),void(l=[])):a?o(a)?($("#contact").text("MESSAGE SENT"),e(),u($("#form")),$("#one, #two").toggleClass("vis"),$("#one, #two").toggleClass("hid"),console.log("hello"),void $.ajax({type:"POST",url:"http://cmh.netne.net/mail.php",data:{msg:F,phone:t,email:a}})):(l.push("Is that an address?"),$("#error").text(l).addClass("actif"),$("#email").focus(),void(l=[])):(l.push("Hombre! Email! Wake up!"),$("#error").text(l).addClass("actif"),$("#email_lbl").addClass("bad_input"),$("#email").focus(),void(l=[])):(l.push("Wots the message Doc?"),$("#error").text(l).addClass("actif"),$("#msg_lbl").addClass("bad_input"),$("#msg").focus(),void(l=[]))}function o(u){var e=new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);return e.test(u)}function a(){var u="innerHeight"in window?window.innerHeight:document.documentElement.offsetHeight,e=document.querySelectorAll(".formEl"),F=document.querySelectorAll(".lbl"),t=document.querySelectorAll(".bigBut");[].forEach.call(e,function(e){e.style.height=u/9+"px",e.style.fontSize=u/9/3+"px",e.style.marginTop="-20px"}),[].forEach.call(F,function(e){e.style.height=u/11+"px",e.style.fontSize=u/9/2+"px"}),[].forEach.call(t,function(e){e.style.height=u/12+"px",e.style.fontSize=u/9/2+"px"})}var l=[],n;$("#contact").html("CONTACT").click(function(){$("#one, #two").toggleClass("hid"),$("#one, #two").toggleClass("vis")}),console.log("95"),$("#but").click(function(u){console.log("97"),u.preventDefault(),t()}),$("#close").click(function(){$("#error").html("&nbsp;").removeClass("actif"),u($("#form")),$("#one, #two").toggleClass("vis"),$("#one, #two").toggleClass("hid")}),$("input,textarea").on("click",function(){$("label").removeClass("bad_input")}),window.onresize=a,a()});