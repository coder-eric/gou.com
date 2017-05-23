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
		$(".banner-inner>a").eq(this.index).addClass("on").fadeIn(1000).find("img").css({"width":840,"left":-15}).stop().animate({"width":810,"left":0,"top":0},3000).parent().siblings().removeClass("on").fadeOut(1000);
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
		this.create();
		this.change();
	}
	//加载导航数据
	Tab.prototype.create = function(){
		$.ajax({
			type:"get",
			url:"json/nav.json",
			async:true,
			success:function(xhr){
				var html = "<ul>";
				for( var i in xhr ){
					html += "<li><ul>";
					for( var j in  xhr[i]){
						html += `<li><h5>${xhr[i][j].title}</h5>`;
						for( var k in xhr[i][j].linkA ){
							html += `<a href="${xhr[i][j].linkA[k].href}" style="color:${xhr[i][j].linkA[k].color}">${xhr[i][j].linkA[k].content}</a>`;
						}
						html+=`</li>`;
					}
					html += `</ul></li>`;
				}
				html += "</ul>";
				$(".nav-tab").html(html);
			}
		});
	}
	//划过左侧导航改变显示对应内容
	Tab.prototype.change = function(){
		var that = this;
		$(".nav-all>ul>li").mouseenter(function(){
			that.index = $(this).index();
			$(this).css("background","#a90000").find("div").stop().animate({"left":15},100);
			$(".nav-tab>ul>li").eq(that.index).css("display","block").animate({"opacity":1,"left":180},100).siblings().animate({"opacity":0.3,"left":165},300).css({"display":"none"});
			$(".nav-tab").fadeIn(100).stop().animate({"left":180},100)
		})
		$(".nav-all>ul>li").mouseleave(function(){
			that.index = $(this).index();
			$(this).css("background","#cb3e25").find("div").stop().animate({"left":0},100);
			$(".nav-tab").css("display","none").stop().animate({"left":165},100)
		})
	}
	var tab = new Tab();
	//吸顶效果
	$(window).scroll(function(){
//		console.log($(".half-price").offset().top +"-"+$(document).scrollTop())
		if( $(".half-price").offset().top <=$(document).scrollTop()){
			$(".ceiling-wrap").stop().animate({"top":0},50)
		}else{
			$(".ceiling-wrap").stop().animate({"top":-40},50)
		}
	})
	//整点抢
	//宝贝加载
	$.ajax({
		type:"get",
		url:"json/on-time.json",
		success:function(xhr){
			var count = 0;
			for( var i in xhr ){
				var html = "";
				if( !count ){
					html = `<ul style="display:block">`;
					count++;
				}else{
					html = `<ul style="display:none">`;
				}
				for( var j in xhr[i] ){
					html+=`<li>
								<a href="${xhr[i][j].href}">
									<img src="${xhr[i][j].src}"/>
								</a>
								<a href="${xhr[i][j].href}"><span>${xhr[i][j].span}</span>${xhr[i][j].title}</a>
								<h1>¥<span>${xhr[i][j].price}</span></h1>
								<h5>价格¥<span>${xhr[i][j].prevprice}</span></h5>
								<a href="${xhr[i][j].href}">马上抢</a>
							</li>`;
				}
//				html=`</ul>`;
				$(".p-list").append(html);
			}
		}
	})
	$(".onTime .time li").click(function(){
		$(this).css("background","#CB351A").siblings().css("background","#6c6c6c");
		
	})
	
	//今日半价
	$.ajax({
		type:"get",
		url:"json/half-price.json",
		success:function(xhr){
			var html=`<ul>`;
			for( var i in xhr ){
				html+=`<li>
							<a href="${xhr[i].href}">
								<img src="${xhr[i].src}"/>
								<span><span>${xhr[i].span}</span>${xhr[i].title}</span>
								<h1>￥<span>${xhr[i].price}</span></h1>
								<h5>价格￥ <span>${xhr[i].prevprice}</span></h5>
								<p>已售&nbsp;${xhr[i].number}&nbsp;件</p>
								<div>马上抢<i></i></div>
							</a>
						</li>`;
			}
//			html=`</ul>`;
			$(".half-price").append(html);
		}
	})
	
	//特卖
	function Sale(){
		this.timer=null;
	}
	Sale.prototype.init = function(){
		this.create();
	}
	Sale.prototype.create = function(obj){
		var html = `<li>
						<a href="${obj.href}"><img src="${obj.src}"/></a>
						<div>
							<p>${obj.title}</p>
							<p>
								<i></i>
								<span>剩余 4天00小时40分32秒</span>
							</p>
							<span><b>${obj.discount}</b>折起</span>
						</div>
					</li>`;
					$(".sale ul").append(html);
	}
	$.ajax({
		type:"get",
		url:"json/sale.json",
		async:true,
		success:function(xhr){
			for( var i in xhr ){
				var obj = new Sale();
				obj.create(xhr[i]);
			}
		}
	});
	
	//猜你喜欢
	$.ajax({
		type:"get",
		url:"json/love.json",
		async:true,
		success:function(xhr){
			var count = 0;
			for( var i in xhr ){
				var html = "";
				if( !count ){
					html = `<ul style="display:block">`;
					count++;
				}else{
					html = `<ul style="display:none">`;
				}
				for( var j in xhr[i] ){
					html += `<li>
								<a href="${xhr[i][j].href}">
									<img src="${xhr[i][j].src}"/>
									<p><span>${xhr[i][j].span}</span>${xhr[i][j].title}</p>
									<h1>￥<b>${xhr[i][j].price}</b><span>价格<span>￥${xhr[i][j].prevprice}</span></span></h1>
								</a>
							</li>`;
				}
				$(".love-list").append(html)
			}
		}
	})
	
	//最近关注
	$.ajax({
		type:"get",
		url:"json/near.json",
		async:true,
		success:function(xhr){
			var html = `<ul>`
			for( var i in xhr ){
				html += `<li>
							<a href="${xhr[i].href}">
								<i></i>
								<img src="${xhr[i].src}"/>
								<i></i>
							</a>
						</li>`;
			}
			$(".nearest").append(html);
		}
	})
	
	
	
	
	
	
	
})
