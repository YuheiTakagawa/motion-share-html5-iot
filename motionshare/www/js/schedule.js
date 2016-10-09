var scheduleJson={};  //保存するスケジュールを格納するためのJSON
var scheIndex=-1;     //スケジュールのリストの要素番号を管理する変数

var scheduleFanc = {
  //初期化
  initialize: function() {
    //ローカルストレージに保存されているスケジュール用のJSONを格納する
    if(!(localStorage.schedule===void 0)){
      scheduleJson=JSON.parse(localStorage.schedule);

      //過ぎたスケジュールを削除する
      for(var key in scheduleJson){
        if(getTimestamp(scheduleJson[key].date)<$.now()){
          alert(scheduleJson[key].date+"に予定だった"+scheduleJson[key].note+"を削除しました");
          delete scheduleJson[key];
        }
      }

      //スケジュールをソートした結果を格納
      scheduleJson = sortObject(scheduleJson, function(a, b){
        var at = getTimestamp(a.date); //日付文字列を取得し、それをタイムスタンプに変換
        var bt = getTimestamp(b.date); //上に同じ
        return at - bt; //降順にソートする場合、変数aとbの位置を逆にする
      });

      //削除・ソート状態のJSONをローカルストレージに保存する
      localStorage.schedule=JSON.stringify(scheduleJson);
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
      //$(".badge").hide();

      // [削除]クリックで親要素を削除
      $("#scheduleLists").on("touchstart",".badge", deleteSchedule);
      $("#scheduleLists").on("touchstart","li",scheduleIndex);
      //スワイプイベントをまとめた関数
      //badgeSwipe();

      //加速度の変化タイミングを利用してスケジュールを自動で保存する
      //window.addEventListener("devicemotion",scheduleAutoSave);
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
  //スケジュールをソートした結果を格納
  scheduleJson = sortObject(scheduleJson, function(a, b){
    var at = getTimestamp(a.date); //日付文字列を取得し、それをタイムスタンプに変換
    var bt = getTimestamp(b.date); //上に同じ
    return at - bt; //降順にソートする場合、変数aとbの位置を逆にする
  });

  //削除した状態のJSONをローカルストレージに保存する
  localStorage.schedule=JSON.stringify(scheduleJson);
}

//スケジュールを追加する関数
function addSchedule(){
  $(function(){
    var datetime = $("#scheDatetime").val();
    if(datetime=="")datetime="0000-00-00T00:00"
    var note = $("#scheNote").val();

    //JSONのkeyをスケジュールリストの要素数にする
    for(var i=0;i<=Object.keys(scheduleJson).length;i++){
      if(!(i in scheduleJson)){
        scheIndex=i;
        break;
      }
    }


    scheduleToJson(datetime,note);
    scheduleAuto(scheIndex,datetime,note);
    scheduleShow();
    $("#view").load('scheduleList.html',function(){
      scheduleFanc.initialize();
    });
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

  //$(".badge").hide();
}
//スケジュールをJSONに変換して保存する関数
function scheduleToJson(date,note){

  $(function(){
    scheduleJson[scheIndex]={
      "date":date,
      "note":note
    };
    scheduleJson = sortObject(scheduleJson, function(a, b){
      a = getTimestamp(a.date); //日付文字列を取得し、それをタイムスタンプに変換
      b = getTimestamp(b.date); //上に同じ
      return a - b; //降順にソートする場合、変数aとbの位置を逆にする
    });
    localStorage.schedule=JSON.stringify(scheduleJson);
    //削除コマンド デバッグ用
    //localStorage.removeItem("schedule");
  });
};


/*
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
*/

/*
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
*/

//日付のタイムスタンプ取得関数を定義
function getTimestamp(dateStr){
  //正規表現で文字列中の数値を取得
  var dateMatch = dateStr.match(/(\d+)-(\d+)-(\d+)T(\d+):(\d+)/);

  //日付オブジェクトに変換
  var dateObj = new Date(
    +dateMatch[1],     //年
    +dateMatch[2] - 1, //月
    +dateMatch[3],     //日
    +dateMatch[4],     //時
    +dateMatch[5],     //分
    +0                 //秒
  );
  //日付に対応する数値を取得し、出力
  return dateObj.getTime();
}
function sortObject(obj,callback){
  var
  new_obj ={},
  sort_arr=[]
  ;
  for(var key in obj){
    sort_arr[sort_arr.length]={
      "date":obj[key].date,
      "note":obj[key].note
    };
  }
  sort_arr.sort(function(a,b){
    return callback(a,b);
  });
  for(var i=0,c=sort_arr.length;i<c;i++){
    new_obj[i]=sort_arr[i];
  }
  return new_obj;
}

//画面レイアウトに関する関数

function scheduleShow(){
  //alert($("#scheduleLists li").length);
  if($("#scheduleLists li").length==0){
    $("#scheduleNone").css('display','');
    $("#scheduleLists").css('display','none');
  }else{
    $("#scheduleNone").css('display','none');
    $("#scheduleLists").css('display','');
  }
}
function scheduleCreate(){
  $(function(){
    $("#scheduleCreate").show();
    $("#scheduleList").hide();
    $(".brand-logo").html("スケジュール作成");
  });
}

function scheduleList(){
  $(function(){
    $("#scheduleCreate").hide();
    $("#scheduleList").show();
    $(".brand-logo").html("スケジュール");
    addSchedule();
  });
}

function calcDate(){
  var date=new Date();
  var year=date.getFullYear();
  var month=date.getMonth()+1;
  var day=date.getDate();
  var hour=date.getHours();
  var minute=date.getMinutes()+1;
  var dates=year+"-"+('0'+month).slice(-2)+"-"+('0'+day).slice(-2)+"T"+('0'+hour).slice(-2)+":"+('0'+minute).slice(-2)+":00";
  $("#scheDatetime").val(dates);
  hour-=9;
  if(hour<0){
    hour=23-hour;
    day--;
  }
  var minute=date.getMinutes()+1;
  var dates=year+"-"+('0'+month).slice(-2)+"-"+('0'+day).slice(-2)+"T"+('0'+hour).slice(-2)+":"+('0'+minute).slice(-2)+":00";
  $("#scheDatetime").attr('min',dates);
}

function scheduleIndex(e){
  sessionStorage.scheduleIndex=e.target.value;
  alert("共有するスケジュールを変更しました");
  PageControll(0);
}
