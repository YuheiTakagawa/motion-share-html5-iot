var changeMotionBool = new Boolean(false);
changeMotionBool = true; //true: 送信者 / false:受信者

var whoAmI = 0;

/*******  モード切り替え処理  *******/
function modeChange(){
  changeMotionBool = !changeMotionBool;

  if(changeMotionBool == true){
    senderMode();
  }
  else if(changeMotionBool == false){
    receiverMode();
  }
}


/*******  socket再接続処理  *******/
function reConnect(){
  setTimeout(function(){
    socket.on("connect", function() {alert("reConnect");});
  }, 500);
}


/*----------------------------------------------------------*/
/*----------      送信者モードのときの処理      ----------------*/
/*----------------------------------------------------------*/
function senderMode(){
  whoAmI = 1;
  //alert(whoAmI);
  $("#modeStatus").html("送信者");
  $('input[name="modeChangeBtn"]').prop("checked",true);
  //イベントを削除（受信できない）
  //socket.off('html5_test_show');

  socket.on('data request', function(id){
    //var motionArray = id.split(',');
    //contentID = motionArray[0];
    //socketID = motionArray[1];
    alert("Request GET: " + id[0]);

    var contentID = id[0];
    var socketID = id[1];

    switch (contentID) {
      /****** 連絡先の受信処理 ( CONTENT ID : 0 ) ************/
      case 0:
      socket.emit('html5_test_show', function(data){
        alert("連絡先を受信しました　:" + data);
      });
      break;
      /****** スケジュールの受信処理 ( CONTENT ID : 1 )  *****/
      case 1:
      socket.emit('html5_test_show', function(data){
        receiveSchedule(data);
      });
      break;
      /****** 画像の受信処理 ( CONTENT ID : 2 ) ************/
      case 2:
        sendPhotoData(socketID);
        socket.on('data request');
      break;
    }
  });
}


/*----------------------------------------------------------*/
/*----------      受信者モードのときの処理      ----------------*/
/*----------------------------------------------------------*/
function receiverMode(){
  whoAmI = 0;
  //alert(whoAmI);
  $("#modeStatus").html("");
  $('input[name="modeChangeBtn"]').prop("checked",false);

  socket.on('send real data from server', function(data){
    //data[0] is contentID
    switch (data[0]) {
      case 0:
      break;
      case 1:
      break;
      case 2:
        receivePhotoData(data[1]);
        socket.on('disconnect', function(){alert('disconnect');});
        //socket.on('send real data from server');
      break;
    }


    function receivePhotoData(imageData){
      alert("画像を受信しました");
      localStorage.setItem('imageData', imageData);
      var data = localStorage.getItem('imageData');

      //if(data.length < 100){
        //$('.card-image').addClass('loadingWidth');
        //$('#camera_pic').attr('src', 'img/load.gif');
      //}else{
        $('.card-image').removeClass('loadingWidth');
        $('#camera_pic').attr('src', 'data:image/jpeg;charset=utf-8;base64,' + data);
        //saveBase64PhotoData(data);
      //}
    }
  });
}
