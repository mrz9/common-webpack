
    //轮播图初始化 双向控制    
    function bannerSwiper(controlClass,contentClass){
      var mySwiper2 = new Swiper(contentClass +' .swiper-container',{
          parallax : true,
          controller: {
              control: mySwiper,
          }
      });
      var mySwiper = new Swiper(controlClass+' .swiper-container',{
          speed:1000,
          autoplay: {
              delay: 15000 //1秒30分换一次
          },
          on : {//事件
              touchMove : function(){ //手指触碰Swiper并且移动
                  setTimeout(function(){
                      mySwiper.autoplay.stop();
                  },1000)
              },
              touchEnd : function(){ //手指触碰Swiper并且离开
                  setTimeout(function(){
                      mySwiper.autoplay.start();
                  },1000)
              },
              transitionStart: function(){//过度开始事件 
                  var index = $(controlClass+' .swiper-slide-active').index();

                  $(controlClass +' .productProgress div.box .Progress').eq(index).css({
                      background : '#fff'
                  }).siblings().css({
                      background : '#535456'
                  })
              }  
          },
          controller: {
              control: mySwiper2,
          }
      });

      //元素距离宽度初始化
      $(controlClass + ' .swiper-container .swiper-wrapper .swiper-slide').each(function(index){
          if(index == 0){
              $(controlClass +' .productProgress div.box').append('<div class="Progress" style="background: #fff;"></div>')
          }else{
              $(controlClass +' .productProgress div.box').append('<div class="Progress" style="background: #535456;"></div>')
          }
      });
  }

  //swiper服务区块 and 福利区块横向滚动单注册
  function ServiceBenefitsSwiper(controlClass){
      //超类选择
      var controlClass = controlClass;
      //实力化
      var mySwiper = new Swiper(controlClass+' .swiper-container',{
          width : 0.96 * window.innerWidth,
          on : {//事件
              resize : function(){ //改变窗口计算宽度更新上去
                  $(controlClass +' .swiper-container .swiper-wrapper .swiper-slide').each(function(index){
                      if(index == 0){
                          $(this).find('.swiper-Box').css({
                              'paddingLeft' : (window.innerWidth - (0.96 * window.innerWidth))+'px'
                          });
                      }else{
                          $(this).find('.swiper-Box').css('paddingRight',(window.innerWidth - (0.96 * window.innerWidth)+'px'));
                      }
                      //2后有偏差
                      if(index >= 2){
                          $(this).css('marginLeft','-' + (window.innerWidth * 0.04) + 'px');
                      }
                  })
                  this.params.width = 0.96 * window.innerWidth ;
                  this.update();
              },
              progress : function(){
              },
              transitionStart: function(){//过度开始事件 
                  /*
                  思路 
                  获取执行到是第几个索引
                  它所执行的位置是各位置的1/2/3..倍 以此类推 但除了0 0索引的话必须到
                  倍数递增2倍的 1 * 2 / 2 * 4
                  */
                  var index = $(controlClass+' .swiper-slide-active').index();
                  if(index == 0){
                      this.setTranslate(0);
                  }else{
                      this.setTranslate(-((window.innerWidth * index) - (0.04 * (index * 2) * window.innerWidth)));    
                  }

                  $(controlClass +' .productProgress div.box .Progress').eq(index).css({
                      background : '#262626'
                  }).siblings().css({
                      background : '#E6E6E6'
                  })
              }   
          }
      });
      //元素距离宽度初始化
      $(controlClass + ' .swiper-container .swiper-wrapper .swiper-slide').each(function(index){
          if(index == 0){
              $(this).find('.swiper-Box').css({
                  'paddingLeft' : (window.innerWidth - (0.96 * window.innerWidth))+'px'
              });
              $(controlClass +' .productProgress div.box').append('<div class="Progress" style="background: #262626;"></div>')
          }else{
              $(controlClass +' .productProgress div.box').append('<div class="Progress"></div>')
              $(this).find('.swiper-Box').css('paddingRight',(window.innerWidth - (0.96 * window.innerWidth)+'px'));
          }

          //2后有偏差
          if(index >= 2){
              $(this).css('marginLeft','-' + (window.innerWidth * 0.04) + 'px');
          }
      });
  }

  /* 中英按钮 */
  function btnAnimateRight(){
      var getModel = $(this).parents('.language-btn');
      getModel.removeClass('btn-right').addClass('btn-left');

      getModel.find('.la-box').animate({
          left : ($(this).width()) + 'px'
      });
      //如果列表导航是打开的 颜色就执行相反的 或者fixed定位 说明是窗口定位也是黑色动画
      if($('.nav2').width() != 0 || $('.nav').css('position') == "fixed"){
          $('.language-btn .en').css('color','#333');
          $('.language-btn .ch').css('color','#fff');   
      }else{
          $('.language-btn .en').css('color','#fff');
          $('.language-btn .ch').css('color','#333');   
      }
  }
  function btnAnimateLeft(){
      var getModel = $(this).parents('.language-btn');
      getModel.removeClass('btn-left').addClass('btn-right');

      getModel.find('.la-box').animate({
          left : 0
      });
      //如果列表导航是打开的 颜色就执行相反的  或者fixed定位 说明是窗口定位也是黑色动画
      if($('.nav2').width() != 0 || $('.nav').css('position') == "fixed"){
          $('.language-btn .en').css('color','#fff');
          $('.language-btn .ch').css('color','#333');  
      }else{
          $('.language-btn .en').css('color','#333');
          $('.language-btn .ch').css('color','#fff');     
      }
  }
  //按钮启动
  $('.language-btn').on('click','.ch',btnAnimateRight);
  $('.language-btn').on('click','.en',btnAnimateLeft);
  /* 中英按钮 */

  /* 分类展开/关闭 */
  function closeOn(){
      $(this).unbind();
      $(this).click(closeOff);
      $('.op').addClass('on');

      /* 如果是绝对的 执行正常的 */
      if($('.nav').css('position') == "absolute"){
          $('.opTop').css({
              transform: 'translate(50%) rotate(46deg)',
              background : '#666',
              top : ($('.op').height()) + 'px'
          })
          $('.opButtom').css({
              transform: 'translate(50%) rotate(-46deg)',
              bottom : ($('.op').height()) + 'px',
              background : '#666'
          });
      }else{
          $('.opTop').css({
              transform: 'translate(50%) rotate(46deg)',
              top : ($('.op').height()) + 'px'
          })
          $('.opButtom').css({
              transform: 'translate(50%) rotate(-46deg)',
              bottom : ($('.op').height()) + 'px',
          });
      }

      $('.nav2').animate({
              width : '100%',
              opacity : 1
      },200);

      //如果按钮在普通模式才执行动画
      if($('.nav').css('position') == "absolute"){
          $('.nav img.logo1').hide();
          $('.nav img.logo2').show();

          /* 按钮特效 */
          $('.language-btn').css('borderColor','#333');
          $('.la-box').css('background','#333');
          if($('.language-btn').hasClass('btn-right')){
              $('.language-btn .en').css('color','#fff');
              $('.language-btn .ch').css('color','#333');
          }else{
              $('.language-btn .en').css('color','#333');
              $('.language-btn .ch').css('color','#fff');
          };
      }
  }
  function closeOff(){
      $(this).unbind();
      $(this).click(closeOn);
      $('.op').removeClass('on');

      /* 如果是绝对的 执行正常的 */
      if($('.nav').css('position') == "absolute"){
          $('.opTop').css({
              transform: 'rotate(0deg)',
              top : '3px',
              background : '#fff'
          });
          $('.opButtom').css({
              transform: 'rotate(0deg)',
              bottom : '3px',
              background : '#fff'
          })
      }else{
          $('.opTop').css({
              transform: 'rotate(0deg)',
              top : '3px'
          });
          $('.opButtom').css({
              transform: 'rotate(0deg)',
              bottom : '3px'
          })
      }

      $('.nav2').animate({
          width : '0',
          opacity : 0
      },200);
      
      //如果按钮在普通模式才执行动画
      if($('.nav').css('position') == "absolute"){
          $('.nav img.logo2').hide();
          $('.nav img.logo1').show();

          /* 按钮特效 */
          $('.language-btn').css('borderColor','#fff');
          $('.la-box').css('background','#fff');
          if($('.language-btn').hasClass('btn-right')){
              $('.language-btn .en').css('color','#333');
              $('.language-btn .ch').css('color','#fff');
          }else{
              $('.language-btn .en').css('color','#fff');
              $('.language-btn .ch').css('color','#333');
          };
      }
  }
  $('.op').click(closeOn);
  /* 分类展开/关闭 */

  window.onresize = function(){
      //检测交叉的位置
      if($('.op').hasClass('on')){
          $('.opTop').css({
              top : ($('.op').height()) + 'px'
          })
          $('.opButtom').css({
              bottom : ($('.op').height()) + 'px'
          });
      }
      
      /*第一屏幕高度*/
      $('.giantScreen').height($(window).height());
  };  

  $(function (){
      /* 导航滚动 */
      $('.nav2').on('click','a',function(){
          //拿到id 
          var idVal = $(this).attr('id');

          if(idVal == 'home'){
              $(window).scrollTop(0);
          }else if(idVal == 'service'){
              $(window).scrollTop($('#serviceBox').offset().top);
          }else if(idVal == 'AboutUs'){
              $(window).scrollTop($('#AboutUsBox').offset().top);
          }else if(idVal == 'enterprise'){
              $(window).scrollTop($('#enterpriseBox').offset().top);
          }else if(idVal == 'welfare'){
              $(window).scrollTop($('#welfareBox').offset().top);
          }
      });
      /* 导航滚动 */

      //加载层关闭
      $('#loadingBox').hide();

      /*第一屏幕高度*/
      $('.giantScreen').height($(window).height());
      
      //注册服务横向滚动
      ServiceBenefitsSwiper('.serviceScrollRight');
      //注册产品横向滚动
      ServiceBenefitsSwiper('.productScrollRight');
      //轮播图横向滚动
      bannerSwiper('.mobileBannar','.mobileBannarContent');
      ServiceBenefitsSwiper('.WelfareBox');
  })

  /* 往下滚动? 往上滚动? */
  window.onscroll = function(){
      //如果打开滚动的话
      if($('.nav').css('position') == "absolute"){
          $('.opTop').css({
              transform: 'rotate(0deg)',
              top : '3px',
              background : '#fff'
          });
          $('.opButtom').css({
              transform: 'rotate(0deg)',
              bottom : '3px',
              background : '#fff'
          })
      }else{
          $('.opTop').css({
              transform: 'rotate(0deg)',
              top : '3px'
          });
          $('.opButtom').css({
              transform: 'rotate(0deg)',
              bottom : '3px'
          })
      }
      //之间css不需要过渡
      $('.nav2').css({
          width : '0',
          opacity : 0
      });
      //如果打开滚动的话

      var y = window.scrollY;
      //清除定时器
      clearTimeout(window.scrollTime);

      if(!window.scrollFirst){ //第一次存储
          window.scrollFirst = window.scrollY;
      }else{ //下次比较
          //延迟0.5秒在检测 避免太频繁
          window.scrollTime = setTimeout(function(){
              if(window.scrollFirst > window.scrollY){ //往上的
                  //更新 
                  window.scrollFirst = window.scrollY;
                  //更新 

                  /* 如果滚动条小于导航条的一半一切还原 */
                  if(y < ($('.nav').height() / 2)){
                      //还原样式
                      $('.nav').css({
                          position: 'absolute',
                          background : 'none',
                          boxShadow: '0px 0px 5px transparent'
                      }).find('.logo1').show().siblings('.logo2').hide();

                      //中英按钮
                      $('.language-btn').css({
                          borderColor: '#fff'
                      });
                      $('.la-box').css({
                          background: '#fff'
                      });

                      //判断另一边是什么颜色
                      if($('.language-btn').hasClass('btn-right')){
                          $('.language-btn .en').css({
                              color : '#333'
                          });
                          $('.language-btn .ch').css({
                              color : '#fff'
                          });
                      }else{
                          $('.language-btn .en').css({
                              color : '#fff'
                          });
                          $('.language-btn .ch').css({
                              color : '#333'
                          });
                      }

                      //关闭分类按钮的颜色
                      $('.op .opTop').css({
                          background : '#fff'
                      });
                      $('.op .opButtom').css({
                          background : '#fff'
                      });

                      //nav2导航大幕
                      $('.nav2').css({
                          position: 'absolute'            
                      })            
                  }else{
                      $('.nav').css({
                          position: 'fixed',
                          background : '#fff',
                          boxShadow: '0px 0px 5px #eee'
                      }).find('.logo1').hide().siblings('.logo2').show();

                      //中英按钮
                      $('.language-btn').css({
                          borderColor: 'rgb(51, 51, 51)'
                      });
                      $('.la-box').css({
                          background: 'rgb(51, 51, 51)'
                      });

                      //判断另一边是什么颜色
                      if($('.language-btn').hasClass('btn-right')){
                          $('.language-btn .en').css({
                              color : '#fff'
                          });
                          $('.language-btn .ch').css({
                              color : '#333'
                          });
                      }else{
                          $('.language-btn .en').css({
                              color : '#333'
                          });
                          $('.language-btn .ch').css({
                              color : '#fff'
                          });
                      }

                      //关闭分类按钮的颜色
                      $('.op .opTop').css({
                          background : 'rgb(102, 102, 102)'
                      });
                      $('.op .opButtom').css({
                          background : 'rgb(102, 102, 102)'
                      });

                      //nav2导航大幕
                      $('.nav2').css({
                          position: 'fixed'            
                      })   
                  }
              }else{ //往下的
                  //更新 
                  window.scrollFirst = window.scrollY;
                  //更新 

                  /* 如果滚动条大于导航条的一半 固定一种变化 */
                  if(y > ($('.nav').height() / 2)){
                      //还原样式
                      $('.nav').css({
                          position: 'absolute',
                          background : 'none',
                          boxShadow: '0px 0px 5px transparent'
                      }).find('.logo1').show().siblings('.logo2').hide();
                  }

                  //中英按钮
                  $('.language-btn').css({
                      borderColor: '#fff'
                  });
                  $('.la-box').css({
                      background: '#fff'
                  });

                  //判断另一边是什么颜色
                  if($('.language-btn').hasClass('btn-right')){
                      $('.language-btn .en').css({
                          color : '#333'
                      });
                      $('.language-btn .ch').css({
                          color : '#fff'
                      });
                  }else{
                      $('.language-btn .en').css({
                          color : '#fff'
                      });
                      $('.language-btn .ch').css({
                          color : '#333'
                      });
                  }

                  //关闭分类按钮的颜色
                  $('.op .opTop').css({
                      background : '#fff'
                  });
                  $('.op .opButtom').css({
                      background : '#fff'
                  });
              }
          },5);
      }
  }
  /* 往下滚动? 往上滚动? */