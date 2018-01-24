const $ = require("jquery");

$(function(){
  window.location.href.split('/').pop() == 'stage_select.html'
    ?
      console.log("agooo")
    :
      console.log("agnnn")
});
