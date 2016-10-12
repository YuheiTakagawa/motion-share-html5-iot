var changeMotionBool = new Boolean(false);
changeMotionBool = false; //true: 送信者 / false:受信者

/*******  モード切り替え処理  *******/
function modeChange(){
  changeMotionBool = !changeMotionBool;

  if(changeMotionBool == true) senderMode();
  else if(changeMotionBool == false) receiverMode();
}

/*
function modeFuncTrigger(){
if(changeMotionBool == true){
senderMode();
alert("Sender-Mode now");
}
else if(changeMotionBool == false){
receiverMode();
alert("Receiver-Mode now");
}
}
*/

/*******  送信者モードのときの処理  *******/
function senderMode(){
  $("#modeStatus").html("送信者");
  $('input[name="modeChangeBtn"]').prop("checked",true);
  //イベントを削除（受信できない）
  socket.off('html5_test_show');
}

/*******  受信者モードのときの処理  *******/
function receiverMode(){
  $("#modeStatus").html("");
  $('input[name="modeChangeBtn"]').prop("checked",false);

  //イベントを削除（受信できない）
  socket.off('html5_test_show');
  //サーバからデータ受信
  socket.on('html5_test_show', function(rcvMsg) {
    //alert("データを受信しました");

    receivePhotoData(rcvMsg);

    var contentID = null;

    socket.on('contentID', function(id) {
      contentID = id;
    });


    switch (id) {
      /****** 連絡先の受信処理 ( CONTENT ID : 0 ) ************/
      case 0:
      socket.on('html5_test_show', function(data){
        alert("連絡先を受信しました　:" + data);
      });
      break;
      /****** スケジュールの受信処理 ( CONTENT ID : 1 )  *****/
      case 1:
      socket.on('html5_test_show', function(data){
        receiveSchedule(data);
      });
      break;
      /****** 画像の受信処理 ( CONTENT ID : 2 ) ************/
      case 2:
      socket.on('html5_test_show', function(data){
        receivePhotoData(data);
      });
      break;
    }

    //receiveSchedule(rcvMsg);
    /*** 画像の送受信時の処理 (あとでconnectServer.js にてfunction作成) ****/
    /*
    var data = localStorage.getItem('imageData');
    data = rcvMsg;
    if(data.length < 100){
    $('.card-image').addClass('loadingWidth');
    $('#camera_pic').attr('src', 'img/load.gif');
  }else{
  $('.card-image').removeClass('loadingWidth');
  $('#camera_pic').attr('src', 'data:image/jpeg;charset=utf-8;base64,' + data);
  saveBase64PhotoData();
}
*/
/*****************************************************************/


});
}
