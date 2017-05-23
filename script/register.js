$(function(){
	$(".login-top").load("../public.html .login-top");
	$("footer").load("../public.html footer");
	function FormTest(){
		this.phoneFlag = false;
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
		$("#confirm-upwd").blur(function(){
			that.confirmUpwd();
		})
		$(".secuirtyCode input").blur(function(){
			that.verifyCodeCheck();
		})
		$("#sms-code-btn").click(function(){
			that.smsCode();
		})
		this.submit();
	}
	//验证手机号是否被注册
	FormTest.prototype.phonecheck = function(){
		var that = this;
		$.ajax({
				type:"post",
				url:"../php/userinfo.php",
				data:"status=phonecheck&uname="+$("#uname").val()+"&upwd=0",
				success:function(msg){
					switch( msg ){
						case "0": that.phoneFlag = true;
								  $(".s1").html("可以使用").css("color","green");break;
						case "1": that.phoneFlag = false;
								  $(".s1").html("用户名重名").css("color","red");break;
						default: alert(msg);
					}
				}
			})
	}
	//验证手机号码
	FormTest.prototype.phone = function(){
		var reg = /^1[3458][0-9]{9}$/;
		if( reg.test( $("#uname").val() ) ){
			this.phonecheck();
			if( this.phoneFlag ){
				return true;
			}else{
				return false;
			}
		}else if( !$("#uname").val() ){
			$(".s1").html("请输入手机号码").css("color","red");
			return false;
		}else{
			$(".s1").html("您输入的手机号码格式错误，请重新输入!").css("color","red");
			return false;
		}
	}
	//验证密码
	FormTest.prototype.upwd = function(){
		var reg = /^[\w\W]{6,20}$/;
		if( reg.test( $("#upwd").val() ) ){
			$(".s2").html("");
			return true;
		}else{
			$(".s2").html("密码长度必须为6-20个字符").css("color","red");
			return false;
		}
	}
	//确认密码
	FormTest.prototype.confirmUpwd = function(){
		if( $("#confirm-upwd").val() == $("#upwd").val() ){
			$(".s3").html("");
			return true;
		}else{
			$(".s3").html("两次输入的密码不一致，请重新输入").css("color","red");
			return false;
		}
	}
	//确认验证码
	FormTest.prototype.verifyCodeCheck = function(){
		var res = this.verifyCode.validate($(".secuirtyCode input").val());
		if(res){
			$(".secuirtyCode input").next().css({"display":"block","background-position-y":-111});
			$(".s4").css("display","none");
			return true;
		}else{
			$(".secuirtyCode input").next().css({"display":"block","background-position-y":-132});
			$(".s4").css("display","block");
			return false;
		}
	}
	//短信验证
	FormTest.prototype.smsCode = function(){
		console.log( this.phone() +"-"+ this.upwd() +"-"+ this.confirmUpwd() +"-"+ this.verifyCodeCheck() )
		if( this.phone() && this.upwd() && this.confirmUpwd() && this.verifyCodeCheck() ){
			var seconds = 60;
			$("#sms-code-btn").css({"display":"none"}).next().html(`${seconds}秒后重新获取验证码`).css({"display":"block","color":"black"});
			var timer = setInterval(function(){
				seconds--;
				if( seconds>0 ){
					$("#sms-code-btn").css("display","none").next().html(`${seconds}秒后重新获取验证码`).css("display","block");
				}else{
					$("#sms-code-btn").css("display","block").next().css("display","none");
					clearInterval(timer);
				}
			},1000)
		}
	}
	//复选框验证
	FormTest.prototype.checkBox = function(){
		if( $("#registration-protocol").prop("checked") == true ){
			return true;
		}else{
			return false;
		}
	}
	FormTest.prototype.submit = function(){
		var that = this;
		$("#register-btn").click(function(){
			console.log( that.phone() +"-"+ that.upwd() +"-"+ that.confirmUpwd() +"-"+ that.verifyCodeCheck()  +"-"+ that.checkBox() +"-"+ that.phoneFlag)
			if( that.phone() &&  that.upwd() &&  that.confirmUpwd() && that.verifyCodeCheck() && that.verifyCodeCheck() ){
				$.ajax({
					type:"post",
					url:"../php/userinfo.php",
					data:"status=register&uname="+$("#uname").val()+"&upwd="+$("#upwd").val(),
					success:function(msg){
						switch( msg ){
							case "1": location.href="register-success.html?uname="+$("#uname").val();break;//注册成功，跳转主页
							case "0": alert("注册失败！");break;
							default : alert("报错");
						}
					}
				})
			}
		})
	}
	var formTest = new FormTest();
})
