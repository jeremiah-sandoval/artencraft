$(document).ready(function(){
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
  $('#main-nav ul li').hover(function(){
    $(this).find('.submenu').toggle();
  });

});
