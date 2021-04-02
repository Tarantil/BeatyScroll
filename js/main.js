var banner = document.querySelector('.banner');
var bannerH1 = document.querySelector('.banner_h1');
var bannerArrow = document.querySelector('.banner_arrow');
var animationCont=document.querySelector('.banner_animation_link');
var afterAnimation1=document.querySelector('.content');
var afterAnimation=document.querySelector('.content .container');
let scale=1;
let translateYAfter=30;
var finishTranslateYH1=-bannerH1.getBoundingClientRect().top-150;
var finishTranslateYArrow=bannerArrow.getBoundingClientRect().bottom+150;
var positionAnim=afterAnimation1.getBoundingClientRect().top
if(window.pageYOffset==0){
  animationCont.style.transform='scale('+scale+')';
  afterAnimation.style.transform='translateY('+translateYAfter+'vh)';
}



var scrollToLink = function () {
var linkNav = document.querySelectorAll('[href^="#"]'), //выбираем все ссылки к якорю на странице
    V = 1;  // скорость, может иметь дробное значение через точку (чем меньше значение - тем больше скорость)
for (var i = 0; i < linkNav.length; i++) {
    linkNav[i].addEventListener('click', function(e) { //по клику на ссылку
        e.preventDefault(); //отменяем стандартное поведение
        var w = window.pageYOffset,  // производим прокрутка прокрутка
            hash = this.href.replace(/[^#]*(.*)/, '$1');  // к id элемента, к которому нужно перейти
        t = document.querySelector(hash).getBoundingClientRect().top,  // отступ от окна браузера до id
            start = null;
        requestAnimationFrame(step);  // подробнее про функцию анимации [developer.mozilla.org]
        function step(time) {
            if (start === null) start = time;
            var progress = time - start,
                r = (t < 0 ? Math.max(w - progress/V, w + t) : Math.min(w + progress/V, w + t));
            window.scrollTo(0,r);
            if (r != w + t) {
                requestAnimationFrame(step)
            } else {
                location.hash = hash  // URL с хэшем
            }
        }
    }, false);}
}
var TransformChangeUp = function (target) {
    translate=-window.pageYOffset;
    target.style.transform='translateY('+translate+'px)';
}
var TransformChangeDown = function (target) {
    translate=window.pageYOffset;
    target.style.transform='translateY('+translate+'px)';
}
var TransformChangeScale = function (target) {
  scale=window.pageYOffset/200+1;
  target.style.transform='scale('+scale+')';
}
var TransformTranslateUp = function (target, direction, finishTranslate) {
  var translate=0;
  if(window.pageYOffset==0){
    translate=0;
    target.style.transform='translateY('+translate+'px)';
  }
  if(direction && translate>=finishTranslate){
    TransformChangeUp(target);
  }
  else if(!direction  && positionAnim-window.pageYOffset>=200){
    TransformChangeUp(target);
  }
}
var TransformTranslateDown = function (target, direction, finishTranslate) {
  var translate=0;
  if(window.pageYOffset==0){
    translate=0;
    target.style.transform='translateY('+translate+'px)';
  }
  if(direction && translate<=finishTranslate){
    TransformChangeDown(target);
  }
  else if(!direction  && positionAnim-window.pageYOffset>=200){
    TransformChangeDown(target);
  }
}
var TransformScale = function (target,direction) {
  
  if(window.pageYOffset==0){
    scale=1;
    target.style.transform='scale('+scale+')';
  }
  if(direction && scale<=5){
    TransformChangeScale(target);
  }
  else if(!direction && scale>=1 && positionAnim-window.pageYOffset>=200){

    TransformChangeScale(target);
  }
}
var ChangeContent = function (direction) {
  
   if(window.pageYOffset==0){
    translateYAfter=30;
    afterAnimation.style.transform='translateY('+translateYAfter+'vh)';
  }
   if(afterAnimation1.getBoundingClientRect().top<-500){
    translateYAfter=0;
    afterAnimation.style.transform='translateY('+translateYAfter+'vh)';
   }
  if(down && translateYAfter>0){
    translateYAfter-=1;
    afterAnimation.style.transform='translateY('+translateYAfter+'vh)';
  }
  if(!down && translateYAfter<=30 && afterAnimation1.getBoundingClientRect().top>=-500){
    translateYAfter+=1;
    afterAnimation.style.transform='translateY('+translateYAfter+'vh)';
  }

  if(down && positionAnim-window.pageYOffset<800 && positionAnim-window.pageYOffset>600){
    afterAnimation.style.opacity='0.5';
  }
  else if(!down && positionAnim-window.pageYOffset>700){
    afterAnimation.style.opacity='0.5';
  }
  else{
    afterAnimation.style.opacity='1';
  }
}
window.addEventListener('scroll',() => {
  var down=true;
  down=this.oldScroll > this.scrollY ? false : true;
  this.oldScroll = this.scrollY;
  TransformTranslateUp(bannerH1,down,finishTranslateYH1);
  TransformTranslateDown(bannerArrow,down,finishTranslateYArrow);
  TransformScale(animationCont, down);
  ChangeContent(down);
 /*if(window.pageYOffset==0){
  banner.onmouseover = function(event) {
    scale=1.03;
    animationCont.style.transform='scale('+scale+')';
  };
  banner.onmouseout = function(event) {
    scale=1;
    animationCont.style.transform='scale('+scale+')';
  };
}*/
});

scrollToLink();
TransformChangeUp(bannerH1);
TransformChangeDown(bannerArrow);
TransformChangeScale(animationCont);
