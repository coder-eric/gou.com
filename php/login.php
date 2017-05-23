<?php
	include "public.php";
	$uname = $_POST["uname"];
	$upwd = $_POST["upwd"];
	
	$sql = "select * from `users` where phone='$uname'";
	
	$res = mysql_query( $sql );
	$arr = mysql_fetch_array($res);
	
	if( $arr ){
		if( $arr["upwd"] == $upwd ){
		echo "<script>alert('登录成功');location.href='../index.html';</script>";
		}else{
		echo "<script>alert('密码错误');location.href='../user/login.html';</script>";
		}
	}else{
		echo "<script>alert('用户名不存在');location.href='../user/login.html';</script>";
	}
?>