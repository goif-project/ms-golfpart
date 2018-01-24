const $ = require("jquery");

$(function(){
  window.location.href.split('/').pop() == 'stage_select.html'
    ?
      (console.log("ステージ選択"),
      $('.stage_part').on('click', function(){
        var id = $(this).attr("id");
        $('#next_link').attr('href', "page2.html?stage_id=" + id);

        $('#stage_description').html(id+"ステージを選択しています")
      }))
    :
      console.log("ステージ選択じゃない");
});
