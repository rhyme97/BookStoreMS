$(function() {

    initList();
});
let count;//定义库存
function initList(){//渲染表格
	$.ajax({
	    type : 'get',
	    url : '/books',
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
    if ($(".typeItem").text() == "图书编号:") {
        title = "goodsId";
    } else if ($(".typeItem").text() == "书名:") {
        title = "goodsName";
    } else {
        title = "goodsType";
    }
    $.ajax({
        type: 'post',
        url: '/books/book',
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
    $('.typeItem').text("图书编号:");
    $('.searchContent').val('');
     initList();
});

$('table').on('click','.sellIt',function() {//出售面板数据
	$('.sellId').val($(this).parent().parent().find('td').eq(0).text())
	$('.sellNum').val('1')
	$('.sellPrice').val($(this).parent().parent().find('td').eq(3).text())
	$('.sellAllPrice').val($(this).parent().parent().find('td').eq(3).text())
    count=$(this).parent().parent().find('td').eq(4).text()
});
$(".sellNum").on('blur',function() {/*数量判断*/
	 	let patt = /^[1-9]\d*$/;
	if (!$(".sellNum").val()) {
		$('body').append(`
			<div class="alert alert-danger" role="alert">
			<button class="close" data-dismiss="alert" type="button" >×</button>
			<p>数量不能为空！</p>
			</div> 
			`);
	}else if (!patt.test(parseInt($(".sellNum").val()))){
         $('body').append(`
			<div class="alert alert-danger" role="alert">
			<button class="close" data-dismiss="alert" type="button" >×</button>
			<p>数值不符合规范！</p>
			</div> 
			`);
	}else if (parseInt($(".sellNum").val())>parseInt(count)) {
          $('body').append(`
			<div class="alert alert-danger" role="alert">
			<button class="close" data-dismiss="alert" type="button" >×</button>
			<p>库存不足！</p>
			</div> 
			`);
	}else {
		$('.sellAllPrice').val(parseInt($('.sellAllPrice').val())*parseInt($(".sellNum").val()))
	}
})
$('.sellOk').on("click",function() {//出售
  //发送修改请求
   $.ajax({
        type : 'put',
        url : '/books/book',
        data : {goodsId:$('.sellId').val(),num:parseInt($(".sellNum").val())},
        dataType : 'json',
        success : function(data){
            if(data.flag == '1'){
                // 隐藏弹窗
                $('.hideIt').click();
                // 重新渲染数据列表
                initList();
            }
        }
    });

})
/*详情*/
$('table').on('click','.detailbook',function() {

	let id=$(this).parent().parent().find('td').eq(0).text();
		 $.ajax({
        type: 'post',
        url: '/books/book',
        data: { title: "goodsId", content: id },
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
                let i=0
        		for(let key in data[0]) {
        			$('#myModal1 .modal-body').find('input').eq(i).val(data[0][key]);
        			i++;
        			
        		}
        	}

           
        }
    })
})