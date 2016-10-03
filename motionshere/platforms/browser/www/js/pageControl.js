$(function() {
  $("#view").load("home.html");
});
//パーツ読み込み
function PageControll(val){
  $(function() {
    switch(val){
      case 0:
      $("#view").innerHTML = "<div id='home'></div>";
      $("#view").load("home.html");
      $(".brand-logo").html("MotionShare");
      break;
      case 1:
      $("#view").innerHTML = "<div id='page1'></div>";
      $("#view").load("page1.html");
      $(".brand-logo").html("デバイス");
      break;
      case 2:
      $("#view").innerHTML = "<div id='page2'></div>";
      $("#view").load("page2.html");
      $(".brand-logo").html("握手");
      break;
      case 3:
      $("#view").innerHTML = "<div id='page3'></div>";
      $("#view").load("page3.html");
      $(".brand-logo").html("位置情報");
      break;
    }
  });
}
