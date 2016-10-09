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
    localStorage.contact=JSON.stringify(users);
    alert("ユーザ情報を保存しました．");
    PageControll(0);
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
