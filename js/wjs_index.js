$(function () {
    var items = $(".carousel-inner .item");
    // 监听屏幕的大小变化
    $(window).on("resize", function () {
        // 获取当前屏幕的宽度
        var width = $(window).width();
        
        if (width >= 768) {  //非移动端屏幕
            //为每一个item添加子元素
            $(items).each(function (index, value) {
                var item = $(this);
                //获取自定义属性中存储的图片地址
                var imgSrc = item.data("largeImage");
                item.children(".pcImg").css("backgroundImage", "url('" + imgSrc + "')");
                item.html($("<a href='javascript:;' class='pcImg'></a>").css("backgroundImage", "url('" + imgSrc + "')"));
            });
        } else {
            $(items).each(function (index, value) {
                var item = $(this);
                var imgSrc = item.data("smallImage");
                item.html("<a href='javascript:;' class='mobileImg'><img src='"+ imgSrc +"'></a>");
            });
        }
    }).trigger("resize");

    /*移动端的滑动操作*/
    var startX, endX;
    var carousel_inner = $(".carousel-inner")[0];
    carousel_inner.addEventListener("touchstart", function (e) {
        startX = e.targetTouches[0].clientX;
    });
    carousel_inner.addEventListener("touchend", function (e) {
        endX = e.changedTouches[0].clientX;
        if (endX - startX > 0) {
            /*上一张*/
            $(".carousel").carousel('prev');
        } else if(endX-startX < 0){
            /*下一张*/
            $(".carousel").carousel('next');
        }
    })

    /*产品块导航项的滑动操作*/
    var navTabs = $(".wjs_product .nav-tabs");
    var lis = navTabs.find("li");
    /*计算产品块导航项的原始宽度*/
    var totalWidth = 0;    //总宽度
    lis.each(function (index, value) { 
        totalWidth += $(value).innerWidth();
    })
    navTabs.width(totalWidth);
    /*使用插件实现导航条的滑动操作*/
    var myScroll = new IScroll('.tabs_wrap',{
        /*设置水平滑动，不允许垂直滑动*/
        scrollX: true,
        scrollY: false,
        click: true
    });
});