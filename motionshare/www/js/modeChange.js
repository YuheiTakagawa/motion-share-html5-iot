var changeMotionBool = false;

//モーションでデータ交換完了後，下の処理を実行する
/*
*/
function modeChange(){
  var checked = $("#modeChangeBtn").is(":checked");

  if(checked == true || changeMotionBool == true) senderMode();
  else if (checked == false || changeMotionBool == false) receiverMode();
}


/*******  送信者モードのときの処理  *******/
function senderMode(){
  $("#modeStatus").html("送信者");
}


/*******  受信者モードのときの処理  *******/
function receiverMode(){
  $("#modeStatus").html("");
  //サーバからデータ受信
  socket.on('html5_test_show', function(rcvMsg) { alert(rcvMsg); });
}




/*
function modeChange(mode){
if(mode==0){ //送信者モード
mode = 1;
$("#modeStatus").html("送信者");
}else if(mode==1){ //受信者モード
mode = 0;
$("#modeStatus").html("");

//alert("R-MODE OPEN");
socket.on('html5_test_show', function(rcvMsg) {
alert(rcvMsg);
});


}
}

*/
