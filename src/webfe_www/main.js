	//页面刷新不再记录 去掉所有会话存储
  window.sessionStorage.clear();

  //检测是否支持会话存储函数 
  function checkSession(){
    if(window.sessionStorage){
        return true;
    }else{
        return false;
    }
  }
  //检测是否支持本地存储函数
  function checkLocal(){
    if(window.localStorage){
        return true;
    }else{
        return false;
    }
  }

  //滚动插件初始化
  function skrollrRun(){
    window.windowScroll = skrollr.init({
      edgeStrategy: 'set',
        forceHeight: false,
        easing: {
          WTF: Math.random,
          inverted: function(p) {
            return 1-p;
          }
        }
    });

    /*
    skrollr.menu.init(window.windowScroll, {
      change: function(hash, top) {
        console.log(hash, top);
      },
      animate: true,
      updateUrl: false,
      duration: function(currentTop, targetTop) {
        return 500;
      }
    });
    */
  }

  $(function(){
    //解除加载遮照
    $('.loading').animate({
      opacity : 0
    },function(){
      $(this).hide();
    });

    //滚动导航的代替函数
    function navScrollPage(){
      var i = $(window).scrollTop();
      var top = $(this).data('menu-top');
      var direction;

      if(i == top){
        return;
      }

      //判断 i比top大 还是i比top小 
      //小 那么是往下滚动 
      //大 往上滚动
      if(i > top){
        direction = 'top';
      }else if(i < top){
        direction = 'bottom';
      }

      var index = setInterval(function(){
        if(direction == 'top'){//判断是否到位
          if(i <= top){
            $(window).scrollTop(top);
            clearInterval(index);
            return;
          }
        }else if(direction == 'bottom'){
          if(i >= top){
            $(window).scrollTop(top);
            clearInterval(index);
            return;
          }
        }

        if(i > top){
          i-=30;
        }else{
          i+=30;
        }
        $(window).scrollTop(i);
      },1);
    }

    //模拟滚动--导航
    $('.nav ul li a').click(navScrollPage);
    $('.pageFooter ul li a').click(navScrollPage);
    //模拟滚动--导航

    //语言显示初始化
    $('.en').hide();

    //第一屏高度全屏
    $('.giantScreen').height($(window).height());

    //第一屏滚动距离计算
    $('.giantScreen h1').attr('data-70','height:'+ (parseInt($('.giantScreen h1').height()) + 24) + 'px;margin-bottom:16px;').attr('data-200','height:0px;margin-bottom:' + (parseInt($('.giantScreen h1').height()) + 40) + 'px;');
    $('.giantScreen p').attr('data-25','height:'+ $('.giantScreen p').height() + 'px;').attr('data-200','height:0px;');

    //按比例设置高度
    $('.service').css('height',window.innerHeight * 0.8 + 'px');

    //设置第一屏幕动画属性
    $('.serviceAnimate').attr('data-70','margin-top:0px;').attr('data-1100','margin-top:-'+ $(window).height() +'px;')

    //中英按钮动画
    /* 
    $('.languageButton').click(cnGo);
    */

    function cnGo(){
      var obj = $(this)
      obj.unbind();
      obj.click(cnBack);
      obj.find('.l_change').animate({
        left : '33px'
      },function(){
        
      });
      obj.find('.Cn').removeAttr('data-30').attr('data-30','color:white').removeAttr('data-31').attr('data-31','color:black;').css('color','white');
      obj.find('.En').removeAttr('data-30').attr('data-30','color:black;').removeAttr('data-31').attr('data-31','color:white;').css('color','black');
      window.windowScroll.destroy();
      skrollrRun()
      
      $('.en').show();
      $('.ch').hide();
      
      //轮播图内容文字高度要做兼容
      $('.wheelPlantingInfo .InfoRight p[position=top]').css('top',$('.wheelPlantingInfo .InfoRight p[position=center]').height() + 'px');
      $('.InfoRight').height($('.wheelPlantingInfo .InfoRight p[position=center]').height() + 'px');
      $('.wheelPlantingInfo .InfoRight p[position=bottom]').css('top',$('.wheelPlantingInfo .InfoRight p[position=center]').height() + 'px');

      //这代码操作巨屏居中文字的动画
      $('.giantScreen h1').height('auto');
      $('.giantScreen p').height('auto');
      $('.giantScreen h1').attr('data-70','height:'+ (parseInt($('.giantScreen h1').height()) + 24) + 'px;margin-bottom:16px;').attr('data-200','height:0px;margin-bottom:' + (parseInt($('.giantScreen h1').height()) + 40) + 'px;');
      $('.giantScreen p').attr('data-25','height:'+ $('.giantScreen p').height() + 'px;').attr('data-200','height:0px;');
      window.windowScroll.destroy();
      skrollrRun();
    }
    function cnBack(){
      var obj = $(this);
      obj.unbind();
      obj.click(cnGo);
      obj.find('.l_change').animate({
        left : '0'
      },function(){
        
      });
      obj.find('.Cn').removeAttr('data-30').attr('data-30','color:black').removeAttr('data-31').attr('data-31','color:white;').css('color','black');
      obj.find('.En').removeAttr('data-30').attr('data-30','color:white;').removeAttr('data-31').attr('data-31','color:black;').css('color','white');
      window.windowScroll.destroy();
      skrollrRun()

      $('.en').hide();
      $('.ch').show();

      //轮播图内容文字高度要做兼容
      $('.wheelPlantingInfo .InfoRight p[position=top]').css('top',$('.wheelPlantingInfo .InfoRight p[position=center]').height() + 'px');
      $('.InfoRight').height($('.wheelPlantingInfo .InfoRight p[position=center]').height() + 'px');
      $('.wheelPlantingInfo .InfoRight p[position=bottom]').css('top',$('.wheelPlantingInfo .InfoRight p[position=center]').height() + 'px');

      //这代码操作巨屏居中文字的动画
      $('.giantScreen h1').height('auto');
      $('.giantScreen p').height('auto');
      $('.giantScreen h1').attr('data-70','height:'+ (parseInt($('.giantScreen h1').height()) + 24) + 'px;margin-bottom:16px;').attr('data-200','height:0px;margin-bottom:' + (parseInt($('.giantScreen h1').height()) + 40) + 'px;');
      $('.giantScreen p').attr('data-25','height:'+ $('.giantScreen p').height() + 'px;').attr('data-200','height:0px;');
      window.windowScroll.destroy();
      skrollrRun()
    }

    $(window).resize(function(){
      //第一屏高度全屏
      $('.giantScreen').height($(window).height());

      //注意google地图放大的时候是触发窗口resize的
      //清理
      //window.sessionStorage.clear();
      //执行函数 轮播图初始化
      carouselInitialization();
      setTimeout(function(){
        $('body').css('height','auto');

        //按比例设置高度
        $('.service').css('height',window.innerHeight * 0.8 + 'px');
      },300)	
    });
    
    $(window).scroll(function(){
      $('body').css('height','auto');
      if($(window).scrollTop() >= 30){
        $('.nav ul').addClass('nav2');
      }else{
        $('.nav ul').removeClass('nav2');
      }
    })
    
    //滚动插件实例化
    setTimeout(function(){
      //轮播图实例化
      carouselInitialization();
      skrollrRun()
      $('body').css('height','auto');
    },300);
})	