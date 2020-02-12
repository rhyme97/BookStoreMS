
 let url=decodeURI(window.location.href);
 let onlineUser = url.split("=")[1];

window.onload = function() {
    $("body").css({
        "height": $(window).height()
    });
    $(".left_nav").css({
        "height": $(window).height()
    });
    $(".right").css({
        "height": $(window).height()
    });
     $(".right iframe").css({
        "height": $(window).height()-60+"px"
    });
       $('.people').text(onlineUser);
    /*如果目录有二级菜单添加图标*/
   $(".left_nav>ul>li>div>ul")
         .parent().parent().append(`
    		<span class="iconfont icon-sami-select add"></span>
    		`);
         userinit(onlineUser,"online");

    
}
  
 function userinit(u,s) {//改变在线状态
	$.ajax({
		type:'put',
		url:'/userstate',
		data:{username:u,state:s},
		dataType:'json',
		success:function(data) {
			if(data.flag == '1'){
				console.log(data)
			}
			if(data.flag == '2'){
				console.log(data)
			}
		}
	})
 }
window.onbeforeunload = function() {//下线

    userinit(onlineUser,"offline");
}

$(".left_nav>ul>li").click(function(){
	if ($(this).height()==45) {
        $(this).css({
          	"height":$(this).find('div').height()
        })
        $(this).find("span:nth-of-type(2)").width('100%');
        $(this).find("span:nth-of-type(2)").removeClass('navBg')
        $(this).siblings().find("span:nth-of-type(2)").addClass('navBg')

         $(this).siblings().find("span:nth-of-type(2)").css({
         	"width":"5px"
         })
        $(this).siblings().height('45px');
        $(this).find('.add').attr("class","iconfont icon-add-select add")
         $(this).siblings().find('.add').attr("class","iconfont icon-sami-select add")
	}
	
}).mouseover(function(){
	$(this).find(".navBg").width('100%');
}).mouseout(function(){
	$(this).find(".navBg").width('5px');
});
window.onresize=()=>{
	let fn=()=>{
		if ($("body").width() <= 900) {
	        return true;
	    }
	    else {
	       return false;
	    }
	}
	navState(fn);
}
$("#hideNav").on("click",function() {
  let fn=()=>{
		if ($(".left_nav").width()!=40) {
	        return true;
	    }
	    else {
	       return false;
	    }
	}
  navState(fn);
})
function navState(callback) {//导航显示隐藏函数
  if (callback()) {
 	$(".left_nav").width('40px');
	$(".right").css({
		"display":"absolute",
		"top":"0px",
		"left":"40px",
		"width":$("body").width()-40+"px"
	})
	$(".logo>img").css({
		"display":"none"
	});
	$(".left_nav").find(".add").css({
		"display":"none"
	})
  }else {
   	$(".left_nav").width('18%');
	$(".right").css({
		"display":"static",
		"width":"82%"
	});
	$(".logo>img").css({
		"display":"inline-block"
	});
    $(".left_nav").find(".add").css({
		"display":"block"
	})
  }
}
$(".exit").on("click",function() {
	location.href="../login.html";
})
$(".myindex").on('click',function() {
	$('iframe').attr('src','index.html')
})
/*权限管理*/
$(".sellRole").on('click',function(e) {
	$.ajax({
        type: 'post',
        url: '/users/user',
        data: { title: "username", content: onlineUser },
        dataType: 'json',
        success: function(data) {
        	
           if (data[0].role=='管理员'||data[0].role=='售卖员') {
               $('iframe').attr('src','sell.html')
           }else {
           	   e.preventDefault();
           	   $('body').append(`
					<div class="alert alert-danger" role="alert">
					<button class="close" data-dismiss="alert" type="button" >×</button>
					<p>您无权进入！</p>
					</div> 
					`);
				return;
           }
           
        }
    })
})
$(".borrowRole").on('click',function(e) {
	$.ajax({
        type: 'post',
        url: '/users/user',
        data: { title: "username", content: onlineUser },
        dataType: 'json',
        success: function(data) {
        	
           if (data[0].role=='管理员'||data[0].role=='借阅员') {
               $('iframe').attr('src','borrow.html')
           }else {
           	   e.preventDefault();
           	    $('body').append(`
					<div class="alert alert-danger" role="alert">
					<button class="close" data-dismiss="alert" type="button" >×</button>
					<p>您无权进入！</p>
					</div> 
					`);
				return;
           }
           
        }
    })
})
$(".supplierRole").on('click',function(e) {
	$.ajax({
        type: 'post',
        url: '/users/user',
        data: { title: "username", content: onlineUser },
        dataType: 'json',
        success: function(data) {
        	
           if (data[0].role=='管理员'||data[0].role=='进货员') {
               $('iframe').attr('src','supplier.html')
           }else {
           	   e.preventDefault();
           	    $('body').append(`
					<div class="alert alert-danger" role="alert">
					<button class="close" data-dismiss="alert" type="button" >×</button>
					<p>您无权进入！</p>
					</div> 
					`);
				return;
           }
           
        }
    })
})
$(".supplyRole").on('click',function(e) {
	$.ajax({
        type: 'post',
        url: '/users/user',
        data: { title: "username", content: onlineUser },
        dataType: 'json',
        success: function(data) {
        	
           if (data[0].role=='管理员'||data[0].role=='进货员') {
               $('iframe').attr('src','supply.html')
           }else {
           	   e.preventDefault();
           	    $('body').append(`
					<div class="alert alert-danger" role="alert">
					<button class="close" data-dismiss="alert" type="button" >×</button>
					<p>您无权进入！</p>
					</div> 
					`);
				return;
           }
           
        }
    })
})
$(".userRole").on('click',function(e) {
	$.ajax({
        type: 'post',
        url: '/users/user',
        data: { title: "username", content: onlineUser },
        dataType: 'json',
        success: function(data) {
        	
           if (data[0].role=='管理员') {
               $('iframe').attr('src','staff.html')
           }else {
           	   e.preventDefault();
           	    $('body').append(`
					<div class="alert alert-danger" role="alert">
					<button class="close" data-dismiss="alert" type="button" >×</button>
					<p>您无权进入！</p>
					</div> 
					`);
				return;
           }
           
        }
    })
})
$(".clientRole").on('click',function(e) {
	$.ajax({
        type: 'post',
        url: '/users/user',
        data: { title: "username", content: onlineUser },
        dataType: 'json',
        success: function(data) {
        	
           if (data[0].role=='管理员'||data[0].role=='售卖员'||data[0].role=='借阅员') {
               $('iframe').attr('src','client.html')
           }else {
           	   e.preventDefault();
           	    $('body').append(`
					<div class="alert alert-danger" role="alert">
					<button class="close" data-dismiss="alert" type="button" >×</button>
					<p>您无权进入！</p>
					</div> 
					`);
				return;
           }
           
        }
    })
})