$(function(){
	$(".login-top").load("../public.html .login-top");
	$("footer").load("../public.html footer");
	function FormTest(){
		this.unameFlag =false;
		this.upwdFlag = false;
		this.verifyCodeFlag = false;
		this.init();
		this.verifyCode = new GVerify("v_container");
	}
	//初始化函数
	FormTest.prototype.init = function(){
		var that = this;
		$("#uname").blur(function(){
			that.phone();
		})
		$("#upwd").blur(function(){
			that.upwd();
		})
		$(".secuirtyCode input").blur(function(){
			that.verifyCodeCheck();
		})
		//提交表单验证
		this.submit();
	}
	//验证手机号码
	FormTest.prototype.phone = function(){
		var reg = /^1[3458][0-9]{9}$/;
		if( reg.test( $("#uname").val() ) ){
			$(".p1").css("display","none");
			this.unameFlag =true;
		}else if( !$("#uname").val() ){
			$(".p1").html("请输入账号").css("color","red");
			this.unameFlag =false;
		}else{
			$(".p1").html("您输入的手机号码格式错误，请重新输入!").css("color","red");
			this.unameFlag =false;
		}
	}
	//验证密码
	FormTest.prototype.upwd = function(){
		var reg = /^[\w\W]{6,20}$/;
		if( reg.test( $("#upwd").val() ) ){
			$(".p2").html("");
			this.upwdFlag = true;
		}else{
			$(".p2").html("密码长度必须为6-20个字符").css("color","red");
			this.upwdFlag = false;
		}
	}
	//确认验证码
	FormTest.prototype.verifyCodeCheck = function(){
		var res = this.verifyCode.validate($(".secuirtyCode input").val());
		if(res){
			$(".secuirtyCode input").next().css({"display":"block","background-position-y":-111});
			$(".p3").css("display","none");
			this.verifyCodeFlag = true;
		}else{
			$(".secuirtyCode input").next().css({"display":"block","background-position-y":-132});
			$(".p3").css("display","block");
			this.verifyCodeFlag = false;
		}
	}
	//验证上面内容
	FormTest.prototype.check = function(){
		this.phone();
		this.upwd();
		this.verifyCodeCheck();
		if( this.unameFlag && this.upwdFlag  && this.verifyCodeFlag ){
			return true;
		}else{
			return false;
		}
	}
	//提交数据
	FormTest.prototype.submit = function(){
		$("#login-btn").click(function(){
			$.ajax({
				type:"post",
				url:"../php/userinfo.php",
				data:"status=login&uname="+$("#uname").val()+"&upwd="+$("#upwd").val(),
				success:function(msg){
					switch( msg ){
						case "1": location.href="../index.html";break;
						case "0": alert("用户名不存在！");break;
						case "2": alert("用户名密码不符");
					}
				}
			})
		})
	}
	var formTest = new FormTest();
})
