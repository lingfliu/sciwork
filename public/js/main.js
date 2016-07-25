var pageh;
var pagew;
var winh;
var winw;

var username_check = function(username){
	var reg_mobil = new RegExp("^[0-9]*$");			
	var reg_email = new RegExp("[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,4}");
	
	if (username == '') {
		return 0;
	}
	else if (reg_email.test(username)){
		return 1;
	}
	else if (reg_mobil.test(username)){
		return 2;
	}
	else {
		return -1;
	}	
};

var do_sign = function(username, password, op){	
	var chk = username_check(username);
	var moile = '';
	var email = '';
	var sign_data = {};

	if ( chk == 1){
		sign_data = {
			"pwd": password,
			"email": username,
			"op": op
		}				
	}
	else if (chk == 2){
		sign_data = {
			"pwd": password,
			"mobile": username,			
			"op": op
		}
	}	
	else {
	//retype username	
		// alert("username invalid");
		$("#username input").focus();
		return;
	}
	// alert('op = ' + op);
	$.ajax({
		url: 'user',
		type: 'POST',
		contentType: 'application/json',
		data: JSON.stringify(sign_data),
		dataType: 'json',
		success: function(data, status, xhr){			
			if (op == 0){
				if (data.err){
					if (data.err == 'taken'){
						var chk_info = $("#username .chk_info");
						if (chk_info){
					    	chk_info.replaceWith($("<div class='chk_info'>已注册</div>"));													
						}
					}
					else {
						var sign_info = $(".sign_info");					
						if (sign_info){
							sign_info.remove();
						}
						$(".wrapper").append("<div class='sign_info'>注册失败</div>");					
					}
				}
				else if (data.uid) {
					alert('uid');
					var sign_info = $(".sign_info");					
						if (sign_info){
							sign_info.remove();
						}
					$(".wrapper").append("<div class='sign_info'>注册成功 <br> <a href='index.html'>返回</a> <br> <a href='profile.html'>完善我的资料</a>, </div>");					
				}
			}
			else if (op == 1){				
				if (data.err){					
					if (data.err == 'pwd'){
						var chk_info = $("#pwd .chk_info");
						if ($("#pwd .chk_info"))
					    	$("#pwd .chk_info").remove();					    
						$("#pwd").append("<div class='chk_info'><a href='index.html'>忘记密码?</a></div>");						
					}
				}
				else if (data.uid) {
					//goto index
					if ($("#pwd .chk_info"))							
					    $("#pwd .chk_info").remove();

					$(".wrapper").append("<div class='sign_info'>登录成功 <br> <a href='index.html'>返回</a></div>");					  
				}

			}
			else if (op == 3){				
				if (data.usr){
					var pos = $("#notebox").position().left;
					if (pos >= $("#signin button").position().left){
						if (data.usr == 'none') {
						}
					}
					else {
						if (data.usr == 'exist') {
						}	
					}										
				}				
			}
			else{
				//do nothing
			}
		    },
		error: function(xhr, err, exception){				
				$(".wrapper").append("<div class='sign_info'>错误</div>");
			}});					
};

$("document").ready(function(){
	pageh = $("document").height();
	pagew = $("document").width();

	winh = $("window").height();
	winw = $("window").width();

	$("input").click(function(){
	// $("input").mouseenter(function(){
		var val = $(this).val();		
		$(this).val("").focus().val(val);		
	});
	$("input").mouseleave(function(){		

	});

	//initialization
	$("#username input").val("").focus();

	var left = $("#signup button").css("marginLeft");
	$("#notebox").css({"left":left});

	$("#username input").keypress(function(event){
		var keycode = (event.keyCode ? event.keyCode : event.which);
		if (keycode == '13' || keycode == '9'){ //enter and tab indicate finish of input
			//perform username check
			var username = $(this).val();
			
			//if invalid, show	
			var chk_res = username_check(username);			
			if (chk_res < 0){				
				// alert("invalid");
				var chk_info = $("#username .chk_info");
				$("#username .chk_info").replaceWith($("<div class='chk_info'>Invalid</div>"));							
			}
			else if (chk_res == 0){
				// alert("empty");
				$("#username .chk_info").remove();
				$("#username").append("<div class='chk_info'></div>");
			}
			else if (chk_res == 1){ //email
				$("#username .chk_info").remove();
				$("#username").append("<div class='chk_info'>email</div>");		
			}	
			else if	(chk_res == 2) { //mobil
				$("#username .chk_info").remove();
				$("#username").append("<div class='chk_info'>mobile</div>");
			}	
			
			do_sign(username, '', 3);
			$("#pwd input").focus();			
			return false;
		}
	});

	$("#pwd input").keypress(function(event){				
		var keycode = (event.keyCode ? event.keyCode : event.which);
		if (keycode == '13'){ //enter key						
			var username = $("#username input").val();
			var password = $("#pwd input").val();

			var pos = $("#notebox").position().left;
			if (pos < $("#signin button").position().left){
				do_sign(username, password, 0);
				// alert("signup");
			}
			else {
				do_sign(username, password, 1);
				// alert("signin");
			}
			//do not return false for other keypress events
			return false;			 
		}			
		else if (keycode == '9'){ //tab key
			$("#username input").focus();
			return false;
		}
	});

	$("#signin button").mouseenter(function(){

	});
	$("#signin button").mouseleave(function(){
		$(this).blur();
	});

	$("#signup button").mouseenter(function(){
		
	});

	$("#signup button").mouseleave(function(){
		// $(this).blur();		
	});

	$("#signup button").click(function(){		
		var left = $(this).css("marginLeft");//+$(this).position().left;//+$(this).width()+20;				
		$("#notebox").animate({"left":left},"fast");
		
		var username = $("#username input").val();
		var password = $("#pwd input").val();
		do_sign(username, password, 0);
		return false;
	});

	$("#signin button").click(function(){		
		var left = $(this).position().left;			
		$("#notebox").animate({"left":left},"fast");	
		var username = $("#username input").val();
		var password = $("#pwd input").val();
		do_sign(username, password, 1);
		return false;
	});
});

