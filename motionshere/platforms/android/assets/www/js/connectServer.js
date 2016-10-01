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

function upload(file){
     var fileReader = new FileReader();
     var send_file = file;
     //var type = send_file.type;
     var data = {};

     fileReader.readAsBinaryString(send_file);

     fileReader.onload = function(event) {

         data.file = event.target.result;
         data.name = "uploadFile";
         //data.type = type;//

         socket.emit('upload',data);
     }
}
