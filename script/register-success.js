$(function(){
	$(".login-top").load("../public.html .login-top");
	$("footer").load("../public.html footer");
	str = location.href;
	var arr = str.split("?");
	var arr = arr[1].split("=");
	var tel = arr[1];
	var reg = /^(\d{3})\d{4}(\d{4})$/;
	tel = tel.replace(reg, "$1****$2");
	$(".top p:nth-child(2)").html(`恭喜您，您的账户注${tel}册成功！`);
})
