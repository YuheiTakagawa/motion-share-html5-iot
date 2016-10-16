$(function() {
  $("#view").load("home.html",function(){
    homeInitilize();
    setPhotoDATA();
  });
});
//パーツ読み込み
function PageControll(val){
  $(function() {
    switch(val){
      case 0:
      $("#view").innerHTML = "<div id='home'></div>";
      $("#view").load("home.html",function(){
        homeInitilize();
        setPhotoDATA();
        animated();
      });
      removeAnimationClass();
      $(".brand-logo").html("home");
      break;
      case 1:
      $("#view").innerHTML = "<div id='page1'></div>";
      $("#view").load("page1.html",function(){
        bluetoothFanc.initialize();
      });
      removeAnimationClass();
      $(".brand-logo").html("Select Sensing Device");
      break;
      case 2:
      $("#view").innerHTML = "<div id='page2'></div>";
      $("#view").load("page2.html");
      removeAnimationClass();
      $(".brand-logo").html("Motion Debug");
      break;
      case 3:
      $("#view").innerHTML = "<div id='schedulePage'></div>";
      $("#view").load("scheduleList.html",function(){
        scheduleFanc.initialize();
      });
      $(".brand-logo").html("Schedule");
      break;
      case 4:
      $("#view").innerHTML = "<div id='page5'></div>";
      $("#view").load("page5.html",function(){
        showUserInfo();
      });
      removeAnimationClass();
      $(".brand-logo").html("User Information");
      break;
    }

    $("nav ul li").click(function () {
      var index = $("nav ul li").index(this);
      index += 2;
      var order = "nth-child("+index+")";

      $("nav ul li:"+order).css("background-color", "#00bcd4"); //選択された項目の背景色をcyanに変更
      $("nav ul li:not(:"+order+")").css("background-color", "#eceff1"); //選択外項目の色をサイドバー背景色にする

      $("nav ul li:"+order+" a").css("color", "#fff");//選択された項目のtxt色を白に変更
      $("nav ul li:not(:"+order+") a").css("color", "#616161");//選択された項目のtxt色を黒に変更
    });


  });
}



//ページ遷移アニメーションのコントロール
function removeAnimationClass(){

  var type = "animated fadeIn";

  $("nav ul li").click(function(){
    $("#view").addClass(type);
  });

  $(document).ready(function(){
    $("#view").removeClass(type);
  });

  $(".fixed-action-btn ul li").click(function(){
    $("#view").addClass(type);
  });
}
