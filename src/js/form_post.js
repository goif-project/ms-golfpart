const $ = require("jquery")

function btn_post(){
  var url   = location.href;
  var parameters    = url.split("?");
  if(parameters[1] != null){
    var paramsArray = [];
    var neet = parameters[1].split("=");
    var neet1 = neet[1];
    var str = $(':hidden[name="counter_num"]').val();
    sessionStorage.setItem(['char_post'],[str]);

    var a = window.sessionStorage.getItem(['char_post']);
    $("#post").append(neet1);
  }
}

btn_post();
export {btn_post};
