shareSetting=11;

function setUserInfo(){
  $(function(){
    var users={
      "Name":$("#userChangeName").val(),
      //"Id":$("#userId").val(),
      "Phone":$("#userChangePhone").val(),
      "Mail":$("#userChangeMail").val(),
      //"Pass1":$("#userPass1").val(),
      //"Pass2":$("#userPass2").val()
    };
    localStorage.contact=JSON.stringify(users);
    localStorage.setItem("userId", users["Id"]);
    alert("Saved user information");
    var index=2;
    var order = "nth-child("+index+")";
    $("nav ul li:"+order).css("background-color", "#00bcd4"); //選択された項目の背景色をcyanに変更
    $("nav ul li:not(:"+order+")").css("background-color", "#eceff1"); //選択外項目の色をサイドバー背景色にする

    $("nav ul li:"+order+" a").css("color", "#fff");//選択された項目のtxt色を白に変更
    $("nav ul li:not(:"+order+") a").css("color", "#616161");//選択された項目のtxt色を黒に変更
    PageControll(0);
  });
}


function showUserInfo(){
  $(function(){
    if(!(localStorage.contact===void 0)){
      var users=JSON.parse(localStorage.contact);
      $("#userChangeName").val(users["Name"]);
      //$("#userId").val(users["Id"]);
      $("#userChangePhone").val(users["Phone"]);
      $("#userChangeMail").val(users["Mail"]);
      //$("#userPass1").val(users["Pass1"]);
      //$("#userPass2").val(users["Pass2"]);
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

function loadRangeSetting(){
  $(function(){
    $('#rangeContents').on('click',setContentsRange);
    $('.dropdown-button').dropdown({
      inDuration: 300,
      outDuration: 225,
      constrain_width: false, // Does not change width of dropdown to that of the activator
      hover: true, // Activate on hover
      gutter: 0, // Spacing from edge
      belowOrigin: false, // Displays dropdown below the button
      alignment: 'left' // Displays dropdown with edge aligned to the left of button
    });
    if(!(localStorage.setting=== void 0)){
      shareSetting=localStorage.setting;
      if((shareSetting&01)==01){
        $('input[name="shareRange1"]').prop("checked",true);
      }
      if((shareSetting&10)==10){
        $('input[name="shareRange2"]').prop("checked",true);
      }
    }
  });
}

function searchUser(){
  $(function(){
    navigator.contacts.pickContact(function(contact){
      //alert('The following contact has been selected:' + JSON.stringify(contact));
      $(".userName").val(contact.displayName);
      if(contact.phoneNumbers!=null){
        $(".userPhone").val(contact.phoneNumbers[0].value);
      }else{
        $(".userPhone").val("");
      }
      if(contact.emails!=null){
        $(".userMail").val(contact.emails[0].value);
      }else{
        $(".userMail").val("");
      }
      //alert('The following contact has been selected:' + JSON.stringify(contact));
    },function(err){
      alert('Error: ' + err);
    });
  });
}

function setContentsRange(e){
  var contentsR = e.target.getAttribute('data-nono');
  //socket.emit('tekitou',contentsR);
}

function setPhoneShare(){
  shareSetting ^=01;
  localStorage.setting=shareSetting;
}

function setMailShare(){
  shareSetting ^=10;
  localStorage.setting=shareSetting;
}
