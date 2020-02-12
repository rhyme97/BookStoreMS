$(function() {

    initList();
});
let count;//定义库存
function initList(){//渲染表格
	$.ajax({
	    type : 'get',
	    url : '/users',
	    dataType : 'json',
	    success : function(data){
	        // 渲染数据列表
	        var html = template('indexTpl',{list : data});
	        $('#dataList').html(html);
	    }
	});
}
//搜索类别
$(".dType ul li").on("click", function() {
    $(".typeItem").text($(this).find('a').text() + ":");
});

$(".search").on("click", function() { //点击搜索
    let content = $('.searchContent').val();
    let title;
    if (!content) {
    	$('body').append(`
            <div class="alert alert-danger" role="alert">
    		<button class="close" data-dismiss="alert" type="button" >×</button>
    		<p>搜索内容不能为空！</p>
    	</div> 
    	`);
    	return;
    }
    if ($(".typeItem").text() == "员工编号:") {
        title = "id";
    } else if ($(".typeItem").text() == "员工姓名:") {
        title = "username";
    } else {
        title = "role";
    }
    $.ajax({
        type: 'post',
        url: '/users/user',
        data: { title: title, content: content },
        dataType: 'json',
        success: function(data) {

        	if (!data.length) {
        		$('body').append(`
        			<div class="alert alert-danger" role="alert">
        			<button class="close" data-dismiss="alert" type="button" >×</button>
        			<p>未查询到相应的数据！</p>
        			</div> 
        			`);
        	}else {
        		var html = template('indexTpl', { list: data });
                $('#dataList').html(html);
        	}

           
        }
    })
});
$('.reset').on('click',function() {//重置
    $('.typeItem').text("员工编号:");
    $('.searchContent').val('');
     initList();
});
$('.addOk').on('click',function() {//新增员工
    let uName=$('.uName').val();
    let uPwd=$('.uPwd').val();
    let uRole=$('.uRole').val();
   
	if (uName&&uPwd&&uRole) {//非空
		let rule=/^[A-Za-z0-9]+$/;
		if (rule.test(uPwd)) {//密码数字和英文
			$.ajax({
				type: 'post',
				url: '/users/user',
				data: { title: "role", content: uRole },
				dataType: 'json',
				success: function(data) {
					if (!data.length) {
						$('body').append(`
							<div class="alert alert-danger" role="alert">
							<button class="close" data-dismiss="alert" type="button" >×</button>
							<p>职位不存在！</p>
							</div> 
							`);
					}else {//开始添加
						 $.ajax({
                            	type : 'post',
                            	url : '/addUser',
                            	data: { username: uName, password: uPwd,role:uRole},
                            	dataType : 'json',
                            	success : function(data){
                                   if(data.flag == '1'){
                                   	     // 隐藏弹窗
						                $('.hideIt').click();
						                 $('body').append(`
				                          	<div class="alert alert-success" role="alert">
				                          	<button class="close" data-dismiss="alert" type="button" >×</button>
				                          	<p>完成添加！</p>
				                          	</div> 
				                          	`);
						                // 重新渲染数据列表
						                initList();
                                   }else {
		                        	  $('body').append(`
			                          	<div class="alert alert-danger" role="alert">
			                          	<button class="close" data-dismiss="alert" type="button" >×</button>
			                          	<p>数据库添加出错！</p>
			                          	</div> 
			                          	`);
			                        }
                            	}
                            })
						
					}
				}
			})
		}else {
			$('body').append(`
			<div class="alert alert-danger" role="alert">
			<button class="close" data-dismiss="alert" type="button" >×</button>
			<p>密码数字和英文！</p>
			</div> 
			`);
		     return;
		}

	}else {
		$('body').append(`
			<div class="alert alert-danger" role="alert">
			<button class="close" data-dismiss="alert" type="button" >×</button>
			<p>内容不能为空！</p>
			</div> 
			`);
		return;
	}
});

$("table").on('click','.toDelete',function() {
	let id=$(this).parent().parent().find('td').eq(0).text();
	$('.userDelete').on('click',()=> {
	$.ajax({
	    type : 'delete',
	    url : '/user',
	    data:{id:id},
	    dataType : 'json',
	    success : function(data){
	        if(data.flag == '1'){
                initList();
		        $('.hideIt').click();
	        }else {
        	   $('body').append(`
        		<div class="alert alert-danger" role="alert">
        		<button class="close" data-dismiss="alert" type="button" >×</button>
        		<p>删除失败，服务器出错！</p>
        		</div> 
        		`);
            }
	    }
	})
})
})
$('table').on('click','.toUpdateRole',function() {
	let r=$(this).parent().parent().find('td').eq(5).text();
	let id=$(this).parent().parent().find('td').eq(0).text();
    $('.myrole').val(r);
    $('.updateRole').on('click',function() {
         $.ajax({
				type: 'post',
				url: '/users/user',
				data: { title: "role", content: $('.myrole').val() },
				dataType: 'json',
				success: function(data) {
					if (!data.length) {
						$('body').append(`
							<div class="alert alert-danger" role="alert">
							<button class="close" data-dismiss="alert" type="button" >×</button>
							<p>职位不存在！</p>
							</div> 
							`);
						return;
					}else {
						$.ajax({
							type:'put',
							url:'/user',
							data:{id:id,role:$('.myrole').val()},
							dataType:'json',
							success:function(data) {
								if(data.flag == '1'){
									initList();
		                            $('.hideIt').click();
								}
							}
						})
					}
				}
			})
    })
})
