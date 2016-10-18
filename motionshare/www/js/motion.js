(function () {

  var geoData = localStorage.getItem('geoData');
  //var whoAmI = 0;

  var SensorValueLoad = true;

  var handshakeCnt = 0;
  var gooTouchCnt = 0;
  var highTouchCnt = 0;
  var rotationalphaCnt = 0;
  var changeCnt=0;

  var changeBool=false;
  var handshakeBool = false;
  var gooTouchBool = false;
  var gooTouchRotaBool = false;
  var highTouchBool = false;

  var now = {
    time : function(){
      var now = new Date();
      var year = now.getFullYear();
      var month = now.getMonth() + 1;
      var date = now.getDate();
      var h = now.getHours();
      var m = now.getMinutes();
      var s = now.getSeconds();
      var time = year + ',' +  month + ',' + date + ',' + h + ',' + m + ',' + s;
      return time;
    }
  }


  $(function () {
    window.addEventListener("devicemotion", devicemotionHandler);
    window.addEventListener("deviceorientation", deviceorientationHandler);
  });


  // 加速度が変化
  function devicemotionHandler(event) {


    if(SensorValueLoad == true){
      // 加速度
      var x = Math.round(event.acceleration.x * 10) / 10;
      var y = Math.round(event.acceleration.y * 10) / 10;
      var z = Math.round(event.acceleration.z * 10) / 10;

      //傾き
      var xg = Math.round(event.accelerationIncludingGravity.x * 10) / 10; //左右
      var yg = Math.round(event.accelerationIncludingGravity.y * 10) / 10; //上下
      var zg = Math.round(event.accelerationIncludingGravity.z * 10) / 10; //前後

      //回転速度
      var rotationalpha = Math.round(event.rotationRate.alpha * 10) / 10;
      var rotationbeta = Math.round(event.rotationRate.beta * 10) / 10;
      var rotationgamma = Math.round(event.rotationRate.gamma * 10) / 10;
    }

    document.getElementById("agx").innerHTML = "agX: " + xg;
    document.getElementById("agy").innerHTML = "agY: " + yg;
    document.getElementById("agz").innerHTML = "agZ: " + zg;

    /*
    document.getElementById('accelerationX').innerHTML = x;
    document.getElementById('accelerationY').innerHTML = y;
    document.getElementById('accelerationZ').innerHTML = z;

    document.getElementById('rotationalpha').innerHTML = rotationalpha;
    document.getElementById('rotationbeta').innerHTML = rotationbeta;
    document.getElementById('rotationgamma').innerHTML = rotationgamma;


    document.getElementById('handshakeCnt').innerHTML = handshakeCnt;
    document.getElementById('gooTouchCnt').innerHTML = gooTouchCnt;
    document.getElementById('highTouchCnt').innerHTML = highTouchCnt;
    document.getElementById('rotationalphaCnt').innerHTML = rotationalphaCnt;
    */

    createMotion(20);

    //x軸方向 加速度カウンター処理
    var l = 24; //握手用
    if(x > l || x < -l){
      if(handshakeBool == true){
        handshakeCnt++;
      }
    }

    //グータッチ用
    if(x < -10 && gooTouchBool == true) gooTouchCnt++;
    if(rotationalpha > 8) rotationalphaCnt++;
    if(rotationalphaCnt > 1) gooTouchRotaBool = true;

    if(rotationalphaCnt > 0){
      setTimeout(function(){
        rotationalphaCnt = 0;
        gooTouchCnt = 0;
      }, 2000);
    }


    //Z軸方向 加速度カウンター処理
    if(z < -18 && highTouchBool == true){
      highTouchCnt++;
    }

    //チェンジモーション用
    var cl=7;
    if(changeBool==true){
      if (rotationbeta <= -cl && changeCnt==0) changeCnt++;
      if(rotationbeta >=cl && changeCnt==1) changeCnt++;
    }


    //握手ー加速度・ジャイロによる判定
    if(handshakeCnt > 3){
      socket.emit("send motion data", 1000 + ',' + whoAmI + ',' + 0 + ',' + now.time() + ',' + geoData);
      alert('握手');
      handshakeCnt = 0;
      handshakeBool = false;
      SensorValueLoad = false;
      SensorValueLoadControl();
    }

    //グータッチー加速度・ジャイロによる判定
    if(gooTouchCnt >= 1 && gooTouchBool == true && gooTouchRotaBool == true){
      socket.emit("send motion data", 1000 + ',' + whoAmI + ',' + 1 + ',' + now.time() + ',' + geoData);
      alert("グータッチ");
      gooTouchCnt = 0;
      rotationalphaCnt = 0;
      gooTouchBool = false;
      gooTouchRotaBool = false;
      SensorValueLoad = false;
      SensorValueLoadControl();
    }

    //ハイタッチー加速度・ジャイロによる判定
    if(highTouchCnt >= 1 && highTouchBool == true){
      socket.emit("send motion data", 1000 + ',' + whoAmI + ',' + 2 + ',' + now.time() + ',' + geoData);
      alert("ハイタッチ");
      highTouchCnt = 0;
      highTouchBool = false;
      SensorValueLoad = false;
      SensorValueLoadControl();
    }


    //チェンジー加速度・ジャイロによる判定
    if(changeCnt > 1){
      alert("チェンジ"+changeMotionBool);
      changeCnt = 0;
      changeBool = false;
      SensorValueLoad = false;
      SensorValueLoadControl();
      modeChange(); //モード切り替え処理 modeChange.js
    }


    function createMotion(val){
      if (x > val && yg > 5) { // 右
        alert("left");
      }
      else if (x < -val && yg > 5) { // 左
        alert("right");
      }
      else if (y > val-5) { // 上
        alert("up");
      }
      else if (y < -val) { // 下
        alert("down");
      }
      else return;
    }
  }



  //角速度変化
  function deviceorientationHandler(event) {

    if(SensorValueLoad == true){
      //傾き
      var beta = Math.round(event.beta * 10) / 10; //-180 から 180 の範囲の値による度数で表されます。
      var gamma = Math.round(event.gamma * 10) / 10; //-90 から 90 の範囲の値による度数で表されます。
      var alpha = Math.round(event.alpha * 10) / 10; //0 から 360 の範囲による度数で表されます。
    }

    /*
    document.getElementById('beta').innerHTML = beta;
    document.getElementById('gamma').innerHTML = gamma;
    document.getElementById('alpha').innerHTML = alpha;
    */

    //握手処理-ジャイロ関係
    if((gamma >= -90) && (gamma <= -70)){
      handshakeBool = true;
    }else{
      handshakeBool = false;
    }

    //グータッチ処理ージャイロ関係
    if((beta > 160) && (beta < 180) || (beta >= -180) && (beta < -160)){　//端末が裏になっていることの判別
      gooTouchBool = true;
    }else{
      gooTouchBool = false;
    }


    //ハイタッチ！処理ージャイロ関係
    if((beta >= 55) && (beta <= 130)){
      if((gamma >= -30) && (gamma <= 0) || (gamma >= 0) && (gamma <= 30)){
        highTouchBool = true;
      }
    }else{
      highTouchBool = false;
    }


    //チェンジモーション処理ージャイロ関係
    if(beta >= -10 && beta < 40){

      //if(beta >= 60 && beta < 80){
      changeBool=true;
    }else{
      changeBool=false;
    }

  }

  //モーション判別後 2s後にセンサー値を再度取得する
  function SensorValueLoadControl(){

    if(SensorValueLoad == false){
      setTimeout(function(){
        SensorValueLoad = true;
      }, 500);
    }

  }

})();
