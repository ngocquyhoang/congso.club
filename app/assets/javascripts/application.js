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

$(document).ready(function() {
	// contact page
	sendMessage();
	// add new follow 
	addNewFollow();	
	// like image
	likeImage();
	// about page - zorba
	zorbaSlider();
	// add new image
	addNewImage();
});
// contact form
function addNewFollow () {
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
					showNotice("success", "Cảm ơn bạn đã ghé thăm");
					$('.follow-us-by-mail .follow input').val("");
				} else{
					// show error
					var eM = "";
					if (data["errorMessage"].length == 1) {
						eM = data["errorMessage"][0];
					}else{
						eM = data["errorMessage"][0] + "<br />" + data["errorMessage"][1];
					};
				showNotice("error", eM);
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
	});
};
function likeImage () {
	// like button
	$('.page-secction .image-box .image-shadow .like-icon').click(function() {
		if ($(this).attr("name") == "liked") {
			// do nothing
		}else{
			// call ajax
			idPost = $(this).attr('name');
			$.ajax({
				url: "/offices/like",
				type: "POST",
				dataType: "script",
				data: {"idPost": idPost},
			});
			//set value and add class
			likeCount = parseInt($('.funny-section#' + idPost + ' .image-box .image-shadow .like-count').html());
			$('.funny-section#' + idPost + ' .image-box .image-shadow .like-count').html(likeCount + 1);
			// disable lile button ann add class liked
			$(this).addClass('liked');
			$(this).attr("name","liked");
		};
	});
};
// send message (contact page)
function sendMessage () {
	$('.message-page .message-page-box .message-box button.send-messages').click(function() {
		var name = $('.message-page .message-page-box .message-box input[name="name"]').val();
		var email = $('.message-page .message-page-box .message-box input[name="email"]').val();
		var message = $('.message-page .message-page-box .message-box textarea').val();
		// check value
		if (name == "") {
			showNotice("error", "Có vẻ như bạn chưa nhập tên của mình");
			$('.message-page .message-page-box .message-box input[name="name"]').focus();
		}else{
			// validate requied
			if (email == "") {
				showNotice("error", "Cho chúng tôi biết Email của bạn để có thể trả lời thư của bạn khi cần");
				$('.message-page .message-page-box .message-box input[name="email"]').focus();
			}else{
				// validate message
				if (message == "") {
					// message error
					showNotice("error", "Bạn muốn nói gì với chúng tôi vậy ?");
					$('.message-page .message-page-box .message-box textarea').focus();
				}else{
					// validate email type
					if (!isValidEmailAddress( email )) {
						showNotice("error", "Có vẻ như email bạn nhập chưa chính xác");
						$('.message-page .message-page-box .message-box input[name="email"]').val("");
						$('.message-page .message-page-box .message-box input[name="email"]').focus();
					}else{
						// pass js and call ajax
						if (name !== "" && email !== "" && message !== "") {
							// call ajax
							$.ajax({
								url: "/contact/message",
								type: "POST",
								dataType: "json",
								data: {"name": name, "email": email, "message" : message},
								success: function(data) {
									if (data["notice"] == "success") {
										showNotice("success", "Cảm ơn bạn đã dành thời gian cho chúng tôi.<br />Chúc bạn một ngày tốt lành !");
										$('.message-page .message-page-box .message-box input').val("");
										$('.message-page .message-page-box .message-box textarea').val("");
									}else{
										showNotice("error", "Đã có lỗi xảy ra trong quá trình gửi, mong bạn vui lòng thử lại !");
										$('.message-page .message-page-box .message-box input').val("");
										$('.message-page .message-page-box .message-box textarea').val("");
									};
								}
							});
						};
					};
				};
			};
		};
	});
}
// validate email by js
function isValidEmailAddress(emailAddress) {
	var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
	return pattern.test(emailAddress);
};
// zorba slide
function zorbaSlider () {
	$('.infomation .info-slide .slider-button .next').click(function() {
		nextSlide();
	});
	$('.infomation .info-slide .slider-button .prev').click(function() {
		prevSlide();
	});
	selectSlide();
	setInterval(function(){ nextSlide(); }, 3000);
}
function selectSlide () {
	$('.infomation .info-slide .slider-control li').click(function() {
		var selectId = $(this).attr('name');
		$('.infomation .info-slide .slider-control li').removeClass('active');
		$(this).addClass('active');
		$('.infomation .info-slide .slide-content li').removeClass('active');
		$('.infomation .info-slide .slide-content').find('li[name="' + selectId + '"]').addClass('active');
	});
};
function prevSlide () {
	var currentSelector = $('.infomation .info-slide .slide-content').find('.active');
	var currentId = currentSelector.attr('name');
	if (currentId == "1") {
		$('.infomation .info-slide .slide-content').find('li[name="3"]').addClass('active');
		$('.infomation .info-slide .slider-control li').removeClass('active');
		$('.infomation .info-slide .slider-control').find('li[name="3"]').addClass('active');
	}else{
		if (currentId == "2") {
			$('.infomation .info-slide .slide-content').find('li[name="1"]').addClass('active');
			$('.infomation .info-slide .slider-control li').removeClass('active');
			$('.infomation .info-slide .slider-control').find('li[name="1"]').addClass('active');
		}else{
			$('.infomation .info-slide .slide-content').find('li[name="2"]').addClass('active');
			$('.infomation .info-slide .slider-control li').removeClass('active');
			$('.infomation .info-slide .slider-control').find('li[name="2"]').addClass('active');
		};
	};
	currentSelector.removeClass('active');
};
function nextSlide () {
	var currentSelector = $('.infomation .info-slide .slide-content').find('.active');
	var currentId = currentSelector.attr('name');
	if (currentId == "1") {
		$('.infomation .info-slide .slide-content').find('li[name="2"]').addClass('active');
		$('.infomation .info-slide .slider-control li').removeClass('active');
		$('.infomation .info-slide .slider-control').find('li[name="2"]').addClass('active');
	}else{
		if (currentId == "2") {
			$('.infomation .info-slide .slide-content').find('li[name="3"]').addClass('active');
			$('.infomation .info-slide .slider-control li').removeClass('active');
			$('.infomation .info-slide .slider-control').find('li[name="3"]').addClass('active');
		}else{
			$('.infomation .info-slide .slide-content').find('li[name="1"]').addClass('active');
			$('.infomation .info-slide .slider-control li').removeClass('active');
			$('.infomation .info-slide .slider-control').find('li[name="1"]').addClass('active');
		};
	};
	currentSelector.removeClass('active');
};
// show notice function
function showNotice (type, message) {
	$('.notice-box .notice-content').addClass(type);
	$('.notice-box .notice-content .notice-text .text').html(message);
	setTimeout(function(){ $('.notice-box').show( "slide", {direction:'up'}, 750 ); }, 50);
	setTimeout(function(){ $('.notice-box').hide( "slide", {direction:'up'}, 750 ); }, 1800);
	setTimeout(function(){
		$('.notice-box .notice-content').removeClass('success error');
	}, 2550);
}
// add new image  (for manage)
function addNewImage () {
	$('.image-form .field .add-image-button').click(function() {
		$('.image-form .field input[type="file"].add-image-field').click();
	});
	$('.image-form .field input[type="file"].add-image-field').change(function() {
		imageInput = $('.image-form .field .add-image-field');
		var imageFile = $('.image-form .field input[type="file"].add-image-field').val();
		var type = imageInput[0].files["0"].type;
		var size = imageInput[0].files["0"].size;
		// clear class
		$('.image-form .field .add-image-infomation ul li').removeClass('error success');
		// check value
		if (size > 10000000) {
			$('.image-form .field .add-image-infomation ul li.size').addClass('error');
		}else{
			$('.image-form .field .add-image-infomation ul li.size').addClass('success');
		};
		if (type !== "image/png" || type !== "image/jpeg" || type !== "image/gif") {
			$('.image-form .field .add-image-infomation ul li.type').addClass('error');
		} else{
			$('.image-form .field .add-image-infomation ul li.type').addClass('success');
		};
	});
	var  title = $('.image-form .field input.title-image').val();
	var  owner = $('.image-form .field input.owner-image').val();
};
function validateAddNewImageForm () {
	$('.add-image-notice').click(function() {
		var  title = $('.image-form .field input.title-image').val();
		var  owner = $('.image-form .field input.owner-image').val();
		var imageFile = $('.image-form .field input[type="file"].add-image-field').val();
		if (title == "") {
			// name empty
			showNotice("error", "Bạn chưa nhập tiêu đề cho ảnh ");
			$('.image-form .field input.title-image').focus();
		}else{
			if (imageFile !== "") {
				if (addNewImageErrorArray.length === 0) {
					alert("pass");
				}else{
					alert("reeor");
				};
			}else{
				showNotice("error", "Bạn chưa chọn ảnh sẽ hiển thị");
			};
		};
	});
}
