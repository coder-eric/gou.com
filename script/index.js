$(function(){
	//划过我的麦乐购显示下拉列表
	$("#btnHide").click(function(){
		$(".ad-top-wrap").css("display","none");
	})
	$(".head-right ul li:first").mouseenter(function(){
		$("#noneCon").css("display","block").stop().animate({"height":"161px"},300)
	}).mouseleave(function(){
		setTimeout(function(){
			$("#noneCon").stop().animate({"height":"36px"},300,function(){
				$(this).css("display","none")
			})
		},100)
	})
	//划过手机麦乐购显示下拉列表
	$(".head-right ul li:last").mouseenter(function(){
		$(".head-right-last").css("display","block").stop().animate({"height":162},300)
	}).mouseleave(function(){
		$(".head-right-last").stop().animate({"height":35},300,function(){
			$(this).css("display","none")
		})
	})
	//整点抢的动画效果
	setInterval(function(){
		$(".on-time span").eq(0).css("top",0).stop().animate({"top":-30},500,function(){
			$(this).css("top",30).stop().animate({"top":0},500)
		})
		setTimeout(function(){
			$(".on-time span").eq(1).css("top",0).stop().animate({"top":-30},500,function(){
				$(this).css("top",30).stop().animate({"top":0},500)
			})
		},100)
		setTimeout(function(){
			$(".on-time span").eq(2).css("top",0).stop().animate({"top":-30},500,function(){
				$(this).css("top",30).stop().animate({"top":0},500)
			})
		},200)
	},3000)
	
	
//banner开始
	function Banner(){
		this.index = 0;
		this.timer = null;
		this.init();
	}
	//初始化
	Banner.prototype.init = function(){
		this.createBanner();
		this.autoChange();
		this.overOut();
	}
	//加载图片
	Banner.prototype.createBanner = function(){
		$.ajax({
			type:"get",
			url:"json/banner.json",
			success:function(xhr){
				//banner加载图片
				var html = "";
				for( var i in xhr.big ){
					html += `<a href="${xhr.big[i].href}" data-color="${xhr.big[i].bgcolor}">
								<img src="${xhr.big[i].src}"/>
							</a>`;
				}
				$(".banner-inner").append( html );
				$(".banner-wrap").css("background",xhr.big[0].bgcolor);
				//banner-small加载图片
				html = "";
				for( var i in xhr.small ){
					html += `<a href="${xhr.small[i].href}" class="small">
								<img src="${xhr.small[i].src}"/>
							</a>`;
				}
				$(".banner-small").append( html );
				//banner-right加载图片
				html = "";
				for( var i in xhr.right ){
					html += `<a href="${xhr.right[i].href}">
								<img src="${xhr.right[i].src}"/>
							</a>`;
				}
				$(".banner-right").append( html );
			}
		});
	}
	//自动切换
	Banner.prototype.autoChange = function(){
		var that = this;
		this.timer = setInterval(function(){
			that.index++;
			if( that.index==5 ){
				that.index=0;
			}
			that.refresh();
		},4000)
	}
	//刷新图片
	Banner.prototype.refresh = function(){
		$(".banner-inner>a").eq(this.index).addClass("on").fadeIn(1000).find("img").css({"width":840,"left":-15,"top":-9}).stop().animate({"width":810,"left":0,"top":0},3000).parent().siblings().removeClass("on").fadeOut(1000);
		var str = $(".banner-inner>a").eq(this.index).data("color");
		$(".banner-wrap").css("background",str);
		$(".banner-small a").eq(this.index).stop().animate({"top":-10},500).siblings().stop().animate({"top":0},500)
	}
	//鼠标划入划出
	Banner.prototype.overOut = function(){
		var that = this;
		//鼠标划入切换
		$(".banner-small a").mouseover(function(){
			that.timer = clearInterval(that.timer);
			that.index=$(this).index();
			that.refresh();
		})
		//鼠标划出
		$(".banner-small a").mouseout(function(){
			that.autoChange();
		})
	}
	var banner = new Banner();
	//banner中的导航
	//选项卡切换
	function Tab(){
		this.index=0;
		this.init();
	}
	//初始化函数
	Tab.prototype.init = function(){
		this.refresh();
		this.change();
	}
	//划过导航改变index值
	Tab.prototype.change = function(){
		var that = this;
		$(".nav-all ul li").mouseover(function(){
			that.index = $(this).index();
			$(this).css("background","#a90000").find("div").stop().animate({"left":15},100);
			that.refresh();
			$(".nav-tab").fadeIn(100).stop().animate({"left":180},100)
		})
		$(".nav-all ul li").mouseout(function(){
			that.index = $(this).index();
			$(this).css("background","#cb3e25").find("div").stop().animate({"left":0},100);
			$(".nav-tab").css("display","none").stop().animate({"left":165},100)
		})
	}
	//根据index刷新导航动画，显示对应内容
	Tab.prototype.refresh = function(){
		var that = this;
		$.ajax({
			type:"get",
			url:"json/nav.json",
			async:true,
			success:function(xhr){
				var html = "<ul>";
				var msg = xhr[that.index];
				for( var i in  msg){
					html += `<li><h5>${msg[i].title}</h5>`;
					for( var j in msg[i].linkA ){
						html += `<a href="${msg[i].linkA[j].href}" style="color:${msg[i].linkA[j].color}">${msg[i].linkA[j].content}</a>`;
					}
					html+=`</li>`;
				}
				html += `</ul>`;
				$(".nav-tab").html(html);
			}
		});
	}
	var tab = new Tab();
	
	
	
	

})
