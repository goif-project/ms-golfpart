const $ = require("jquery");

$(function (){
  function stageSelect(){
    location.pathname == '/stage_select'
      ? console.log("agoo")
      : false;
  }

  console.log("aaa");

  stageSelect();
});
