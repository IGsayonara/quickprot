import 'babel-polyfill';
import _ from 'lodash';

import './../sass/reset.scss';
import './../sass/containers.scss';
import './../sass/buttons.scss';
import './../sass/header.scss';
import './../sass/banner.scss';
import './../sass/descr.scss';
import './../sass/text-blocks.scss';
import './../sass/video.scss';
import './../sass/grid.scss';
import './../sass/padd_marg.scss';

const o = {
  foo: {
    bar: null
  }
};

function headerColor(){
  let posTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
  let headers = document.querySelectorAll('header');
  headers.forEach(header => {
    if(posTop){
      header.classList.add('header-scrolled');
    }
    else{
      header.classList.remove('header-scrolled');
    }
  });
}

function initHeader(){
  let mobile = document.getElementById('header-mobile');
  let desctop = document.getElementById('header-desctop');
  if(window.innerWidth < 1200){
    desctop.classList.add('dn');
    mobile.classList.remove('dn');
  }
  else{
    mobile.classList.add('dn');
    desctop.classList.remove('dn');
  }
  headerColor();
}

function toggleMobileMenu(){
  let mobileMenu = document.querySelector('.hidden-part');
  mobileMenu.classList.toggle('opened');
  let openButton = document.getElementById('open-menu-button');
  openButton.classList.toggle('close-btn');
  let body = document.querySelector('.body');
  body.classList.toggle('body-has-opened-mobile-menu');
}

function closeMobileMenu(){
  let mobileMenu = document.querySelector('.hidden-part');
  mobileMenu.classList.remove('opened');
  let openButton = document.getElementById('open-menu-button');
  openButton.classList.remove('close-btn');
  let body = document.querySelector('.body');
  body.classList.remove('body-has-opened-mobile-menu');
}

function setGreyscale(){
  let element = document.getElementById('animated-extra-text');
  let grey = document.querySelector('.grey');
  let elementHeight = element.offsetHeight;
  grey.style.height = elementHeight + "px";
  //grey.style.bottom = elementHeight*0.5 + "px";
}

function getCofForExtraText(testWidth){
  let containerWidth = document.querySelector('.description .container').offsetWidth;
  let k = containerWidth/testWidth;
  return k;
}

function setExtraText(k){
  let text = document.querySelector('.extra-text');
  text.style.fontSize = `${k}px`;
  text.style.bottom = `${-(k*0.4)}px`
}
function animate(){
  let extraText = document.getElementById('animated-extra-text');
  if(isElementInViewport(extraText)){
    extraText.classList.remove('not-animated');
    return true;
  }
  return false;
  function isElementInViewport(el) {
    var rect = el.getBoundingClientRect();
    return (
      rect.top >= 110 &&
      //rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document. documentElement.clientHeight)
      //rect.right <= (window.innerWidth || document. documentElement.clientWidth)
    );
  }
}

document.addEventListener('DOMContentLoaded', () => {

  initHeader();

  let navLinks = document.querySelectorAll('.nav-menu a');
  navLinks.forEach((link)=>{
    link.addEventListener('click', () => {
      link.classList.add('active');
      navLinks.forEach((other) =>{
        if(other !== link){
          other.classList.remove('active');
        }
      });
    });
  });

  let langBtn = document.querySelectorAll('.lang-wrap');
  langBtn.forEach((btn)=>{
    btn.addEventListener('mouseover', () => {
      btn.classList.add('lang-wrap-open');
    });
    btn.addEventListener('mouseout', () => {
      btn.classList.remove('lang-wrap-open');
    });
  });

  window.addEventListener('resize', () => {
    initHeader();
    //console.log(window.innerWidth);
    if(window.innerWidth > 1200){
      closeMobileMenu();
    }
    setExtraText(getCofForExtraText(testWidth));
    setGreyscale();
  });

  let openButton = document.getElementById('open-menu-button');
  let thisData = Date.now();
  let openMobileMenuEvent = openButton.addEventListener('click', function callbackForOpenButton(){
    if(Date.now() - thisData > 700){
      toggleMobileMenu();
      thisData = Date.now();
    }
  });

  document.addEventListener('scroll', () => {
    headerColor();
  });

  document.addEventListener('scroll', function animation(){
    if(animate()) document.removeEventListener('scroll', animation);
  });
  
  let test = document.getElementById('test-text');
  let testArr = test.innerText.split("");
  test.innerHTML = "";
  testArr.forEach((element) => {
    test.innerHTML += `<span class="letter">${element}`
  });
  
  let letters = document.querySelectorAll('.letter');
  let testWidth = 0;
  letters.forEach((letter) => {
    testWidth += letter.offsetWidth;
  });

  setExtraText(getCofForExtraText(testWidth));
  setGreyscale();
  //if(animate()) document.removeEventListener('scroll', animation);
});