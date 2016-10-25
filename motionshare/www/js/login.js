function logout(){
  //ここにログアウト処理

  alert("Logout Successful");
  $("#view").load("login.html",function(){
    $("#modeStatus").hide();
    $("#slide-menu").hide();
    $("#fab").hide();

  });
}
