function setUserInfo(){
  $(function(){
    var users={
      "Name":$("#userName").val(),
      "Id":$("#userId").val(),
      "Phone":$("#userPhone").val(),
      "Mail":$("#userMail").val(),
      "Pass1":$("#userPass1").val(),
      "Pass2":$("#userPass2").val()
    };
    /*
    socket.emit('tekitou',users);
    socket.on("tekito",function(e){
    if(e==1){
    */
    $("#modeStatus").show();
    $("#slide-menu").show();
    $("#fab").show();
    PageControll(0);
    localStorage.contact=JSON.stringify(users);
    alert("Saved user information");
    /*
  }else{
  alert("imika");
}
});
*/
var index=2;
var order = "nth-child("+index+")";
$("nav ul li:"+order).css("background-color", "#00bcd4"); //選択された項目の背景色をcyanに変更
$("nav ul li:not(:"+order+")").css("background-color", "#eceff1"); //選択外項目の色をサイドバー背景色にする

$("nav ul li:"+order+" a").css("color", "#fff");//選択された項目のtxt色を白に変更
$("nav ul li:not(:"+order+") a").css("color", "#616161");//選択された項目のtxt色を黒に変更

});
}


function showUserInfo(){
  $(function(){
    if(!(localStorage.contact===void 0)){
      var users=JSON.parse(localStorage.contact);
      $("#userName").val(users["Name"]);
      $("#userId").val(users["Id"]);
      $("#userPhone").val(users["Phone"]);
      $("#userMail").val(users["Mail"]);
      $("#userPass1").val(users["Pass1"]);
      $("#userPass2").val(users["Pass2"]);
    }
  });
}

function showUserMenu(){
  $(function(){
    if(!(localStorage.contact===void 0)){
      var users=JSON.parse(localStorage.contact);
      $("#userNameM").html(users["Name"]);
      $("#userPhoneM").html(users["Phone"]);
      $("#userMailM").html(users["Mail"]);
    }
  });
}
