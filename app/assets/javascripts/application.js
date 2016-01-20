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
	$('.zorba-logo').click(function() {
		$('.thank-box').slideDown(750);
		setTimeout(function(){ $('.thank-box .loadding-logo').hide(50); }, 1750);
		setTimeout(function(){ $('.thank-box .thank-text').show(50); }, 1800);
		setTimeout(function(){ $('.thank-box').slideUp(750); }, 2500);
		setTimeout(function(){ $('.thank-box .loadding-logo').show(); }, 3250);
		setTimeout(function(){ $('.thank-box .thank-text').hide(); }, 3250);
	});
}
