//recodemo.herokuapp.com
var url = "https://motion-share.herokuapp.com"; //websocketサーバのURL。
var socket = io.connect(url);
socket.on("connect", function() {
  alert("ms serverに接続完了");
  //socket.emit("html5_test", 0);
});


$(document).ready(function(){
     $("#fileInput").change(function(event){
         var file = event.target.files[0];
         upload(file);//ファイルを送る関数
      });
});
