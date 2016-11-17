//ログイン処理
function setAccountInfo(){
  $(function(){
    var users={
      "Name":$("#userName").val(),
      "Id":$("#userId").val(),
      "Phone":$("#userPhone").val(),
      "Mail":$("#userMail").val(),
      "Pass1":$("#userPass1").val(),
      "Pass2":$("#userPass2").val()
    };
    localStorage.contact=JSON.stringify(users);
  });
}


function sendAccountInfo(){
  var id = $("#userId").val();
  var pass = $("#userPass1").val();
  alert(id + "," + pass);

  socket.emit("check sign up", id);

  socket.on("verify sign up", function(data){
    if(data == 1){
      alert("success");
      $("#view").load("login.html",function(){
        socket.emit("finalize sign up", [ id , pass ]);
      });
    }else{
      alert("failed");
    }
  });
}


function requestLogin(){
  var id = $("#loginId").val();
  var pass = $("#loginPass").val();
  //alert(id + ':' + pass);

  socket.emit("request log in", [ id , pass ]);

  socket.on('verify log in', function(data){
    if(data == 4649){
      alert("success");
      PageControll(0);
    }else{
      alert("failed");
    }
  });

}
