(function () {

  var handshakeCnt = 0;
  var gooTouchCnt = 0;
  var highTouchCnt = 0;

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


    document.getElementById('handshakeCnt').innerHTML = handshakeCnt;
    document.getElementById('gooTouchCnt').innerHTML = gooTouchCnt;
    document.getElementById('highTouchCnt').innerHTML = highTouchCnt;


    //x軸方向 加速度カウンター処理（握手用）
    var l = 27; //ハイタッチ用
    if(x > l || x < -l){
      if(handshakeBool == true){
        handshakeCnt++;
      }
    }

    var l2 = 20; //グータッチ用
    if(x > l || x <-l){
      if(gooTouchBool == true){
        gooTouchCnt++;
      }
    }

    //Z軸方向 加速度カウンター処理
    var zl = 8;
    if(z > zl && highTouchBool == true){
      highTouchCnt++;
    }

    //握手ー加速度・ジャイロによる判定
    if(handshakeCnt > 5){
      alert('握手');
      handshakeCnt = 0;
      handshakeBool = false;
    }

    //グータッチー加速度・ジャイロによる判定
    if(gooTouchCnt >= 1 && gooTouchBool == true){
      alert("グータッチ");
      gooTouchCnt = 0;
      gooTouchBool = false;
    }

    //ハイタッチー加速度・ジャイロによる判定
    if(highTouchCnt >= 1 && highTouchBool == true){
      alert("ハイタッチ");
      highTouchCnt = 0;
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


        /*
        if((alpha <= 330) && (alpha >=300)){
          if((beta <= -160) && (beta >= -179) || (beta <= 179) && (beta >= 170)){
            gooTouchBool = true;
          }
        }else{
          gooTouchBool = false;
        }
        */

        //グータッチ処理ージャイロ関係
        if((alpha >= 180) && (alpha <= 220)){
          if((beta >= 175) && (beta <= 180) || (beta >= -179) && (beta <= -175)){　//端末が裏になっていることの判別
            gooTouchBool = true;
          }
        }else{
          gooTouchBool = false;
        }

        //ハイタッチ！処理ージャイロ関係
        /*
        if((beta >= 70) && (beta <= 120)){
          if((alpha <= 300) && (alpha >= 200)){
            highTouchBool = true;
          }else{
            highTouchBool = false;
          }
        }
        */
   }
})();
