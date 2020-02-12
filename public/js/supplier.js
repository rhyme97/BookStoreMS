$(function() {

    initList();
});
function initList(){//渲染表格
	$.ajax({
	    type : 'get',
	    url : '/supplier',
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
    if ($(".typeItem").text() == "供货商名:") {
        title = "sName";
    } else {
        title = "sGoods";
    }
    $.ajax({
        type: 'post',
        url: '/suppliers/supplier',
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
    $('.typeItem').text("供货商名:");
    $('.searchContent').val('');
     initList();
});