function homeInitilize(){
  $(function(){
    //ホーム画面でのスケジュール自動削除　スケジュール画面にも適用できる
    setInterval(function(){
      if(autoScheduleDelete()=="1"){
        //削除状態のJSONをローカルストレージに保存する
        localStorage.schedule=JSON.stringify(scheduleJson);
        sessionStorage.scheduleIndex='0';
        scheduleFanc.readySchedule();
        homeScheIni();
      }
    },60*1000);
    homeScheIni();

    $("#file_01").change(function(){
      $("#mask_file_01").val($("#file_01").val());
      $("#fileName").html($("#mask_file_01").val());
    });
    $("#mask_file_01").click(function(){
      $("#file_01").click();
    });
/*
    var peer = new Peer(socket.id, {key: PEERJS_ID});
    var conn = peer.connect("858", {'serialization': 'binary-utf8'});

    conn.on('open', function(){
      $("#modeStatus").on('click',function(){
        $.each(peer.connections, function(_id, _conn) {
          _conn[0].send({
            message: localStorage.getItem('imageData'),
            ids: [socket.id]
          });
        });
      });
      conn.on('data', function(data){
        var message = data.message;
        localStorage.setItem('imageData', message);
        $('#camera_pic').attr('src', 'data:image/jpeg;charset=utf-8;base64,' + message);
      });
    });
    */
  });
}

//画像をlocalに保存する
function savePhoto(){
  var data = localStorage.getItem('imageData');
  saveBase64PhotoData(data);
}



function homeScheIni(){
  $(function(){

    var date="--/-- --:--";
    var note="You don't have schedule"
    if(!(localStorage.schedule===void 0)){
      var json=JSON.parse(localStorage.schedule);
      var index='0';
      if(!(sessionStorage.scheduleIndex===void 0)){
        index=sessionStorage.scheduleIndex;
      }
      if((Object.keys(json)!="")&&!(json[index]===void 0)){
        var date=json[index].date;
        var dateMatch = date.match(/(\d+)-(\d+)-(\d+)T(\d+):(\d+)/);
        //日付オブジェクトに変換
        var dateObj = new Date(
          +dateMatch[1],     //年
          +dateMatch[2],     //月
          +dateMatch[3],     //日
          +dateMatch[4],     //時
          +dateMatch[5],     //分
          +0                 //秒
        );
        date=(dateMatch[2])+"/"+dateMatch[3]+" "+dateMatch[4]+":"+dateMatch[5];
        note=json[index].note;
      }
    }
    $("#recentScheduleDate").html(date);
    $("#recentScheduleNote").html(note);
  });
}

var audio=[];
function audioInitialize(){
  for(var i=0;i<6;i++){
    audio[i]=new Audio();
  }
  audio[0].src="audio/whip-gesture2.mp3";
  audio[1].src="audio/slap1.mp3";
  audio[2].src="audio/jump1.mp3";
  audio[3].src="audio/ta_ta_suraido01.mp3";
  audio[4].src="audio/ta_ta_kira08.mp3";
  audio[5].src="audio/cncl07.mp3";
}

function audioPlay(num){
  audio[num].play();
}
