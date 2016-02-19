// function icheck call
function icheck(){
	if($(".icheck-me").length > 0){
		$(".icheck-me").each(function(){
			var $el = $(this);
			var skin = ($el.attr('data-skin') !== undefined) ? "_" + $el.attr('data-skin') : "",
			color = ($el.attr('data-color') !== undefined) ? "-" + $el.attr('data-color') : "";
			var opt = {
				checkboxClass: 'icheckbox' + skin + color,
				radioClass: 'iradio' + skin + color,
			}
			$el.iCheck(opt);
		});
	}
}
$(function(){
	icheck();
})
// on view
$('#contributed-image .select-box .sel-el').click(function(event) {
	radioButton = $(this).find('input');
	radioButton.iCheck('check');
	$('#contributed-image .select-box .sel-el').removeClass('actived');
	$(this).addClass('actived');
	showImageImport(radioButton.val());
})
// else
$(document).ready(function() {
	$('#contributed-image .select-box input[name="image-select"]').on('ifClicked', function (event) {
		$('#contributed-image .select-box .sel-el').removeClass('actived');
		$(this).closest("div div.sel-el").addClass('actived');
		showImageImport(this.value);
	});
	importImageUpload();
	importImageLink();
	importImageIdea();
});
function importImageUpload () {
	$('#contributed-image input.upload-image-file').change(function() {
		// check value 
		imageUploadEl = $('#contributed-image input.upload-image-file');
		var imageUploadVal = $('#contributed-image input.upload-image-file').val();
		var type = imageUploadEl[0].files["0"].type;
		var size = imageUploadEl[0].files["0"].size;
		$('#contributed-image .upload-image-data .add-image-infomation ul li').removeClass('error success');
		if (size > 10000000) {
			$('#contributed-image .upload-image-data .add-image-infomation ul li.size').addClass('error');
		}else{
			$('#contributed-image .upload-image-data .add-image-infomation ul li.size').addClass('success');
		};
		if (type === "image/png" || type === "image/jpeg" || type === "image/gif") {
			$('#contributed-image .upload-image-data .add-image-infomation ul li.type').addClass('success');
		} else{
			$('#contributed-image .upload-image-data .add-image-infomation ul li.type').addClass('error');
		};
		$('#contributed-image .add-image-button').removeClass('error success');
		var anhphuong = $('#contributed-image .upload-image-data .add-image-infomation ul').find('.success');
		if (anhphuong.length == 2) {
			$('#contributed-image .add-image-button').addClass('success');
		} else{
			$('#contributed-image .add-image-button').addClass('error');
		};
	});
}
function importImageLink () {
	$('#contributed-image .add-link-data input').blur(function() {
		$('#contributed-image .add-link-data input').removeClass('error success');
		var imageLink = $('#contributed-image .add-link-data input').val();
		if (ValidURL(imageLink)) {
			$('#contributed-image .add-link-data input').addClass('success');
		} else{
			$('#contributed-image .add-link-data input').addClass('error');
		};
	});
}
function importImageIdea () {
	$('#contributed-image .add-idea-data textarea').blur(function() {
		$('#contributed-image .add-idea-data textarea').removeClass('error success');
		var imageIdea = $('#contributed-image .add-idea-data textarea').val();
		if (imageIdea !== "") {
			$('#contributed-image .add-idea-data textarea').addClass('success');
		} else{
			$('#contributed-image .add-idea-data textarea').addClass('error');
		};
	});
}
function showImageImport (value) {
	$('#contributed-image .modal-add-file').slideUp(420);
	if ($('#contributed-image .modal-add-file').is(":visible")) {
		setTimeout(function(){ 
			$('#contributed-image .' + value + '-data').slideDown(420);
		}, 420);
	} else{
		$('#contributed-image .' + value + '-data').slideDown(420);
	};
}
// check value
$('#contributed-image button.send-image').click(function(event) {
	var name = $('#contributed-image input[name="name"]').val();
	var email = $('#contributed-image input[name="email"]').val();
	var title = $('#contributed-image input[name="title"]').val();
	var noted = $('#contributed-image textarea[name="noted"]').val();
	var image_input_type_el = $('#contributed-image .select-box').find('.sel-el.actived');
	var image_input_type = "false";
	if (image_input_type_el.attr('name')) {
		image_input_type = image_input_type_el.attr('name');
	};
	if (checkSendMessageValue( email, title, image_input_type )) {
		ngocquyhoang = $('#contributed-image input.upload-image-file');
		if (image_input_type == "upload-image") { var image = ngocquyhoang[0].files[0];};
		if (image_input_type == "add-link") { var image = $('#contributed-image .add-link-data input').val();};
		if (image_input_type == "add-idea") { var image = $('#contributed-image .add-idea-data textarea').val();};
		console.log(name);
		console.log(email);
		console.log(title);
		console.log(noted);
		console.log(image_input_type);
		console.log(image);
		$.ajax({
			url: "/dev_sendimage",
			type: "POST",
			processData: false,
			data: {"name": name, "email": email, "title": title, "noted": noted, "image_input_type": image_input_type, "image": image},
			success: function(data) {
				window.location.href = data["redirect_page"];
			}
		});
	} 
});
function checkSendMessageValue ( email, title, image_input_type) {
	if (email == "") {
		$('#contributed-image input[name="email"]').focus();
		showNotice("error", "Bạn chưa nhập Email");
		return false
	} else{
		if (!isValidEmailAddress(email)) {
			$('#contributed-image input[name="email"]').focus();
			showNotice("error", "Email không đúng định dạng");
			return false
		} else{
			if (title == "") {
				$('#contributed-image input[name="title"]').focus()
				showNotice("error", "Có vẻ như bạn chưa nhập tiêu đề");
				return false
			} else{
				if (image_input_type == "false") {
					showNotice("error", "Hãy chọn 1 trong 3 phương thức nhập hình ảnh dưới đây");
					return false
				} else{
					switch(image_input_type) {
						case "upload-image":
							if ($('#contributed-image .add-image-button').hasClass('error')) {
								showNotice("error", "Ảnh của bạn không đủ điều kiện, vui lòng kiểm tra lại");
								return false;
							} else{
								if ($('#contributed-image .add-image-button').hasClass('success')) {
									return true
								} else{
									showNotice("error", "Bạn chưa Upload ảnh của mình lên");
									return false;
								};
							};
							break;
						case "add-link":
							var error = $('#contributed-image .add-link-data input').hasClass('error');
							var success = $('#contributed-image .add-link-data input').hasClass('success');
							if (error) {
								$('#contributed-image .add-link-data input').focus();
								return false
							}else{
								if (success) {
									return true
								}else{
									$('#contributed-image .add-link-data input').focus();
									showNotice("error", "Bạn chưa nhập đường dẫn ảnh");
									return false
								};
							}
							break;
						case "add-idea":
							var error = $('#contributed-image .add-idea-data textarea').hasClass('error');
							var success = $('#contributed-image .add-idea-data textarea').hasClass('success');
							if (error) {
								$('#contributed-image .add-idea-data textarea').focus();
								return false
							} else{
								if (success) {
									return true
								} else{
									$('#contributed-image .add-idea-data textarea').focus();
									showNotice("error", "Bạn chưa nhập ý tưởng");
									return false
								};
							};
							break;
						default:
							showNotice("error", "Đã xảy ra lỗi, vui lòng tải lại trang Web");
							return false
					};
				};
			};
		};
	};
}
// validate URL function
function ValidURL(url) {
	return url.match(/^(ht|f)tps?:\/\/[a-z0-9-\.]+\.[a-z]{2,4}\/?([^\s<>\#%"\,\{\}\\|\\\^\[\]`]+)?$/);
}
// validate email
function isValidEmailAddress(emailAddress) {
	var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
	return pattern.test(emailAddress);
};
