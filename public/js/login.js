
console.log($(window).height())
$(".bg").css({
	"height": $(window).height()
});
$(".login").on('click', function() {
    $.ajax({
        type: 'post',
        url: '/check',
        data: $("form").serialize(),
        dataType: 'json',
        success: function(data) {
            if (data.tips == '1') {
                let user=$("#uname").val();
                location.href="/pages/main.html?user="+encodeURI(user);
            }
            if (data.tips == '2') {
               $(".tips_user").text("输入的信息有误！")
            }
        }
    })
})