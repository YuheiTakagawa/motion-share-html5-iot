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
    var x = Math.round(event.acceleration.x * 10) / 10;
    // Y軸
    var y = Math.round(event.acceleration.y * 10) / 10;
    // Z軸
    var z = Math.round(event.acceleration.z * 10) / 10;


    document.getElementById('accelerationX').innerHTML = x;
    document.getElementById('accelerationY').innerHTML = y;
    document.getElementById('accelerationZ').innerHTML = z;


    document.getElementById('handshakeCnt').innerHTML = handshakeCnt;
    document.getElementById('gooTouchCnt').innerHTML = gooTouchCnt;
    document.getElementById('highTouchCnt').innerHTML = highTouchCnt;


    //x軸方向 加速度カウンター処理
    var l = 24; //握手用
    if(x > l || x < -l){
      if(handshakeBool == true){
        handshakeCnt++;
      }
    }

    //グータッチ用
    if(x > 20 && gooTouchBool == true){
        gooTouchCnt++;
    }

    //Z軸方向 加速度カウンター処理
    if(z < -22 && highTouchBool == true){
      highTouchCnt++;
    }


    //握手ー加速度・ジャイロによる判定
    if(handshakeCnt > 3){
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
    var beta = Math.round(event.beta * 10) / 10; //-180 から 180 の範囲の値による度数で表されます。
    // Y軸
    var gamma = Math.round(event.gamma * 10) / 10; //-90 から 90 の範囲の値による度数で表されます。
    // Z軸
    var alpha = Math.round(event.alpha * 10) / 10; //0 から 360 の範囲による度数で表されます。

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
        if((alpha >= 40) && (alpha <= 110)){
          if((beta > 160) && (beta < 180) || (beta > -180) && (beta < -160)){　//端末が裏になっていることの判別
            gooTouchBool = true;
          }
        }else{
          gooTouchBool = false;
        }


        //ハイタッチ！処理ージャイロ関係
        if((beta >= 55) && (beta <= 115)){
          if((gamma >= -30) && (gamma <= 0) || (gamma >= 0) && (gamma <= 30)){
            highTouchBool = true;
          }
        }else{
          highTouchBool = false;
        }
   }
})();
