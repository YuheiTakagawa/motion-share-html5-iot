var scheShake=0; //スケジュールを保存するために扱う変数
(function () {

 //var client = require('socket.io-client');
 //var socket = client.connect('https://recodemo.herokuapp.com/');


  var cnt =0;
  var flag =5;
  var handshakeBool = false;

  var changeCnt=0;
  var changeBool=false;
  var deviceName="";

  $(function () {
    // DeviceMotion Event
    window.addEventListener("devicemotion", devicemotionHandler);
    window.addEventListener("deviceorientation", deviceorientationHandler);

  });


  // 加速度が変化
  function devicemotionHandler(event) {
    deviceName=localStorage.name;
    if(deviceName==""){
      // 加速度
      // X軸
      var x = event.acceleration.x;
      // Y軸
      var y = event.acceleration.y;
      // Z軸
      var z = event.acceleration.z;

      //回転速度
      //ｘ軸
      var rotationalpha=event.rotationRate.alpha;
      // y軸
      var rotationbeta=event.rotationRate.beta;
      //z軸
      var rotationgamma=event.rotationRate.gamma;
    }else{

      var x=accgyr[0];
      var y=accgyr[1];
      var z=accgyr[2];
    }

    if($(".brand-logo").html()=='握手'){

      document.getElementById('accelerationX').innerHTML = x;
      document.getElementById('accelerationY').innerHTML = y;
      document.getElementById('accelerationZ').innerHTML = z;


    }


    document.getElementById('count').innerHTML = cnt;
    var l =27;
    if(x > l || x < -l){
      if(handshakeBool == true){
        cnt++;

      }
    }


    if(cnt > flag){
      alert('握手');
      socket.emit("html5_test", 0);
      //socket.emit("login_announce_on_myself", {value : "watanabe"});
      cnt = 0;
      handshakeBool = false;
    }

    var kl=15
    if(changeBool==true){
      if (rotationbeta <= -kl && changeCnt==0){
        changeCnt++;
      }
      if(rotationbeta >=kl && changeCnt==1){
        changeCnt++;
      }
    }

    //チェンジー加速度・ジャイロによる判定
    if(changeCnt > 1){
      alert("チェンジ");
      changeCnt = 0;
      changeBool = false;
    }
  }

  //角速度変化
  function deviceorientationHandler(event) {

    deviceName=localStorage.name;
    if(deviceName==""){
      // X軸
      var beta = event.beta;
      // Y軸
      var gamma = event.gamma;
      // Z軸
      var alpha = event.alpha;
    }else{
      var beta=accgyr[3];
      var gamma=accgyr[4];
      var alpha=accgyr[5];
    }

    if($(".brand-logo").html()=='握手'){

      document.getElementById('beta').innerHTML = beta;
      document.getElementById('gamma').innerHTML = gamma;
      document.getElementById('alpha').innerHTML = alpha;
    }

    if((gamma >= -90) && (gamma <= -70)){
      handshakeBool = true;
    }else{
      handshakeBool = false;
    }


    if(beta >= 60 && beta < 80){
        changeBool=true;
    }else{
      changeBool=false;
    }

  }
})();



/*
(function () {

var cnt =0;
var flag =5;
var handshakeBool = false;


$(function () {
// DeviceMotion Event
window.addEventListener("devicemotion", devicemotionHandler);
window.addEventListener("deviceorientation", deviceorientationHandler);
});


// 加速度が変化
function devicemotionHandler(event) {

// 加速度
// X軸
var x = event.acceleration.x;
// Y軸
var y = event.acceleration.y;
// Z軸
var z = event.acceleration.z;


document.getElementById('accelerationX').innerHTML = x;
document.getElementById('accelerationY').innerHTML = y;
document.getElementById('accelerationZ').innerHTML = z;


document.getElementById('count').innerHTML = cnt;

var l =27;
if(x > l || x < -l){
if(handshakeBool == true){
cnt++;
}
}


if(cnt > flag){
alert('握手');
cnt = 0;
handshakeBool = false;
}
}

//角速度変化
function deviceorientationHandler(event) {
// X軸
var beta = event.beta;
// Y軸
var gamma = event.gamma;
// Z軸
var alpha = event.alpha;

document.getElementById('beta').innerHTML = beta;
document.getElementById('gamma').innerHTML = gamma;
document.getElementById('alpha').innerHTML = alpha;


if((gamma >= -90) && (gamma <= -70)){
handshakeBool = true;
}else{
handshakeBool = false;
}

}
})();
*/
