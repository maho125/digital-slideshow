/****************************************************************/
/*    slideshow  v1.0.0                                         */
/*    © 2013 Tomáš Mahrík, BEE DIGITAL                          */
/*    http://blog.beedigital.sk, www.beedigital.sk              */
/****************************************************************/

function slideshow(opt)
{  
  var slideshow = {

  rootElement      : opt.rootElement,
  width            : opt.w ? opt.w : 1024,
  height           : opt.h ? opt.h : 400, 
  stepInterval     : opt.stepInterval ? opt.stepInterval : 1000,
  autoplayInterval : opt.autoplayInterval ? opt.autoplayInterval : 5000,
  pauseInterval    : opt.pauseInterval ? opt.pauseInterval : 10000,
  autoplay         : opt.autoplay ? opt.autoplay : false,
  timer            : null, 
  actualSlideIndex : 0,
  prevSlideIndex   : 0,
  numSlides        : 0,

  //init slideshow
  init             : function()
                     {
                        $('#'+slideshow.rootElement+', #'+slideshow.rootElement+' .slides').css('width',slideshow.width);
                        $('#'+slideshow.rootElement+' .slides').css('height',slideshow.height);
                        slideshow.countSlides();
                        slideshow.initArrows();
                        slideshow.initNavigation();
                        slideshow.initAutoplay();
                        slideshow.animateSlide();
                     },
  
  //init auto play mode
  initAutoplay     : function()
                     {

                        if(slideshow.timer)
                        {
                           clearInterval(slideshow.timer);
                        }
                        
                        if(slideshow.autoplay)
                        {
                           slideshow.timer = setInterval(slideshow.player,slideshow.autoplayInterval);
                        }                    
                     }, 
  
  //init navigation arrows                   
  initArrows       : function()
                     {

                        $('#'+slideshow.rootElement+' .slides').append('<a href="javascript:void(0);" class="arrow_right" ></a>'); 
                        $('#'+slideshow.rootElement+' .slides').find('.arrow_right').click(function(){slideshow.nextSlide();});  
                        $('#'+slideshow.rootElement+' .slides').append('<a href="javascript:void(0);" class="arrow_left" ></a>');
                        $('#'+slideshow.rootElement+' .slides').find('.arrow_left').click(function(){slideshow.prevSlide();});  
                     }, 
  
  //hide navigation arrows 
  hideArrows       : function()
                     {
                         $('#'+slideshow.rootElement+' .slides .arrow_right').animate({
                             opacity: 'hide'
                           },
                           slideshow.stepIterval,
                           'linear'
                         );
                         
                         $('#'+slideshow.rootElement+' .slides .arrow_left').animate({
                             opacity: 'hide'
                           },
                           slideshow.stepIterval,
                           'linear'
                         );
                     },                  
  
  //init subnavigation                   
  initNavigation   : function()
                     {

                        var addClass = ''
                        for(var i=0; i<slideshow.numSlides;i++)
                        {
                           if(i==0) {addClass = 'pick_active';}else{addClass = 'pick_unactive';}
                           $('#'+slideshow.rootElement+' .navigation').append('<a href="javascript:void(0);" data-index="'+i+'" class="'+addClass+'"></a>'); 
                        }  
                        $('#'+slideshow.rootElement+' .navigation a').click(function(){ slideshow.showSlide($(this).attr('data-index')); });    
                     },                                     
  
  //auto player for slideshow if autoplay =  true
  player           : function()
                     {

                        if(slideshow.actualSlideIndex <(slideshow.numSlides-1))
                        {
                           slideshow.prevSlideIndex = slideshow.actualSlideIndex;
                           slideshow.actualSlideIndex+=1;
                        }
                        else
                        {
                           slideshow.prevSlideIndex = slideshow.actualSlideIndex;
                           slideshow.actualSlideIndex = 0;   
                        }
                        
                        slideshow.animateSlide();
                     }, 
  
  //pause interval after click on navigation                   
  pause            : function()
                     {                         
                          if(slideshow.autoplay)
                          {
                             if(slideshow.timer)
                             {
                                clearInterval(slideshow.timer);
                             }
                             
                             slideshow.timer = setInterval(slideshow.initAutoplay,slideshow.pauseInterval);
                          } 
                     },                                                       
  
  //check min and max index of slideshow by that renders arrows 
  checkArrows      : function()
                     {
                         
                         if(slideshow.actualSlideIndex == (slideshow.numSlides-1))
                         {
                             $('#'+slideshow.rootElement+' .slides .arrow_right').animate({
                                 opacity: 'hide'
                               },
                               slideshow.stepIterval,
                               'linear'
                             );
                         }
                         else
                         {
                             $('#'+slideshow.rootElement+' .slides .arrow_right').animate({
                                opacity: 'show'
                             },
                             slideshow.stepIterval,
                             'linear'
                             );
                         }
                         
                         if(slideshow.actualSlideIndex == 0)
                         {
                             $('#'+slideshow.rootElement+' .slides .arrow_left').animate({
                                 opacity: 'hide'
                               },
                               slideshow.stepIterval,
                               'linear'
                             );
                         }
                         else
                         {
                             $('#'+slideshow.rootElement+' .slides .arrow_left').animate({
                               opacity: 'show'
                             },
                             slideshow.stepIterval,
                             'linear'
                             );
                         }
                     },                   
  
  //next slide                   
  nextSlide         : function()
                     {
                         
                         slideshow.prevSlideIndex = slideshow.actualSlideIndex;
                          
                         if(slideshow.actualSlideIndex < (slideshow.numSlides-1))
                         {
                            slideshow.actualSlideIndex+=1;
                         }

                         if(slideshow.prevSlideIndex!=slideshow.actualSlideIndex)
                         {
                             slideshow.animateSlide();
                         }    
                         
                         slideshow.pause();
                     },
  
  //prev slide                   
  prevSlide         : function()
                     {
                         
                         slideshow.prevSlideIndex = slideshow.actualSlideIndex;
                         
                         if(slideshow.actualSlideIndex > 0)
                         {
                            slideshow.actualSlideIndex-=1;
                         }
                         
                         if(slideshow.prevSlideIndex!=slideshow.actualSlideIndex)
                         {
                            slideshow.animateSlide();
                         }
                         
                         slideshow.pause();
                     }, 
  
  //show slide
  showSlide        : function(index)
                     {

                         slideshow.prevSlideIndex = slideshow.actualSlideIndex;
                         slideshow.actualSlideIndex = parseInt(index);
                         
                         if(slideshow.prevSlideIndex!=slideshow.actualSlideIndex)
                         {
                            slideshow.animateSlide();
                         }
                         
                         slideshow.pause();
                     },
  
  //reset navigation
  setNavigation  : function()
                     {
                        if($('#'+slideshow.rootElement+' .navigation'))
                        {
                           var i = 0;
                           var index = slideshow.actualSlideIndex;
                           $('#'+slideshow.rootElement+' .navigation a').each( function(){

                                if(i==index)
                                {
                                  $(this).attr('class','slide_active');
                                }
                                else
                                {
                                  $(this).attr('class','slide_unactive');
                                }
                                
                                i++;
                           });
                           
                         }
                     },
  //animate slide                    
  animateSlide     : function()
                     {
                        slideshow.hideArrows();
                        slideshow.isAnimating = true;
                        slideshow.setNavigation();     
                        
                        $('#'+slideshow.rootElement+' .slides img').eq(slideshow.prevSlideIndex).css('width',slideshow.width);
                        $('#'+slideshow.rootElement+' .slides img').eq(slideshow.prevSlideIndex).css('height',slideshow.height);
                        
                        $('#'+slideshow.rootElement+' .slides img').eq(slideshow.prevSlideIndex).animate({
                              opacity: 'hide',
                              width: slideshow.width,
                              height: slideshow.height
                            }, 
                            slideshow.stepInterval*0.3,
                            'linear'
                        );
                        
                        $('#'+slideshow.rootElement+' .slides img').eq(slideshow.actualSlideIndex).css('width',slideshow.width);
                        $('#'+slideshow.rootElement+' .slides img').eq(slideshow.actualSlideIndex).css('height',slideshow.height);
                          
                        $('#'+slideshow.rootElement+' .slides img').eq(slideshow.actualSlideIndex).animate({
                              opacity: 'show',
                              width: slideshow.width,
                              height: slideshow.height
                            }, 
                            slideshow.stepInterval,
                            'linear',
                            function()
                            {
                               slideshow.checkArrows(); 
                            }
                        );
                        
                        slideshow.showDescription();
                        
                     }, 
  
  //show description
  showDescription   : function()
                     {
                         var label = $('#'+slideshow.rootElement+' .slides img ').eq(slideshow.actualSlideIndex).attr('data-label');
                         var text = $('#'+slideshow.rootElement+' .slides img ').eq(slideshow.actualSlideIndex).attr('data-text');
                         
                         $('#'+slideshow.rootElement+' .description').animate({
                                  opacity: 'hide'
                                }, 
                                slideshow.stepInterval*0.3,
                                'linear'
                         );
                             
                         if(label && text)
                         {
                             $('#'+slideshow.rootElement+' .description').html('<h1>'+label+'</h1><p>'+text+'</p>');
                              
                             $('#'+slideshow.rootElement+' .description').animate({
                                  opacity: 'show'
                                }, 
                                slideshow.stepInterval,
                                'linear'
                             );
                         }
                     },   
                                                                
  //count of slides in slideshow
  countSlides      : function()
                     {  
                         var c = 0;
                         $('#'+slideshow.rootElement+' .slides img').each( function(){
                            c++;
                         });
                         
                         slideshow.numSlides = c;
                     }
  };
  
  slideshow.init();
  
  //return slideshow object
  return slideshow;

}
