var scheduleJson={};  //保存するスケジュールを格納するためのJSON
var scheIndex=-1;     //スケジュールのリストの要素番号を管理する変数

var scheduleFanc = {
  //初期化
  initialize: function() {
    //ローカルストレージに保存されているスケジュール用のJSONを格納する
    if(!(localStorage.schedule===void 0)){
      scheduleJson=JSON.parse(localStorage.schedule);
      //保存されたスケジュールからリストを作成する
      for(var i in scheduleJson){
        scheduleAuto(i,scheduleJson[i].date,scheduleJson[i].note);
      }
    }
    //スケジュール一覧画面の更新
    $("#scheduleCreate").hide();
    scheduleShow();
    this.bindEvents();
  },

  //イベントの管理
  bindEvents: function() {

    $(function(){
      // 初期状態で[削除]は非表示
      $(".badge").hide();

      // [削除]クリックで親要素を削除
      $("#scheduleLists").on("touchstart",".badge", deleteSchedule);

      //スワイプイベントをまとめた関数
      badgeSwipe();

      //加速度の変化タイミングを利用してスケジュールを自動で保存する
      window.addEventListener("devicemotion",scheduleAutoSave);
    });
  },
};
//スケジュールを削除する関数
function deleteSchedule(){
  //JSONで扱う処理 インデックスの変更とJSONからの削除
  scheIndex=$(this).parent().val();
  delete scheduleJson[scheIndex];
  //スケジュールリストの削除
  $(this).parent().remove();
  //スケジュール数が0になった時の処理
  if($("#scheduleLists li").length==0){
    scheIndex=0;
    scheduleShow();
  }
  //削除した状態のJSONをローカルストレージに保存する
  localStorage.schedule=JSON.stringify(scheduleJson);
}

//スケジュールを追加する関数
function addSchedule(){
  $(function(){
    var datetime = $("#scheDatetime").val();
    var note = $("#scheNote").val();

    //JSONのkeyをスケジュールリストの要素数にする
    for(var i=0;i<=Object.keys(scheduleJson).length;i++){
      if(!(i in scheduleJson)){
        scheIndex=i;
        break;
      }
    }

    scheduleAuto(scheIndex,datetime,note);
    scheduleToJson(datetime,note);
    scheduleShow();
  });
};
//スケジュールをリスト化する関数
function scheduleAuto(index,datetime,note){
  var listItem = document.createElement('li'),
  html =  note+", "+datetime+
  "<span class='badge'><i class='fa fa-fw fa-close'></i></span>";
  listItem.innerHTML = html;

  $(listItem).val(index);
  $("#scheduleLists").append(listItem);

  $(".badge").hide();
}
//スケジュールをJSONに変換して保存する関数
function scheduleToJson(date,note){

  $(function(){
    scheduleJson[scheIndex]={
      "date":date,
      "note":note
    };

    localStorage.schedule=JSON.stringify(scheduleJson);
    //削除コマンド デバッグ用
    //localStorage.removeItem("schedule");
  });
};
//スワイプ処理の関数
function badgeSwipe(){
  //スワイプイベントを管理する変数
  var tsJqSwipeX = -1;
  var tsJqSwipeY = -1;
  // スワイプ処理
  $("#scheduleLists").on("touchstart","li", function(){
    tsJqSwipeX = event.changedTouches[0].pageX;
    tsJqSwipeY = event.changedTouches[0].pageY;
  });
  $("#scheduleLists").on("touchend","li", function(){
    tsJqSwipeX = -1;
  });
  $("#scheduleLists").on("touchmove","li", function(){
    if (Math.abs(event.changedTouches[0].pageY - tsJqSwipeY) > 10) tsJqSwipeX = -1;
    if (tsJqSwipeX != -1 && (event.changedTouches[0].pageX - tsJqSwipeX) < -35) {
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
}
//スケジュール保存のトリガーをモーションにした時の関数
function scheduleAutoSave(){
  if(scheShake>5 && $("#scheduleCreate").is(":visible")){
    alert("保存しました。")
    scheduleList();
    scheShake=0;
  }else if($("#scheduleCreate").is(":hidden")){
    scheShake=0;
  }
}
