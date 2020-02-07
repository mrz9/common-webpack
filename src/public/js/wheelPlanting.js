//轮播图初始化函数
carouselInitialization = function (){


   //图片盒子高度初始化
   $('.imageBox').height(0.33 * window.innerWidth + 'px');
   //元素宽高初始化
   $('.imageBox .scrollBox .box').width(0.75 * window.innerWidth + 'px');
   $('.imageBox .scrollBox .box').height(0.33 * window.innerWidth + 'px');

   //轮播的打标记和隐藏初始化
   $('.imageBox .scrollBox').each(function(index){
      $(this).attr('index',index);
      if(index == 0){
         $(this).css('display','block');
      }else{
         $(this).css('display','none');
      }
   });
   //索引初始化
   $('.imageBox .scrollBox').each(function(){
      if($(this).css('display') === 'block'){
         //进度条初始化
         goBar(1);

         //前一张图片初始化
         var backIndex = parseInt($(this).attr('index')) - 1 < 0 ? ($('.imageBox .scrollBox').length - 1) : parseInt($(this).attr('index'));
         var goIndex = (parseInt($(this).attr('index')) + 1) > ($('.imageBox .scrollBox').length ) ? ($('.imageBox .scrollBox').length) : parseInt($(this).attr('index')) + 1;
         $(this).attr('back',backIndex).attr('go',goIndex);
      }
   });

   //思路 窗口改变的时候 不要重新设置而是图片在哪就是在哪 
   //做法 使用会话存储 图片每动一次的时候 记录当前的是那个元素在哪个位置 改变窗口的时候读取一遍
   //需要index的值 position的值 style的字符串值要可以直接全部写入生效的
   //前后图片初始化

   /** 图片是否有记录  **/
   if(window.sessionStorage.getItem('scrollBoxleft')){
      /** 图片区 分段读取left center right **/
      var scrollBoxleft,scrollBoxcenter,scrollBoxright;
      scrollBoxleft = window.sessionStorage.getItem('scrollBoxleft').split('+');
      scrollBoxcenter = window.sessionStorage.getItem('scrollBoxcenter').split('+');
      scrollBoxright = window.sessionStorage.getItem('scrollBoxright').split('+');
      //单独设置不行
      /*
      console.log(scrollBoxleft);
      console.log(scrollBoxcenter);
      console.log(scrollBoxright);
      */

      $('.imageBox .scrollBox').eq(scrollBoxleft[0]).attr('position',scrollBoxleft[1]).attr('style',scrollBoxleft[2]);
      $('.imageBox .scrollBox').eq(scrollBoxcenter[0]).attr('position',scrollBoxcenter[1]).attr('style',scrollBoxcenter[2]);
      $('.imageBox .scrollBox').eq(scrollBoxright[0]).attr('position',scrollBoxright[1]).attr('style',scrollBoxright[2]);
      /** 分段读取left center right **/
   }else{/** 没有记录 **/
      $('.imageBox .scrollBox').each(function(){
         if($(this).attr('index') == 0){
            var index = $(this).attr('index');
            var back = $(this).attr('back');
            var go = $(this).attr('go');
         
            $('.imageBox .scrollBox').eq(back).css({
               'display' : 'block',
               //'left' : -($('.imageBox .scrollBox').width() + 70) + 'px',
               'left' : '-107%',
               'opacity' : '0.5'
            }).attr('position','left');
            $('.imageBox .scrollBox').eq(index).attr('position','center');
            $('.imageBox .scrollBox').eq(go).css({
               'display' : 'block',
               //'left' : ($('.imageBox .scrollBox').width() + 70) + 'px',
               //right : '-107%',
               left : '107%',
               'opacity' : '0.5'
            }).attr('position','right');
            
            //写入本地会话存储 以做执行记录
            //约定index position style
            //先用scrollBox公名
            /** 分段存储left center right **/
            window.sessionStorage.setItem('scrollBoxleft',back +'+'+ $('.imageBox .scrollBox').eq(back).attr('position') + '+' + $('.imageBox .scrollBox').eq(back).attr('style'));
            window.sessionStorage.setItem('scrollBoxcenter',index +'+'+ $('.imageBox .scrollBox').eq(index).attr('position') + '+' + $('.imageBox .scrollBox').eq(index).attr('style'));
            window.sessionStorage.setItem('scrollBoxright',go +'+'+ $('.imageBox .scrollBox').eq(go).attr('position') + '+' + $('.imageBox .scrollBox').eq(go).attr('style'));
            /** 分段存储left center right **/
         }
      });
   }   

   //轮播图左边标题初始化
   $('.wheelPlantingBox .InfoLeft .InfoLeftBox').each(function(index){
      $(this).attr('index',index);
      if(index == 0){
         $(this).css('display','block');
      }else{
         $(this).css('display','none');
      }
   });
   $('.wheelPlantingBox .InfoLeft .InfoLeftBox').each(function(){
      if($(this).css('display') === 'block'){
         //进度条初始化
         goBar(1);

         //前一张图片初始化
         var backIndex = parseInt($(this).attr('index')) - 1 < 0 ? ($('.imageBox .scrollBox').length - 1) : parseInt($(this).attr('index'));
         var goIndex = (parseInt($(this).attr('index')) + 1) > ($('.imageBox .scrollBox').length ) ? ($('.imageBox .scrollBox').length) : parseInt($(this).attr('index')) + 1;
         $(this).attr('back',backIndex).attr('go',goIndex);
      }
   })
   //上下标题初始化
   //是否有记录
   if(window.sessionStorage.getItem('InfoLeftBoxtop')){
      $('.wheelPlantingBox .InfoLeft .InfoLeftBox').hide();
      /** 标题区 分段读取top center bottom **/
      var InfoLeftBoxtop,InfoLeftBoxcenter,InfoLeftBoxbottom;
      InfoLeftBoxtop = window.sessionStorage.getItem('InfoLeftBoxtop').split('+');
      InfoLeftBoxcenter = window.sessionStorage.getItem('InfoLeftBoxcenter').split('+');
      InfoLeftBoxbottom = window.sessionStorage.getItem('InfoLeftBoxbottom').split('+');
      /*
      console.log(InfoLeftBoxtop);
      console.log(InfoLeftBoxcenter);
      console.log(InfoLeftBoxbottom);
      */
      
      $('.wheelPlantingBox .InfoLeft .InfoLeftBox').eq(InfoLeftBoxtop[0]).attr('position',InfoLeftBoxtop[1]).attr('style',InfoLeftBoxtop[2]);
      $('.wheelPlantingBox .InfoLeft .InfoLeftBox').eq(InfoLeftBoxcenter[0]).attr('position',InfoLeftBoxcenter[1]).attr('style',InfoLeftBoxcenter[2]);
      $('.wheelPlantingBox .InfoLeft .InfoLeftBox').eq(InfoLeftBoxbottom[0]).attr('position',InfoLeftBoxbottom[1]).attr('style',InfoLeftBoxbottom[2]);
      
      /** 标题区 分段读取top center bottom **/
   }else{
      $('.wheelPlantingBox .InfoLeft .InfoLeftBox').each(function(){
         if($(this).attr('index') == 0){
            var back = $(this).attr('back');
            var index = $(this).attr('index');
            var go = $(this).attr('go');
   
            $('.wheelPlantingBox .InfoLeft .InfoLeftBox').eq(back).css({
               'display' : 'block',
               'top' : -42 + 'px',
               'position' : 'absolute'
            }).attr('position','top');
   
            $('.wheelPlantingBox .InfoLeft .InfoLeftBox').eq(index).attr('position','center');
   
            $('.wheelPlantingBox .InfoLeft .InfoLeftBox').eq(go).css({
               'display' : 'block',
               'top' : 42 + 'px',
               'position' : 'absolute'
            }).attr('position','bottom');
   
            /** 分段存储left center right **/
            window.sessionStorage.setItem('InfoLeftBoxtop',back +'+'+ $('.wheelPlantingBox .InfoLeft .InfoLeftBox').eq(back).attr('position') + '+' + $('.wheelPlantingBox .InfoLeft .InfoLeftBox').eq(back).attr('style'));
            window.sessionStorage.setItem('InfoLeftBoxcenter',index +'+'+ $('.wheelPlantingBox .InfoLeft .InfoLeftBox').eq(index).attr('position') + '+' + $('.wheelPlantingBox .InfoLeft .InfoLeftBox').eq(index).attr('style'));
            window.sessionStorage.setItem('InfoLeftBoxbottom',go +'+'+ $('.wheelPlantingBox .InfoLeft .InfoLeftBox').eq(go).attr('position') + '+' + $('.wheelPlantingBox .InfoLeft .InfoLeftBox').eq(go).attr('style'));
            /** 分段存储left center right **/
         }
      });
   }
   //轮播图右边内容初始化
   $('.wheelPlantingBox .InfoRight .InfoRightBox').each(function(index){
      $(this).attr('index',index);
      if(index == 0){
         $(this).css('display','block');
         //$('.InfoRight').height($(this).height() + 'px');
      }else{
         $(this).css('display','none');
      }
   });
   //进度条初始化
   $('.wheelPlantingBox .InfoRight .InfoRightBox').each(function(index){
      if($(this).attr('index') == 0){
         //进度条初始化
         goBar(1);

         //前一张图片初始化
         var backIndex = parseInt($(this).attr('index')) - 1 < 0 ? ($('.imageBox .scrollBox').length - 1) : parseInt($(this).attr('index'));
         var goIndex = (parseInt($(this).attr('index')) + 1) > ($('.imageBox .scrollBox').length ) ? ($('.imageBox .scrollBox').length) : parseInt($(this).attr('index')) + 1;
         $(this).attr('back',backIndex).attr('go',goIndex);
      }
   });
   //上下内容文案初始化
   if(window.sessionStorage.getItem('InfoRightBoxtop')){
      $('.wheelPlantingBox .InfoRight .InfoRightBox').hide();
      /** 标题区 分段读取top center bottom **/
      var InfoRightBoxtop,InfoRightBoxcenter,InfoRightBoxbottom;
      InfoRightBoxtop = window.sessionStorage.getItem('InfoRightBoxtop').split('+');
      InfoRightBoxcenter = window.sessionStorage.getItem('InfoRightBoxcenter').split('+');
      InfoRightBoxbottom = window.sessionStorage.getItem('InfoRightBoxbottom').split('+');

      
      $('.wheelPlantingBox .InfoLeft .InfoRightBox').eq(InfoRightBoxtop[0]).attr('position',InfoRightBoxtop[1]).attr('style',InfoRightBoxtop[2]);
      $('.wheelPlantingBox .InfoLeft .InfoRightBox').eq(InfoRightBoxcenter[0]).attr('position',InfoRightBoxcenter[1]).attr('style',InfoRightBoxcenter[2]);
      $('.wheelPlantingBox .InfoLeft .InfoRightBox').eq(InfoRightBoxbottom[0]).attr('position',InfoRightBoxbottom[1]).attr('style',InfoRightBoxbottom[2]);
      
      /** 标题区 分段读取top center bottom **/
      //有记录说明进度条有进度
      //进度条初始化
      //center的索引就是进度条的进度
      var index = parseInt(InfoRightBoxcenter[0]) + 1;
      goBar(index);
   }else{
      $('.wheelPlantingBox .InfoRight .InfoRightBox').each(function(){
         if($(this).attr('index') == 0){
            var index = $(this).attr('index');
            var back = $(this).attr('back');
            var go = $(this).attr('go');
   
            $('.wheelPlantingBox .InfoRight .InfoRightBox').eq(back).addClass('topContent').css({
               'display' : 'block',
               'top' : -($('.wheelPlantingBox .InfoRight .InfoRightBox').eq(back).height()) + 'px'
            }).attr('position','top');
            $('.wheelPlantingBox .InfoRight .InfoRightBox').eq(index).attr('position','center');
            $('.wheelPlantingBox .InfoRight .InfoRightBox').eq(go).addClass('bottomContent').css({
               'display' : 'block',
               //'top' : ($('.wheelPlantingBox .InfoRight .InfoRightBox').eq(go).height()) + 'px'
               top : '115px'
            }).attr('position','bottom');
   
            /** 分段存储left center right **/
            window.sessionStorage.setItem('InfoRightBoxtop',back +'+'+ $('.wheelPlantingBox .InfoRight .InfoRightBox').eq(back).attr('position') + '+' + $('.wheelPlantingBox .InfoRight .InfoRightBox').eq(back).attr('style'));
            window.sessionStorage.setItem('InfoRightBoxcenter',index +'+'+ $('.wheelPlantingBox .InfoRight .InfoRightBox').eq(index).attr('position') + '+' + $('.wheelPlantingBox .InfoRight .InfoRightBox').eq(index).attr('style'));
            window.sessionStorage.setItem('InfoRightBoxbottom',go +'+'+ $('.wheelPlantingBox .InfoRight .InfoRightBox').eq(go).attr('position') + '+' + $('.wheelPlantingBox .InfoRight .InfoRightBox').eq(go).attr('style'));
            /** 分段存储left center right **/
         }
      });
   }
   $('.amount').text('0' + $('.imageBox .scrollBox').length);

   //前后轮播事件
   function back(){
      $('.nextBtn').unbind();
      if(window.reviousBtnEvent){
         return;
      }
      var one,two,three;
      window.time2 = setInterval(function(){
         if(!!one && !!two && !!three){
            clearInterval(window.time2);
            window.reviousBtnEvent = null
            $('.nextBtn').click(go);
         }
      },100)

      window.reviousBtnEvent = setTimeout(function(){
         $('.imageBox .scrollBox').each(function(){
            if($(this).attr('position') == 'center'){
               $(this).animate({
                  //left : ($(this).width() + 70) + 'px',
                  left : '107%',
                  opacity : 0.5
               },function(){
                  $(this).attr('position','right');
                  window.sessionStorage.setItem('scrollBoxright',$(this).attr('index') +'+'+ $('.imageBox .scrollBox').eq($(this).attr('index')).attr('position') + '+' + $('.imageBox .scrollBox').eq($(this).attr('index')).attr('style'));
                  one = 1;
               });
            }
            
            if($(this).attr('position') == 'right'){
               $(this).css({
                  //width : '100%'
               }).animate({
                  //width : '0%'
                  //left : (Math.abs(parseInt($(this).css('left'))) + ($(this).width() / 2)) + 'px'
                  left : (Math.abs(parseInt($(this).css('left'))) + (0.5 * $(this).width())) + '%'
               },function(){
                  $(this).removeAttr('position','').attr('style','').css('display','none');
                  three = 1;
               });
            }

            if($(this).attr('position') == 'left'){
               $('.count').text('0' + (parseInt($(this).attr('index')) + 1));
               goBar(parseInt($(this).attr('index')) + 1);
               $(this).animate({
                  left : 0,
                  opacity : 1
               },function(){
                  $(this).attr('position','center');
                  window.sessionStorage.setItem('scrollBoxcenter',$(this).attr('index') +'+'+ $('.imageBox .scrollBox').eq($(this).attr('index')).attr('position') + '+' + $('.imageBox .scrollBox').eq($(this).attr('index')).attr('style'));
                  two = 2;
               });
               
               //同步把下一个拉出来
               //alert($(this).attr('index') - 1);
               var n = parseInt($(this).attr('index')) - 1 < 0 ? $('.wheelPlantingInfo .InfoLeft span').length - 1 : parseInt($(this).attr('index')) - 1;
               $('.imageBox .scrollBox').eq(n).css({
                  display: 'block',
                  //left : '-' + ($('.imageBox .scrollBox').width() + 70) + 'px',
                  left : '-120%',
                  opacity: '0.5',
                  width : '0%'
               }).animate({
                  width : '100%',
                  left : '-107%',
               },function(){
                  $(this).attr('position','left');
                  window.sessionStorage.setItem('scrollBoxleft',$(this).attr('index') +'+'+ $('.imageBox .scrollBox').eq($(this).attr('index')).attr('position') + '+' + $('.imageBox .scrollBox').eq($(this).attr('index')).attr('style'));
               }).find('.scroll').css({//特殊处理img
                  width : '0%',
                  height : '0%',
                  float : 'left'
               }).animate({
                  width : '100%',
                  height : '100%'
               });
            }
         });

         //标题动画
         $('.wheelPlantingInfo .InfoLeft span').each(function(){
            if($(this).attr('position') == 'top'){
               $(this).css('position','absolute').animate({
                  'top': '0'
               },function(){
                  $(this).attr('position','center');
                  window.sessionStorage.setItem('InfoLeftBoxcenter',$(this).attr('index') +'+'+ $('.wheelPlantingBox .InfoLeft .InfoLeftBox').eq($(this).attr('index')).attr('position') + '+' + $('.wheelPlantingBox .InfoLeft .InfoLeftBox').eq($(this).attr('index')).attr('style'));

                  var n = parseInt($(this).attr('index')) - 1 ==  $('.wheelPlantingInfo .InfoLeft span').length ? 0 : parseInt($(this).attr('index')) - 1;
                  $('.wheelPlantingInfo .InfoLeft span').eq(n).css({
                     'position':'absolute',
                     'top' : '-42px',
                     'display' : 'block'
                  }).attr('position','top');
                  window.sessionStorage.setItem('InfoLeftBoxtop',n +'+'+ $('.wheelPlantingBox .InfoLeft .InfoLeftBox').eq(n).attr('position') + '+' + $('.wheelPlantingBox .InfoLeft .InfoLeftBox').eq(n).attr('style'));
               })
            };	

            if($(this).attr('position') == 'center'){
               $(this).css('position','absolute').animate({
                  'top': '42px'
               },function(){
                  $(this).attr('position','bottom');
                  window.sessionStorage.setItem('InfoLeftBoxbottom',$(this).attr('index') +'+'+ $('.wheelPlantingBox .InfoLeft .InfoLeftBox').eq($(this).attr('index')).attr('position') + '+' + $('.wheelPlantingBox .InfoLeft .InfoLeftBox').eq($(this).attr('index')).attr('style'));
               })
            };	

            if($(this).attr('position') == 'bottom'){
               $(this).attr('style',' ').removeAttr('position').css('display','none');

            };	
         });

         //内容动画
         $('.wheelPlantingInfo .InfoRight .InfoRightBox').each(function(){
            if($(this).attr('position') == 'top'){
               $(this).css('position','absolute').animate({
                  'top': '0'
               },function(){
                  $(this).attr('position','center');
                  window.sessionStorage.setItem('InfoRightBoxcenter',$(this).attr('index') +'+'+ $('.wheelPlantingBox .InfoRight .InfoRightBox').eq($(this).attr('index')).attr('position') + '+' + $('.wheelPlantingBox .InfoRight .InfoRightBox').eq($(this).attr('index')).attr('style'));
                  //$('.InfoRight').height($(this).height() + 'px');

                  var n = parseInt($(this).attr('index')) - 1 ==  $('.wheelPlantingInfo .InfoRight p').length ? 0 : parseInt($(this).attr('index')) - 1;
                  $('.wheelPlantingInfo .InfoRight p').eq(n).css({
                     'position':'absolute',
                     'top' : '-'+ $('.wheelPlantingInfo .InfoRight p').eq(n).height() +'px',
                     'display' : 'block'
                  }).attr('position','top');
                  window.sessionStorage.setItem('InfoRightBoxtop',n +'+'+ $('.wheelPlantingBox .InfoRight .InfoRightBox').eq(n).attr('position') + '+' + $('.wheelPlantingBox .InfoRight .InfoRightBox').eq(n).attr('style'));
               })
            };	

            if($(this).attr('position') == 'center'){
               $(this).css('position','absolute').animate({
                  //'top': $('.wheelPlantingInfo .InfoRight p[position=top]').height() +'px'
                  'top': '115px'
               },function(){
                  $(this).attr('position','bottom');
                  window.sessionStorage.setItem('InfoRightBoxbottom',$(this).attr('index') +'+'+ $('.wheelPlantingBox .InfoRight .InfoRightBox').eq($(this).attr('index')).attr('position') + '+' + $('.wheelPlantingBox .InfoRight .InfoRightBox').eq($(this).attr('index')).attr('style'));
               })
            };	

            if($(this).attr('position') == 'bottom'){
               $(this).attr('style',' ').removeAttr('position').css('display','none');
            };	
         });	
      },100);
   }
   function go(){
      $('.reviousBtn').unbind();
      if(window.nextBtnEvent){
         return;
      }
      var one,two,three;
      window.time = setInterval(function(){
         if(!!one && !!two && !!three){
            clearInterval(window.time);
            window.nextBtnEvent = null
            $('.reviousBtn').click(back);
         }
      },100)

      window.nextBtnEvent = setTimeout(function(){
         //图片
         $('.imageBox .scrollBox').each(function(){
            if($(this).attr('position') == 'center'){
               $(this).animate({
                  //left : -($(this).width() + 70) + 'px',
                  left : '-107%',
                  opacity : 0.5
               },function(){
                  $(this).attr('position','left');
                  window.sessionStorage.setItem('scrollBoxleft',$(this).attr('index') +'+'+ $('.imageBox .scrollBox').eq($(this).attr('index')).attr('position') + '+' + $('.imageBox .scrollBox').eq($(this).attr('index')).attr('style'));
                  one = 1;
               });
            }

            if($(this).attr('position') == 'right'){
               $('.count').text('0' + (parseInt($(this).attr('index')) + 1));
               goBar(parseInt($(this).attr('index')) + 1);
               $(this).animate({
                  left : 0,
                  opacity : 1
               },function(){
                  $(this).attr('position','center');
                  window.sessionStorage.setItem('scrollBoxcenter',$(this).attr('index') +'+'+ $('.imageBox .scrollBox').eq($(this).attr('index')).attr('position') + '+' + $('.imageBox .scrollBox').eq($(this).attr('index')).attr('style'));
                  two = 2;
               });

               //同步把下一个拉出来
               //alert($('.imageBox img').eq(parseInt($(this).attr('index')) + 1).length)
               var n = parseInt($(this).attr('index')) + 1 ==  $('.imageBox .scrollBox').length ? 0 : parseInt($(this).attr('index')) + 1;
               $('.imageBox .scrollBox').eq(n).css({
                  display: 'block',
                  //right: '-' + ($('.imageBox .scrollBox').width() + 70) + 'px',
                  //left : '120%',
                  left : '106%',
                  opacity: '0.5',
                  width : '0%',
                  //height : '0%'
               }).animate({
                  width : '100%',
                  //left : '106%',
                  //opacity: '0.5',
                  //height : '100%'
                  //left : '107%'
               },function(){
                  $(this).attr('position','right');
                  window.sessionStorage.setItem('scrollBoxright',$(this).attr('index') +'+'+ $('.imageBox .scrollBox').eq($(this).attr('index')).attr('position') + '+' + $('.imageBox .scrollBox').eq($(this).attr('index')).attr('style'));
               }).find('.scroll').css({//特殊处理img
                  width : '0%',
                  height : '0%',
                  float : 'right'
               }).animate({
                  width : '100%',
                  height : '100%'
               });
            }

            if($(this).attr('position') == 'left'){
               $(this).css({
                  //width : '100%'
               }).animate({
                  //left : -(Math.abs(parseInt($(this).css('left'))) + ($(this).width() / 2)) + 'px'
                  left : -(Math.abs(parseInt($(this).css('left'))) + (0.5 * $(this).width())) + '%'
               },function(){
                  $(this).removeAttr('position','').attr('style','').css('display','none');
                  three = 1;
               });
            }
         });

         //标题动画
         $('.wheelPlantingInfo .InfoLeft .InfoLeftBox').each(function(){
            if($(this).attr('position') == 'top'){
               $(this).attr('style',' ').removeAttr('position').css('display','none');
            };	

            if($(this).attr('position') == 'center'){
               $(this).css('position','absolute').animate({
                  'top': '-42px'
               },function(){
                  $(this).attr('position','top');
                  window.sessionStorage.setItem('InfoLeftBoxtop',$(this).attr('index') +'+'+ $('.wheelPlantingBox .InfoLeft .InfoLeftBox').eq($(this).attr('index')).attr('position') + '+' + $('.wheelPlantingBox .InfoLeft .InfoLeftBox').eq($(this).attr('index')).attr('style'));
               })
            };	

            if($(this).attr('position') == 'bottom'){
               $(this).css('position','absolute').animate({
                  'top': '0'
               },function(){
                  $(this).attr('position','center');
                  window.sessionStorage.setItem('InfoLeftBoxcenter',$(this).attr('index') +'+'+ $('.wheelPlantingBox .InfoLeft .InfoLeftBox').eq($(this).attr('index')).attr('position') + '+' + $('.wheelPlantingBox .InfoLeft .InfoLeftBox').eq($(this).attr('index')).attr('style'));

                  var n = parseInt($(this).attr('index')) + 1 ==  $('.wheelPlantingInfo .InfoLeft .InfoLeftBox').length ? 0 : parseInt($(this).attr('index')) + 1;
                  $('.wheelPlantingInfo .InfoLeft .InfoLeftBox').eq(n).css({
                     'position':'absolute',
                     'top' : '42px',
                     'display' : 'block'
                  }).attr('position','bottom');
                  window.sessionStorage.setItem('InfoLeftBoxbottom',n +'+'+ $('.wheelPlantingBox .InfoLeft .InfoLeftBox').eq(n).attr('position') + '+' + $('.wheelPlantingBox .InfoLeft .InfoLeftBox').eq(n).attr('style'));
               })
            };	
         });

         //内容描述动画
         $('.wheelPlantingInfo .InfoRight .InfoRightBox').each(function(){
            if($(this).attr('position') == 'top'){
               $(this).attr('style',' ').removeAttr('position').css('display','none');
            };	

            if($(this).attr('position') == 'center'){
              $(this).css('position','absolute').animate({
                  'top': '-'+ $(this).height() +'px'
               },function(){
                  $(this).attr('position','top');
                  window.sessionStorage.setItem('InfoRightBoxtop',$(this).attr('index') +'+'+ $('.wheelPlantingBox .InfoRight .InfoRightBox').eq($(this).attr('index')).attr('position') + '+' + $('.wheelPlantingBox .InfoRight .InfoRightBox').eq($(this).attr('index')).attr('style'));
               })
            };	

            if($(this).attr('position') == 'bottom'){
               $(this).css('position','absolute').animate({
                  'top': '0',
               },function(){
                  $(this).attr('position','center');
                  window.sessionStorage.setItem('InfoRightBoxcenter',$(this).attr('index') +'+'+ $('.wheelPlantingBox .InfoRight .InfoRightBox').eq($(this).attr('index')).attr('position') + '+' + $('.wheelPlantingBox .InfoRight .InfoRightBox').eq($(this).attr('index')).attr('style'));
                  //$('.InfoRight').height($(this).height() + 'px');

                  var n = parseInt($(this).attr('index')) + 1 ==  $('.wheelPlantingInfo .InfoRight p').length ? 0 : parseInt($(this).attr('index')) + 1;
                  $('.wheelPlantingInfo .InfoRight p').eq(n).css({
                     'position':'absolute',
                     'top' : $('.InfoRight').height() + 'px',
                     'display' : 'block'
                  }).attr('position','bottom');
                  window.sessionStorage.setItem('InfoRightBoxbottom',n +'+'+ $('.wheelPlantingBox .InfoRight .InfoRightBox').eq(n).attr('position') + '+' + $('.wheelPlantingBox .InfoRight .InfoRightBox').eq(n).attr('style'));
               })
            };	
         });
      },100);
   }


   //下一个
   $('.nextBtn').click(go);
   //上一个
   $('.reviousBtn').click(back);
}

//进度条函数逻辑
function goBar(n){
   var int = 100 / $('.imageBox .scrollBox').length; 
   //var n = n < 0 
   $('.wheelPlantingBox .Progressbar .barControl').css('width',(n * int) +'%');
}