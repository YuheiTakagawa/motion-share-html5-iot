var scheduleFanc = {
  //初期化
  initialize: function() {
    this.bindEvents();
  },

  //イベントの管理
  bindEvents: function() {
var tsJqSwipeX = -1;
var tsJqSwipeY = -1;

$(function(){
   // 初期状態で[削除]は非表示
   $(".badge").hide();

   // [削除]クリックで親要素を非表示
   $(".badge").bind("touchstart", function(){
       $(this).parent().slideUp("fast");
   });

   // スワイプ処理
   $(".swipe-item").bind("touchstart", function(){
       tsJqSwipeX = event.changedTouches[0].pageX;
       tsJqSwipeY = event.changedTouches[0].pageY;
   });
   $(".swipe-item").bind("touchend", function(){
       tsJqSwipeX = -1;
       flag = 0;
   });
   $(".swipe-item").bind("touchmove", function(){
       if (Math.abs(event.changedTouches[0].pageY - tsJqSwipeY) > 10) tsJqSwipeX = -1;
       if (tsJqSwipeX != -1 && Math.abs(event.changedTouches[0].pageX - tsJqSwipeX) > 35) {
           tsJqSwipeX = -1;
           // スワイプられた時の処理
           if ($(this).children("span").is(':visible')) {
               $(".badge").hide();
           } else {
               $(".badge").hide();
               $(this).children("span").show();
           }
       }
   });
});
  },
}
