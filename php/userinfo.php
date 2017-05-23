<?php
//引入公共文件
	include "public.php";
//接收数据
	$status = $_POST["status"];
	$uname = $_POST["uname"];
	$upwd = $_POST["upwd"];
//判断注册还是登陆还是用户名检测	
	if( $status == "login" ){//登陆
		$sql = "select * from `users` where phone='$uname'";
	
		$res = mysql_query( $sql );
		$arr = mysql_fetch_array($res);
	
		if( $arr ){
			if( $arr["upwd"] == $upwd ){
			echo 1;//登陆成功
			}else{
			echo 2;//用户名密码不符
			}
		}else{
			echo 0;//用户名不存在
		}
	}else if( $status == "register" ){//注册
		$sql = "insert into `users`(`uid`, `phone`, `upwd`) values ('','$uname','$upwd')";
	
		$res = mysql_query( $sql );
		
		if( $res ){
			echo 1;//注册成功
		}else{
			echo 0;//注册失败
		}
	}else if( $status == "phonecheck" ){//用户名检测
		$sql = "select * from `users` where phone='$uname'";
	
		$res = mysql_query( $sql );
		$arr = mysql_fetch_array($res);
	
		if( $arr ){
			echo 1;//用户名重名
		}else{
			echo 0;//可以使用
		}
	}
?>