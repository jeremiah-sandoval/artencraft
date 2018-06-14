$(document).ready(function(){
  function closenav(){
    $('#main-nav').css('width','0px');
    $('#mainnav-overlay').hide();
  }
  function opennav(){
    $('#main-nav').css('width','300px');
    $('#mainnav-overlay').show();
  }
  $('#mainnav-trigger').click(function(){ opennav(); });
  $('#mainnav-close').click(function(){ closenav(); });
  $('#mainnav-overlay').click(function(){ closenav(); });
});
