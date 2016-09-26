var scheduleJson={};
var scheIndex=-1;
var scheduleFanc = {
  //初期化
  initialize: function() {
    $("#scheduleCreate").hide();
    this.bindEvents();
  },

  //イベントの管理
  bindEvents: function() {
    var tsJqSwipeX = -1;
    var tsJqSwipeY = -1;

    $(function(){
      // 初期状態で[削除]は非表示
      $(".badge").hide();

      // [削除]クリックで親要素を削除
      $("#scheduleLists").on("touchstart",".badge", function(){
        scheIndex=$(this).parent().index()+1;
        $(this).parent().remove();
      });

      // スワイプ処理
      $("#scheduleLists").on("touchstart","li", function(){
        tsJqSwipeX = event.changedTouches[0].pageX;
        tsJqSwipeY = event.changedTouches[0].pageY;
      });
      $("#scheduleLists").on("touchend","li", function(){
        tsJqSwipeX = -1;
        flag = 0;
      });
      $("#scheduleLists").on("touchmove","li", function(){
        if (Math.abs(event.changedTouches[0].pageY - tsJqSwipeY) > 10) tsJqSwipeX = -1;
        if (tsJqSwipeX != -1 && Math.abs(event.changedTouches[0].pageX - tsJqSwipeX) > 35) {
          tsJqSwipeX = -1;
          // スワイプられた時の処理
          if ($(this).children("span").is(':visible')) {
            $(".badge").hide();
          } else {
            $(".badge").hide();
            $(this).children("span").show();
          }
        }
      });
    });
  },
};

var addSchedule=function(){
  $(function(){
    var datetime = $("#scheDatetime").val();
    var note = $("#scheNote").val();
    var listItem = document.createElement('li'),
    html =  note+", "+datetime+
    "<span class='badge'><i class='fa fa-fw fa-close'></i></span>";

    listItem.innerHTML = html;
    $("#scheduleLists").append(listItem);
    $(".badge").hide();

    //JSONのkeyをスケジュールリストの要素数にする
    if(scheIndex==-1){
      scheIndex=$("#scheduleLists li").length;
    }
    scheduleToJson(datetime,note);

    scheduleShow();
  });
};

var scheduleToJson = function(date,note){

  $(function(){
    scheduleJson[scheIndex]={
      "date":date,
      "note":note
    };

    localStorage.schedule=JSON.stringify(scheduleJson);
    alert(localStorage.schedule);
    scheIndex=-1;
  });
};
