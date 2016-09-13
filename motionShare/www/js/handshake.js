(function () {

  var cnt =0;
  var flag =5;
  var handshakeBool = false;
  var gooTouchBool = false;


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
      if(handshakeBool == true || gooTouchBool == true){
      cnt++;
      }
    }


    if(cnt > flag){
      alert('握手');
      cnt = 0;
      handshakeBool = false;
    }

    if(cnt >=1 && gooTouchBool == true){
      alert("グータッチ");
      cnt = 0;
      gooTouchBool = false;
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
/*
        if((gamma <= 179) && (gammma >= 165)){
          //alert("goo!!");
          gooTouchBool = true;
        }else{
          gooTouchBool = false;
        }
        */

        if((alpha <= 330) && (alpha >=300)){
          if((beta <= -160) && (beta >= -179) || (beta <= 179) && (beta >= 170))
          gooTouchBool = true;
        }else{
          gooTouchBool = false;
        }


   }
})();
