var changeMotionBool = new Boolean(false);
changeMotionBool = false; //true: 送信者 / false:受信者

/*******  モード切り替え処理  *******/
function modeChange(){
  changeMotionBool = !changeMotionBool;

  if(changeMotionBool == true) senderMode();
  else if(changeMotionBool == false) receiverMode();
}

/*******  送信者モードのときの処理  *******/
function senderMode(){
  $("#modeStatus").html("送信者");
  $('input[name="modeChangeBtn"]').prop("checked",true);
}

/*******  受信者モードのときの処理  *******/
function receiverMode(){
  $("#modeStatus").html("");
  $('input[name="modeChangeBtn"]').prop("checked",false);
  //サーバからデータ受信
  socket.on('html5_test_show', function(rcvMsg) { alert(rcvMsg); });
}
