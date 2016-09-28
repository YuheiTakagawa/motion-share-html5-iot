var scheduleJson={};
var scheIndex=-1;
var scheduleFanc = {
  //初期化
  initialize: function() {
    $("#scheduleCreate").hide();
    this.bindEvents();
    scheduleJson=JSON.parse(localStorage.schedule);
    for(var i in scheduleJson){
      scheduleAuto(i,scheduleJson[i].date,scheduleJson[i].note);
    }
    scheduleShow();
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
        //JSONで扱う処理 インデックスの変更とJSONからの削除
        scheIndex=$(this).parent().val();
        delete scheduleJson[scheIndex];
        //スケジュールリストの削除
        $(this).parent().remove();
        if($("#scheduleLists li").length==0){
          scheIndex=0;
        }
        localStorage.schedule=JSON.stringify(scheduleJson);
        alert(localStorage.schedule);
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

      //JSONのkeyをスケジュールリストの要素数にする
      if(scheIndex==-1){
        scheIndex=$("#scheduleLists li").length;
      }
    scheduleAuto(scheIndex,datetime,note);
    scheduleToJson(datetime,note);
   scheduleShow();
  });
};

function scheduleAuto(index,datetime,note){
  var listItem = document.createElement('li'),
  html =  note+", "+datetime+
  "<span class='badge'><i class='fa fa-fw fa-close'></i></span>";
  listItem.innerHTML = html;

  $(listItem).val(index);
  $("#scheduleLists").append(listItem);

  $(".badge").hide();
  //alert($(listItem).val());
}

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
