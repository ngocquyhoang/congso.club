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
	var image_input_type = radioButton.val();
	showImageImport(radioButton.val());
})
// else
$(document).ready(function() {
	$('#contributed-image .select-box input[name="image-select"]').on('ifClicked', function (event) {
		$('#contributed-image .select-box .sel-el').removeClass('actived');
		$(this).closest("div div.sel-el").addClass('actived');
		var image_input_type = $(this).val();
		showImageImport(this.value);
	});
});
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
	alert(1);
	var name = $('#contributed-image input[name="name"]').val();
	var email = $('#contributed-image input[name="email"]').val();
	var title = $('#contributed-image input[name="title"]').val();
	var noted = $('#contributed-image textarea[name="noted"]').val();
	var image;
	alert(name, email, title, noted);
	if (image_input_type.length == 0) {
		alert("ko co");
	} else{
		alert(image_input_type);
	};
	if (checkSendMessageValue( email, title, image_input_type, image )) {
		alert('true');
	} else{
		alert('fales');
	};
});
function checkSendMessageValue ( email, title, image_input_type, image ) {
	if (email == "") {
		return false;
	} else{
		return true;
	};
}
