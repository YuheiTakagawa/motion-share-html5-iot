//recodemo.herokuapp.com
var url = "https://motion-share.herokuapp.com"; //websocketサーバのURL。
var socket = io.connect(url);
socket.on("connect", function() {
  $(".info").text('connect server...OK');
});


function receiveData(){
  alert("start receiveData");
  socket.on('html5_test_show', function(rcvMsg) {
    alert(rcvMsg);
  });
}
