// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require_tree .
// $(document).ready(function(){
//     var facebookShareUrl = window.location.href;
//     $('.facebook-share-button').attr("href", "http://www.facebook.com/sharer.php?u=" + facebookShareUrl);
// });

// scroll top 
$(window).scroll(function() {
if ($(this).scrollTop() > 1){  
    $('header').addClass("sticky");
    $('.main-content').addClass("sticky");
  }
  else{
    $('header').removeClass("sticky");
    $('.main-content').removeClass("sticky");
  }
});
$(document).ready(function() {
	showThankbox();	
});
function showThankbox () {
	$('.follow button#send-email').click(function() {
		// call ajax
		var name = $('.follow-us-by-mail .follow .name').val();
		var email = $('.follow-us-by-mail .follow .email').val();
		$.ajax({
	      url: "/offices/sendmail",
	      type: "POST",
	      dataType: "json",
	      data: {"name": name, "email": email},
	      success: function(data) {
        	if (typeof data["notice"] != 'undefined') {
        		$('.notice-box .notice-content').addClass('success');
        		$('.notice-box .notice-content .notice-text .text').html('Cảm ơn bạn đã ghé thăm');
        		$('.follow-us-by-mail .follow input').val("");
        	} else{
        		$('.notice-box .notice-content').addClass('error');
        		// show error
        		var eM = "";
        		if (data["errorMessage"].length == 1) {
        			eM = data["errorMessage"][0];
        		}else{
        			eM = data["errorMessage"][0] + "<br />" + data["errorMessage"][1];
        		};
        		$('.notice-box .notice-content .notice-text .text').html(eM);
        		// clear data
        		if(data["clearDataField"].length == 1){
        			$('.follow-us-by-mail .follow .' + data["clearDataField"][0]).val("");
        		}else{
        			// clear all
        			$('.follow-us-by-mail .follow input').val("");
        		}
        		// focus error field
        		if (data["focusElement"] != "") {
        			$('.follow-us-by-mail .follow .' + data["focusElement"]).focus();
        		};
        	};
        }
	    });
		// end call
		// show in view
		setTimeout(function(){ $('.notice-box').show( "slide", {direction:'up'}, 750 ); }, 50);
		setTimeout(function(){ $('.notice-box').hide( "slide", {direction:'up'}, 750 ); }, 1800);
		// remove class and clear data
		setTimeout(function(){
			$('.notice-box .notice-content').removeClass('success error');
		}, 2550);
	});
}
