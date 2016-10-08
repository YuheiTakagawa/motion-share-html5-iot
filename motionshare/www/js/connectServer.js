//recodemo.herokuapp.com
var url = "https://motion-share.herokuapp.com"; //websocketサーバのURL。
var socket = io.connect(url);
socket.on("connect", function() {
  $(".info").text('connect server...OK');
});


function sendPhotoData(){
  var data = localStorage.getItem('imageData');
  socket.emit("html5_test", data);
  alert("PHOTO GO TO SERVER");

  //alert(base64PhotoData);
}
