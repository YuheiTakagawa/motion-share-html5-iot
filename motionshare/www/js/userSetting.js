function setUserInfo(){
  $(function(){
    var users={
      "Name":$("#userName").val(),
      "Id":$("#userId").val(),
      "Phone":$("#userPhone").val(),
      "Mail":$("#userMall").val(),
      "Pass1":$("#userPass1").val(),
      "Pass2":$("#userPass2").val()
    };
    localStorage.contact=JSON.stringify(users);
    alert("ユーザ情報を保存しました．");
    PageControll(0);
  });
}
