function sendLogin(){
  var loginId=$("#loginId").val();
  var loginPass=$("#loginPass").val();
  alert(loginId+","+loginPass);
  //ログイン用のemitを行う　適当なのでコメントアウト
  //socket.emit('tekito',[loginId,loginPass]);
  /*socket.on('tekito2',function(e){
  if(e==1){
  */
  $("#modeStatus").show();
  $("#slide-menu").show();
  $("#fab").show();
  PageControll(0);
  /*
}else{
alert("Login failed");
}
});
*/
}
