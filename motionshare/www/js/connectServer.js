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




/****************  画像 送信処理  ****************/
function sendPhotoData(socketID){
  var data = localStorage.getItem('imageData');
  socket.emit("send real data to server", [ 2 , socketID , data ]);
  disconnect();
  alert("PHOTO GO TO SERVER");
  modeChange();
  //connect();
  //alert(base64PhotoData);
}


/****************  スケジュール 送信処理  ****************/
function sendSchedule(socketID){
  //localStorageにscheduleがあるときに処理を行う
  if(!(localStorage.schedule===void 0)){
    scheduleJson=JSON.parse(localStorage.schedule);
    var index='0';
    if(!(sessionStorage.scheduleIndex===void 0)){
      index=sessionStorage.scheduleIndex;
    }
    //直近のスケジュールを扱う
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


/****************  連絡先 送信処理  ****************/
function sendContact(){
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
    socket.emit("html5_test",sendingContact);
    alert("CONTACT GO TO SERVER");
  }
}




/****************  スケジュール 受信処理  ****************/
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
  scheduleToJson(datetime,note);
  scheduleAuto(scheIndex,datetime,note);
  scheduleShow();
  sessionStorage.scheduleIndex='0';
  $("#view").load('scheduleList.html',function(){
    scheduleFanc.initialize();
  });
}
