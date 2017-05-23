<?php
	include "public.php";
	$uname = $_POST["uname"];
	$upwd = $_POST["upwd"];
	
	$sql = "insert into `users`(`uid`, `phone`, `upwd`) values ('','$uname','$upwd')";
	
	$res = mysql_query( $sql );
	
	if( $res ){
		echo "<script>alert('注册成功');location.href='../user/login.html';</script>";
	}else{
		echo "<script>alert('注册失败');location.href='../user/register.html';</script>";
	}
?>