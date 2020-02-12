$(function() {

    initList();
});
function initList(){//渲染表格
	$.ajax({
	    type : 'get',
	    url : '/borrow',
	    dataType : 'json',
	    success : function(data){
	        // 渲染数据列表
	        var html = template('indexTpl',{list : data});
	        $('#dataList').html(html);
	    }
	});
}

$('.borrow').on('click',function() {//获取当前时间
	$('.bTime').val(today());
})
$('.borrowOk').on('click',function() {//新增借阅
    let bBook=$('.borrowId').val();
    let bName=$('.bPeople').val();
    let bDate=$('.bTime').val();
   
	$.ajax({
		type : 'post',
		url : '/books/book',
		data: { title: "goodsName", content: bBook },
		dataType : 'json',
		success : function(data){
			if (data.length&&data[0].goodsCount>0) {//书否存在图书
               $.ajax({
                    type : 'post',
                    url : '/clients/client',
                    data: { title: "cName", content: bName },
                    dataType : 'json',
                    success : function(data){
                        if(data.length){//是否存在会员
                            /*添加借阅记录*/
                            $.ajax({
                            	type : 'post',
                            	url : '/addborrow',
                            	data: { bGoods: bBook, bPeople: bName,bTime:bDate},
                            	dataType : 'json',
                            	success : function(data){
                            		if(data.flag == '1'){
                            			$.ajax({
                            				type : 'put',
                            				url : '/books/bBook',
                            				data : {goodsName:bBook,count:-1},
                            				dataType : 'json',
                            				success : function(data){
                            					if(data.flag == '1'){
									                // 隐藏弹窗
									                $('.hideIt').click();
									                 $('body').append(`
							                          	<div class="alert alert-success" role="alert">
							                          	<button class="close" data-dismiss="alert" type="button" >×</button>
							                          	<p>完成借阅！</p>
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
									    });
			                        }else {
			                        	  $('body').append(`
				                          	<div class="alert alert-danger" role="alert">
				                          	<button class="close" data-dismiss="alert" type="button" >×</button>
				                          	<p>借阅出错！</p>
				                          	</div> 
				                          	`);
			                        }
			                    }
			                });
                        }else {
                        	$('body').append(`
			        			<div class="alert alert-danger" role="alert">
			        			<button class="close" data-dismiss="alert" type="button" >×</button>
			        			<p>该借阅人无权借阅，请添加会员！</p>
			        			</div> 
			        		`);
			        		return;
                        }
                    }
                });
			}else {
				$('body').append(`
        			<div class="alert alert-danger" role="alert">
        			<button class="close" data-dismiss="alert" type="button" >×</button>
        			<p>没有相应的书籍！</p>
        			</div> 
        		`);
        		return;
			}
        }
    });
});
$('table').on('click','.borrowBack',function() {//获取删除的行参数
	let bGoods=$(this).parent().parent().find('td').eq(0).text();
	let bPeople=$(this).parent().parent().find('td').eq(1).text();
	let bTime=$(this).parent().parent().find('td').eq(2).text();
	// let borrowCount=parseInt();
	// let borrowDay=bTime.substring(0,10).split('-').join('');
	// let nowDay=today().split('-').join('');
	// let count=parseInt(nowDay)-parseInt(borrowDay)-1;
     
	// console.log( new Date().getTime())
	// console.log( new Date(bTime).getTime())
	let count=new Date().getTime()- new Date(bTime).getTime()-28800000;
	 let days=Math.floor(count/(24*3600*1000))  
	$('.borrowDelete').on('click',()=> {//完成借阅
	    $.ajax({
	        type : 'delete',
	        url : '/borrow',
	        data:{bGoods:bGoods,bPeople:bPeople},
	        dataType : 'json',
	        success : function(data){
	            if(data.flag == '1'){
	            	 $.ajax({
	                        type : 'put',
	                        url : '/books/bBook',
	                        data : {goodsName:bGoods,count:1},
	                        dataType : 'json',
	                        success : function(data){
	                            if(data.flag == '1'){
	                        
	                                $.ajax({
	                                	type : 'put',
	                                	url : '/books/dBook',
	                                	data : {goodsName:bGoods,count:days},
	                                	dataType : 'json',
	                                	success : function(data){
	                                		if(data.flag == '1'){
	                                   // 隐藏弹窗
	                                    initList();
		                                $('.hideIt').click();
		                            }
		                            else {
		                            	$('body').append(`
		                            		<div class="alert alert-danger" role="alert">
		                            		<button class="close" data-dismiss="alert" type="button" >×</button>
		                            		<p>返还失败！</p>
		                            		</div> 
		                            		`);
				                            }
				                        }
				                     });
	                            }
	                            else {
	                            	$('body').append(`
	                            		<div class="alert alert-danger" role="alert">
	                            		<button class="close" data-dismiss="alert" type="button" >×</button>
	                            		<p>返还失败！</p>
	                            		</div> 
	                            		`);
	                            }
	                        }
	                    });
	               
	            }else {
	            	 $('body').append(`
				<div class="alert alert-danger" role="alert">
				<button class="close" data-dismiss="alert" type="button" >×</button>
				<p>返还失败！</p>
				</div> 
				`);
	            }
	        }
	    });
	})
})

	

function today() {//构建方法
    var today = new Date();//new 出当前时间
    var h = today.getFullYear();//获取年
    var m = today.getMonth() + 1;//获取月
    var d = today.getDate();//获取日
    // var H = today.getHours();//获取时
    // var M = today.getMinutes();//获取分
    // var S = today.getSeconds();//获取秒
    return h + "-" + m + "-" + d; //返回 年-月-日 时:分:秒
}

       
