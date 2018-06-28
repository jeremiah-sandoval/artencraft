$(document).ready(function(){
  // Main Nav Menu
  function closenav(){
    $('#main-nav').css({'display':'none', 'width': '0px'});
    $('#mainnav-overlay').hide();
  }
  function opennav(){
    $('#main-nav').css({'display':'block', 'width': '300px'});
    $('#mainnav-overlay').show();
  }
  $('#mainnav-trigger').click(function(){ opennav(); });
  $('#mainnav-close').click(function(){ closenav(); });
  $('#submenu-close').click(function(){ closenav(); });
  $('#mainnav-overlay').click(function(){ closenav(); });
  $('#main-nav > .navigation > ul > li').hover(function(){
    $(this).find('.submenu').toggle();
  });

  // Sticky Header
  $(window).scroll(function(){
    if ($(window).scrollTop() >= 300) {
      $('header .top').addClass('sticky');
    }
    else {
      $('header .top').removeClass('sticky');
    }
  });

  //Smooth scroll
  $('a.smooth-scroll[href*="#"]:not([href="#"])').click(function() {
  if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
    var target = $(this.hash);
    target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
    if (target.length) {
      $('html, body').animate({
        scrollTop: target.offset().top + (-90)
      }, 1000);
      return false;
    }
  }
  });

});
