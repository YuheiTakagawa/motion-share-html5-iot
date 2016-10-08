//recodemo.herokuapp.com
var url = "https://motion-share.herokuapp.com"; //websocketサーバのURL。
var socket = io.connect(url);
socket.on("connect", function() {
  $(".info").text('connect server...OK');
});

function sendSchedule(){
  if(!(localStorage.schedule===void 0)){
    scheduleJson=JSON.parse(localStorage.schedule);

    sendingSche=scheduleJson["0"];
    sendingSche=JSON.stringify(sendingSche);
    sendingSche=btoa(unescape(encodeURIComponent(sendingSche)));
    if(sendingSche!=null){
      socket.emit("html5_test", sendingSche);
      alert("SCHEDULE GO TO SERVER");
    }
    alert(decodeURIComponent(escape(atob(sendingSche))));
  }
}
