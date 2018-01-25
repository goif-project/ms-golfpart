const $ = require("jquery");

$(function(){
  window.location.href.split('/').pop() == 'stage_select.html'
    ?
      (console.log("ステージ選択"),
      $('.stage_part').on('click', function(){
        var id = $(this).attr("id");
        $('#next_link').attr('href', "page2.html?stage_id=" + id);

        $('#stage_description').html(id+"ステージを選択しています")

        // 選択しているステージに枠をつける
        $('.stage_part .stage_view .overlay_border').removeClass('show');
        $(this).find('.overlay_border').addClass('show');
      }))
    :
      console.log("ステージ選択じゃない");
});
