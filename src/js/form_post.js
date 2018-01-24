const $ = require("jquery")

function btn_post(){
  var url   = location.href;
  var parameters    = url.split("?");
  console.log(parameters);
  if(parameters[1] != null){
    var paramsArray = [];
    var neet = parameters[1].split("=");
    console.log(neet);
    var neet1 = neet[1];
    if(neet[0] == "stage_id"){
      sessionStorage.setItem("stage_id",neet1);
    }

    var str = $(':hidden[name="counter_num"]').val();
    sessionStorage.setItem(['char_post'],[str]);

    var a = window.sessionStorage.getItem(['char_post']);
  }
}

btn_post();
export {btn_post};
