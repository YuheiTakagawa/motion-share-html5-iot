(function () {

  var cntX = 0;
  var cntZ = 0;
  var handshakeBool = false;
  var gooTouchBool = false;
  var highTouchBool = false;


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


    document.getElementById('countX').innerHTML = cntX;
    document.getElementById('countZ').innerHTML = cntZ;

    //x軸方向 加速度カウンター処理
    var l =27;
    if(x > l || x < -l){
      if(handshakeBool == true || gooTouchBool == true){
      cntX++;
      }
    }

    //Z軸方向 加速度カウンター処理
    var zl = 8;
    if(z > zl && highTouchBool == true){
      cntZ++;
    }

    //握手ー加速度・ジャイロによる判定
    if(cntX > 5){
      alert('握手');
      cntX = 0;
      handshakeBool = false;
    }

    //グータッチー加速度・ジャイロによる判定
    if(cntX >= 1 && gooTouchBool == true){
      alert("グータッチ");
      cntX = 0;
      gooTouchBool = false;
    }

    if(cntZ >= 1 && highTouchBool == true){
      alert("ハイタッチ");
      cntZ = 0;
      highTouchBool = false;
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

        //握手処理-ジャイロ関係
        if((gamma >= -90) && (gamma <= -70)){
          handshakeBool = true;
        }else{
          handshakeBool = false;
        }


        //グータッチ処理ージャイロ関係
        if((alpha <= 330) && (alpha >=300)){
          if((beta <= -160) && (beta >= -179) || (beta <= 179) && (beta >= 170)){
            gooTouchBool = true;
          }
        }else{
          gooTouchBool = false;
        }

        //ハイタッチ！処理ージャイロ関係
        if((beta >= 70) && (beta <= 120)){
          if((alpha <= 300) && (alpha >= 200)){
            highTouchBool = true;
          }else{
            highTouchBool = false;
          }
        }
   }
})();
