//recodemo.herokuapp.com
var url = "https://motion-share.herokuapp.com"; //websocketサーバのURL。
var socket = io.connect(url);
socket.on("connect", function() {
  $(".info").text('connect server...OK');
});

//スケジュールを文字列に変換し，Base64でエンコードしてサーバに送信
function sendSchedule(){
  if(!(localStorage.schedule===void 0)){
    scheduleJson=JSON.parse(localStorage.schedule);

    sendingSche=scheduleJson["0"];
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

  function sendContact(){
    if(!(localStorage.contact===void 0)){
      var befferContact=JSON.parse(localStorage.contact);
      var sendingContact={
        "Name":befferContact.Name,
        "Id":befferContact.Id,
        "Phone":befferContact.Phone,
        "Mail":befferContact.Mail
      };
      if(sendingContact.Name=="") sendingContact.Name="不明";
      sendingContact=JSON.stringify(sendingContact);
      socket.emit("html5_test",sendingContact);
      alert("CONTACT GO TO SERVER");
    }
  }
