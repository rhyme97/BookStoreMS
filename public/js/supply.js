$('.addSupply').on('click',function() {//上货
	//数据验证
	let isNull=false;
	$('.myform').find('input').each(function() {
		if (!$(this).val()) {//非空
            isNull=true;
		}
	})
	if (isNull) {
	    $('body').append(`
      	<div class="alert alert-danger" role="alert">
      	<button class="close" data-dismiss="alert" type="button" >×</button>
      	<p>信息不能为空！</p>
      	</div> 
      	`); 
	}else {//数字校验
		let rule=/^[1-9]\d*|0$/;
		if (rule.test($('.myform').find('input').eq(2).val())&&rule.test($('.myform').find('input').eq(3).val())) {
             $.ajax({
		        type: 'post',
		        url: '/addSupply',
		        data: $(".myform").serialize(),
		        dataType: 'json',
		        success: function(data) {
		            if (data.flag == '1') {
		               $('body').append(`
				      	<div class="alert alert-danger" role="alert">
				      	<button class="close" data-dismiss="alert" type="button" >×</button>
				      	<p>添加成功！</p>
				      	</div> 
				      	`); 
		            }else {
		            	$('body').append(`
				      	<div class="alert alert-danger" role="alert">
				      	<button class="close" data-dismiss="alert" type="button" >×</button>
				      	<p>添加失败！</p>
				      	</div> 
				      	`); 
		            }
		        }
		    })
		}else {
			$('body').append(`
	      	<div class="alert alert-danger" role="alert">
	      	<button class="close" data-dismiss="alert" type="button" >×</button>
	      	<p>价格和数量必须为正整数！</p>
	      	</div> 
	      	`); 
		}

	}

})