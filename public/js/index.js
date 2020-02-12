

$.ajax({//数据请求
        type : 'get',
        url : '/books',
        dataType : 'json',
        success : function(data){
            // 渲染数据列表
            function getX() {
                let bookArr=[];
                data.forEach((i)=>{
                   bookArr.push(i.goodsName)
                });
                return bookArr;
            }
             function getXItem() {
                let bookItemArr=[];
                data.forEach((i)=>{
                   bookItemArr.push(i.goodsSell)
                });
                return bookItemArr;
            }
            function getBorrowMoney() {
                let borrowMoney=0;
                data.forEach((i)=>{
                   borrowMoney+=(i.goodsBorrowPrice*i.goodsBorrowDays)
                });
                return borrowMoney; 
            }
            function getBookCount() {
                let count=0;
                data.forEach((i)=>{
                   count+=i.goodsCount
                });
                return count; 
            }
            function getSellCount() {
                let count=0;
                data.forEach((i)=>{
                   count+=i.goodsSell;
                });
                return count; 
            }
            $("#sellCount").text(getSellCount());
            $("#allCount").text(getBookCount());
            drawCircle({
                id: 'two',
                angle: (getBookCount()/getSellCount()) .toFixed(3),
                color: '#ffffff',
                lineWidth: 5
            });
            $.ajax({
                type : 'get',
                url : '/supplier',
                dataType : 'json',
                success : function(mydata){
                    function getSellMoney() {//销售利润
                      let SellMoney=0;
                      data.forEach((i)=>{
                         for (let j = 0; j < mydata.length; j++) {
                             if (mydata[j].sGoods==i.goodsName) {
                                SellMoney+=(i.goodsSell*(i.goodsPrice-mydata[j].sPrice))
                                break;
                             }
                         }

                      });
                      return SellMoney;
                    }
                    $("#xiaoshou").text(getSellMoney());
                    let all=getBorrowMoney()+getSellMoney();
                    $(".moneyall").text(all);
                    drawCircle({
                        id: 'three',
                        angle: (getSellMoney()/all).toFixed(4),
                        color: '#ffffff',
                        lineWidth: 5
                    });
                    drawCircle({
                        id: 'four',
                        angle: (getBorrowMoney()/all).toFixed(4),
                        color: '#ffffff',
                        lineWidth: 5
                    });
                }
            });
            
            /*柱状图数据*/
            var myChart = echarts.init(document.getElementById('pie'));
            var options={
                //定义一个标题
                title:{
                    text:'图书销量'
                },
                legend:{
                    data:['总销量']
                },
                //X轴设置
                 color: ['#c23531','#2f4554', '#61a0a8'],
                xAxis:{
                    data:getX(),
                    axisLabel:{interval: 0}
                },
                yAxis:{
                  
                },
                //name=legend.data的时候才能显示图例
                series:[{
                    name:'总销量',
                    type:'bar',
                    data:getXItem(),
                    itemStyle: {
                    normal: {
                    color: function(params) {
                        //注意，如果颜色太少的话，后面颜色不会自动循环，最好多定义几个颜色
                        var colorList = ['#c23531','#2f4554', '#61a0a8', '#d48265', '#91c7ae','#749f83', '#ca8622','#c23531','#2f4554', '#61a0a8', '#d48265', '#91c7ae','#749f83', '#ca8622'];
                        return colorList[params.dataIndex]
                           }
                        }
                    }
                }]
            };
            myChart.setOption(options);
            /*借阅利润*/
            $("#jieyue").text(getBorrowMoney()); 
            /*总利润*/
          

           
        }
    });



window.onload=function() {
    let onlineCount;
    let allCount;
    setTimeout(()=>{
        $.ajax({
        type: 'post',
        url: '/users/user',
        data: { title: "state", content: "online" },
        dataType: 'json',
        success: function(data) {
            onlineCount=data.length
            $("#onlineNum").text(onlineCount);
        }
    })
    },500)
    $.ajax({
        type : 'get',
        url : '/users',
        dataType : 'json',
        success : function(data){
            allCount=data.length
            $("#allstaff").text(allCount);
        }
    });
    setTimeout(()=>{
        drawCircle({
        id: 'one',
        angle: (onlineCount/allCount) . toFixed(2),
        color: '#ffffff',
        lineWidth: 5
    });
    },1000)
}




function drawCircle(_options){
    var options = _options || {};    //获取或定义options对象;
    options.angle = options.angle || 1;    //定义默认角度1为360度(角度范围 0-1);
    options.color = options.color || '#fff';    //定义默认颜色（包括字体和边框颜色）;
    options.lineWidth = options.lineWidth || 10;    //定义默认圆描边的宽度;
    options.lineCap = options.lineCap || 'square';    //定义描边的样式，默认为直角边，round 为圆角

    var oBoxOne = document.getElementById(options.id);
    var sCenter = oBoxOne.width / 2;    //获取canvas元素的中心点;
    var ctx = oBoxOne.getContext('2d');
    var nBegin = Math.PI / 2;    //定义起始角度;
    var nEnd = Math.PI * 2;    //定义结束角度;
    var grd = ctx.createLinearGradient(0, 0, oBoxOne.width, 0);    //grd定义为描边渐变样式;
    grd.addColorStop(0, 'red');
    grd.addColorStop(0.5, 'yellow');
    grd.addColorStop(1, 'green');

    ctx.textAlign = 'center';    //定义字体居中;
    ctx.font = 'normal normal bold 14px Arial';    //定义字体加粗大小字体样式;
    ctx.fillStyle = options.color == 'grd' ? grd : options.color;    //判断文字填充样式为颜色，还是渐变色;
    ctx.fillText((options.angle * 100) + '%', sCenter, sCenter);    //设置填充文字;
    /*ctx.strokeStyle = grd;    //设置描边样式为渐变色;
    ctx.strokeText((options.angle * 100) + '%', sCenter, sCenter);    //设置描边文字(即镂空文字);*/
    ctx.lineCap = options.lineCap;
    ctx.strokeStyle = options.color == 'grd' ? grd : options.color;
    ctx.lineWidth = options.lineWidth;

    ctx.beginPath();    //设置起始路径，这段绘制360度背景;
    ctx.strokeStyle = '#D8D8D8';
    ctx.arc(sCenter, sCenter, (sCenter - options.lineWidth), -nBegin, nEnd, false);
    ctx.stroke();

    var imd = ctx.getImageData(0, 0, 240, 240);
    function draw(current) {    //该函数实现角度绘制;
        ctx.putImageData(imd, 0, 0);
        ctx.beginPath();
        ctx.strokeStyle = options.color == 'grd' ? grd : options.color;
        ctx.arc(sCenter, sCenter, (sCenter - options.lineWidth), -nBegin, (nEnd * current) - nBegin, false);
        ctx.stroke();
    }

    var t = 0;
    var timer = null;
    function loadCanvas(angle) {    //该函数循环绘制指定角度，实现加载动画;
        timer = setInterval(function(){
            if (t > angle) {
                draw(options.angle);
                clearInterval(timer);
            }else{
                draw(t);
                t += 0.02;
            }
        }, 20);
    }
    loadCanvas(options.angle);    //载入百度比角度  0-1 范围;
    timer = null;

}






