(function () {

  var cnt =0;
  var flag =5;
  var handshakeBool = false;

  var deviceName="";

  $(function () {
    // DeviceMotion Event
    window.addEventListener("devicemotion", devicemotionHandler);
    window.addEventListener("deviceorientation", deviceorientationHandler);

    //Storage変更イベント
/*    window.addEventListener("storage",function(e){
      alert("asioifoajoijaf");
  });
  */
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
    }else{

       var x=accgyr[0];
       var y=accgyr[1];
       var z=accgyr[2];
    }

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
