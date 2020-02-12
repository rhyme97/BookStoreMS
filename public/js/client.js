$(function() {

    initList();
});
let count;//定义库存
function initList(){//渲染表格
	$.ajax({
	    type : 'get',
	    url : '/clients',
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
    if ($(".typeItem").text() == "会员编号:") {
        title = "cId";
    } else if ($(".typeItem").text() == "会员姓名:") {
        title = "cName";
    } 
    $.ajax({
        type: 'post',
        url: '/clients/client',
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
    $('.typeItem').text("会员编号:");
    $('.searchContent').val('');
     initList();
});
$('.addOk').on('click',function() {//新增员工
    let cName=$('.cName').val();
    let cCard=$('.cCard').val();
    let cTel=$('.cTel').val();
    let cSex=$('.cSex').val();
	if (cName&&cCard&&cTel&&cSex) {//非空
		let rule=/^[1-9]\d*|0$/;
		if (rule.test(cCard)&&rule.test(cTel)) {//数字
			if (cSex=='男'||cSex=='女') {
				$.ajax({
	            	type : 'post',
	            	url : '/addClient',
	            	data: { cName: cName, cCard: cCard,cTel:cTel,cSex:cSex},
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
			}else {
				$('body').append(`
				<div class="alert alert-danger" role="alert">
				<button class="close" data-dismiss="alert" type="button" >×</button>
				<p>性别有误！</p>
				</div> 
				`);
			     return;
			}
			
		}else {
			$('body').append(`
			<div class="alert alert-danger" role="alert">
			<button class="close" data-dismiss="alert" type="button" >×</button>
			<p>身份证号和联系电话为数字！</p>
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
	    url : '/client',
	    data:{cId:id},
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
	let tel=$(this).parent().parent().find('td').eq(3).text();
	let id=$(this).parent().parent().find('td').eq(0).text();
    $('.myrole').val(tel);
    $('.updateRole').on('click',function() {
    	let rule=/^[1-9]\d*|0$/;
    	if ($('.myrole').val()&&rule.test($('.myrole').val())) {
    		$.ajax({
				type:'put',
				url:'/clients',
				data:{cId:id,cTel:$('.myrole').val()},
				dataType:'json',
				success:function(data) {
					if(data.flag == '1'){
						initList();
	                    $('.hideIt').click();
					}
				}
		   })
    	}
    	else {
		  $('body').append(`
          	<div class="alert alert-danger" role="alert">
          	<button class="close" data-dismiss="alert" type="button" >×</button>
          	<p>联系电话为数字！</p>
          	</div> 
          	`);
           
    	}
         
    })
    	
})