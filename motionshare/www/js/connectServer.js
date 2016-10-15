//recodemo.herokuapp.com
var url = "https://motion-share.herokuapp.com"; //websocketサーバのURL。
var socket = io.connect(url);
socket.on("connect", function() {
  $(".info").text('connect server...OK');
});






function sendPhotoData(socketID){
  var data = localStorage.getItem('imageData');
  socket.emit("send real data to server", [ 2 , socketID , data ]);
  alert("PHOTO GO TO SERVER ");
  //alert(base64PhotoData);
}


//スケジュールを文字列に変換し，Base64でエンコードしてサーバに送信
function sendSchedule(){
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
      socket.emit("html5_test", sendingSche);
      alert("SCHEDULE GO TO SERVER");
      //Base64デコード
      //alert(decodeURIComponent(escape(atob(sendingSche))));

    }else{
      alert("共有できるスケジュールがありません．");
    }
  }
}


//連絡先のJSONを文字列に変換し，サーバに送信
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
