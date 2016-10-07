
//var mode = 0;

function senderMode(){
  var checked = $("#modeChangeBtn").is(":checked");

  switch (checked) {
    /*******  送信者モードのときの処理  *******/
    case true:
    $("#modeStatus").html("送信者");
      break;
    /*******  受信者モードのときの処理  *******/
    case false:
    $("#modeStatus").html("");
    //サーバからデータ受信
    socket.on('html5_test_show', function(rcvMsg) { alert(rcvMsg); });
    break;
  }
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
