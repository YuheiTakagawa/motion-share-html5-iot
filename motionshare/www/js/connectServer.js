/******************************************************************/
/********              socket 接続系処理                 ***********/
/******************************************************************/

var socket = { on: function(){} };
var url = "https://motion-share.herokuapp.com"; //websocketサーバのURL。
// 接続
var connect = function() {
  //alert("connect");
  if ( !socket.connected ) socket = io.connect(url);
  else socket.connect();
}

// 切断
var disconnect = function(){
  //alert("disconnect");
  socket.disconnect();
}



/******************************************************************/
/********              送信処理                          ***********/
/******************************************************************/


//  contentID:0 連絡先 受信処理
function sendContact(socketID){
  //localStorageにcontactがあるときに処理を行う
  if(!(localStorage.contact===void 0)){
    //簡単に扱うために一時的にJSONを入れる変数
    var befferContact=JSON.parse(localStorage.contact);
    //保存されたユーザ情報にはパスワードも含まれるため，パスワードを除いた4項目のJSONを再構築
    var sendingContact={
      "Name":befferContact.Name,
      "Id":befferContact.Id,
      "Phone":befferContact.Phone,
      "Mail":befferContact.Mail
    };
    //名前が空文字であれば，不明とする
    if(sendingContact.Name=="") sendingContact.Name="不明";
    //JSONを文字列にしてサーバに送信
    sendingContact=JSON.stringify(sendingContact);
    socket.emit("send real data to server", [ 0 , socketID , sendingContact ]);
    disconnect();
    alert("CONTACT GO TO SERVER");
    modeChange();
  }
}


//  contentID:1 スケジュール 送信処理
function sendSchedule(socketID){
  //localStorageにscheduleがあるときに処理を行う
  if(!(localStorage.schedule===void 0)){
    scheduleJson=JSON.parse(localStorage.schedule);
    var index='0';
    if(!(sessionStorage.scheduleIndex===void 0)){
      index=sessionStorage.scheduleIndex;
    }
    //選択したスケジュールを扱う
    sendingSche=scheduleJson[index];
    sendingSche=JSON.stringify(sendingSche);

    if(sendingSche!=null){
      //Base64で送信するときは以下のbtoa関数のコメントアウトを解除する
      //Base64エンコード
      //sendingSche=btoa(unescape(encodeURIComponent(sendingSche)));
      socket.emit("send real data to server", [ 1 , socketID , sendingSche ]);
      //socket.emit("html5_test", sendingSche);
      disconnect();
      alert("SCHEDULE GO TO SERVER");
      modeChange();
      //Base64デコード
      //alert(decodeURIComponent(escape(atob(sendingSche))));
    }else{
      disconnect();
      alert("共有できるスケジュールがありません．");
      modeChange();
    }
  }
}


//  contentID:2 画像 送信処理
function sendPhotoData(socketID){
  var data = localStorage.getItem('imageData');
  socket.emit("send real data to server", [ 2 , socketID , data ]);
  disconnect();
  alert("PHOTO GO TO SERVER");
  modeChange();
}


/******************************************************************/
/********              受信処理                          ***********/
/******************************************************************/




//  contentID:0 連絡先 受信処理
function receiveContact(rcvCtt){
  var contact=JSON.parse(rcvCtt);
  var name=contact["Name"];
  var phone=contact["Phone"];
  var mail=contact["Mail"];
  alert("名前："+name+",電話番号："+phone+",メール："+mail+"を受信しました");
}






//  contentID:1 スケジュール 受信処理
function receiveSchedule(rcvMsg){
  alert("スケジュールを受信しました");
  var sche=JSON.parse(rcvMsg);
  var datetime=sche["date"];
  var note =sche["note"];
  //JSONのkeyをスケジュールリストの要素数にする
  for(var i=0;i<=Object.keys(scheduleJson).length;i++){
    if(!(i in scheduleJson)){
      scheIndex=i;
      break;
    }
  }
  //受け取ったスケジュールをJsonで保存し画面に反映
  scheduleToJson(datetime,note);
  scheduleAuto(scheIndex,datetime,note);
  scheduleShow();
  //ホーム画面のスケジュールは直近のスケジュールに変更
  sessionStorage.scheduleIndex='0';
  //スケジュール画面に自動で遷移 遷移しない方がいいのなら削除
  $("#view").load('scheduleList.html',function(){
    //イベント重複のない初期化
    scheduleFanc.readySchedule();
  });
}


//  contentID:2 画像 受信処理
function receivePhotoData(imageData){
  localStorage.setItem('imageData', imageData);
  alert("画像を受信しました");
  var data = localStorage.getItem('imageData');

  if(data.length < 100){
    $('.card-image').addClass('loadingWidth');
    $('#camera_pic').attr('src', 'img/load.gif');
  }else{
    $('.card-image').removeClass('loadingWidth');
    $('#camera_pic').attr('src', 'data:image/jpeg;charset=utf-8;base64,' + data);
    saveBase64PhotoData(data);
  }
}
