//ログイン処理
function sendAccountInfo(){
  var users = JSON.parse(localStorage.contact);
  var id = users["Id"];
  var pass = users["Pass1"];

  socket.emit("check sign up", [ id , pass]);
}


function requestLogin(){
  var id = $("#loginId").val();
  var pass = $("#loginPass").val();
  //alert(id + ':' + pass);

  socket.emit("request log in", [ id , pass]);
}
