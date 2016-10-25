var makeMotionBool = false;

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

  var upCnt = 0;
  var downCnt = 0

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
    //選択されているデバイスによって読み込む関数を変更
      window.addEventListener("devicemotion", devicemotionHandler);
      window.addEventListener("deviceorientation", deviceorientationHandler);
  });



  /******************************************************************/
  /********         加速度　制御処理                         ***********/
  /******************************************************************/
  function devicemotionHandler(event) {
    if(localStorage.name != ""){
      deviceNum();
    }else{


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
      /*
      document.getElementById("agx").innerHTML = "agX: " + xg;
      document.getElementById("agy").innerHTML = "agY: " + yg;
      document.getElementById("agz").innerHTML = "agZ: " + zg;
      */
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
        audioPlay(0);
        handshakeCnt = 0;
        handshakeBool = false;
        SensorValueLoad = false;
        SensorValueLoadControl();
        alert('握手');
      }

      //グータッチー加速度・ジャイロによる判定
      if(gooTouchCnt >= 1 && gooTouchBool == true && gooTouchRotaBool == true){
        socket.emit("send motion data", 1000 + ',' + whoAmI + ',' + 1 + ',' + now.time() + ',' + geoData);
        audioPlay(1);
        gooTouchCnt = 0;
        rotationalphaCnt = 0;
        gooTouchBool = false;
        gooTouchRotaBool = false;
        SensorValueLoad = false;
        SensorValueLoadControl();
        alert("グータッチ");
      }

      //ハイタッチー加速度・ジャイロによる判定
      if(highTouchCnt >= 1 && highTouchBool == true){
        socket.emit("send motion data", 1000 + ',' + whoAmI + ',' + 2 + ',' + now.time() + ',' + geoData);
        audioPlay(2);
        highTouchCnt = 0;
        highTouchBool = false;
        SensorValueLoad = false;
        SensorValueLoadControl();
        alert("ハイタッチ");
      }


      //チェンジー加速度・ジャイロによる判定
      if(changeCnt > 1){
        audioPlay(3);
        changeCnt = 0;
        changeBool = false;
        SensorValueLoad = false;
        SensorValueLoadControl();
        alert("Mode Change");
        modeChange(); //モード切り替え処理 modeChange.js
      }

      /******************************************************************/
      /********         motion作成  判別  処理                  ***********/
      /******************************************************************/
      function createMotion(val){
        if (x > val && yg > 5) { // 左
          //alert("left");
          SensorValueLoadControl();
          $('<li><i class="fa fa-fw fa-4x fa-cyan fa-chevron-circle-left"></i></li>').appendTo('ul.makeMotion');
        }
        else if (x < -val && yg > 5) { // 右
          //alert("right");
          SensorValueLoadControl();
          $('<li><i class="fa fa-fw fa-4x fa-cyan fa-chevron-circle-right"></i></li>').appendTo('ul.makeMotion');
        }
        else if (y > val-8) { // 上
          //alert("up");
          SensorValueLoadControl();
          $('<li><i class="fa fa-fw fa-4x fa-cyan fa-chevron-circle-up"></i></li>').appendTo('ul.makeMotion');
        }
        else if (y < -val) { // 下
          //alert("down");
          SensorValueLoadControl();
          $('<li><i class="fa fa-fw fa-4x fa-cyan fa-chevron-circle-down"></i></li>').appendTo('ul.makeMotion');
        }
        else return;
      }

      if(makeMotionBool == true){
        createMotion(20);
      }
    }// !.deviceNum();
  }



  /******************************************************************/
  /********         ジャイロ 制御処理                        ***********/
  /******************************************************************/
  function deviceorientationHandler(event) {

    if(localStorage.name == ""){


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

  }

  //モーション判別後 2s後にセンサー値を再度取得する
  function SensorValueLoadControl(){

    if(SensorValueLoad == false){
      setTimeout(function(){
        SensorValueLoad = true;
      }, 500);
    }

  }

  /******************************************************************/
  /********              専用デバイス処理                    ***********/
  /******************************************************************/
  function deviceNum(){
    // 加速度
    var x = dNum[0];
    var y = dNum[1];
    var z = dNum[2];

    //傾き
    var xg = dNum[3]; //左右
    var yg = dNum[4]; //上下
    var zg = dNum[5]; //前後

    //回転速度
    var a = Math.round(dNum[6] * 10 )  / 100;
    var b = Math.round(dNum[7] * 10 )  / 100;
    var g = Math.round(dNum[8] * 10 ) / 100;


    /******************************************************************/
    /********                  debug用                      ***********/
    /******************************************************************/
    document.getElementById("x").innerHTML = "X: " + x;
    document.getElementById("y").innerHTML = "Y: " + y;
    document.getElementById("z").innerHTML = "Z: " + z;

    document.getElementById("xg").innerHTML = "Xg: " + xg
    document.getElementById("yg").innerHTML = "Yg: " + yg;
    document.getElementById("zg").innerHTML = "Zg: " + zg;

    document.getElementById("ra").innerHTML = "Ra: " + a;
    document.getElementById("rb").innerHTML = "Rb: " + b;
    document.getElementById("rg").innerHTML = "Rg: " + g;

    /******************************************************************/
    /********           モーション判別機能 呼出                 ***********/
    /******************************************************************/
    handshake();
    gooTouch();
    highTouch();
    changeMotion();


    /******************************************************************/
    /********     3種ベースモーション判別(専用デバイスから)       ***********/
    /******************************************************************/
    //モーション 0 握手 判別処理
    function handshake(){
      if(x > 1) downCnt++;
      if(x < -1) upCnt++;

      if((downCnt > 2 && upCnt > 2) && (yg > 0 && yg < 60) && (xg > -100 && xg < -75)){
        socket.emit("send motion data", 1000 + ',' + whoAmI + ',' + 0 + ',' + now.time() + ',' + geoData);
        audioPlay(0);
        alert('Handshake');
        downCnt = 0;
        upCnt = 0;
      }
    }

    //モーション 1 グータッチ 判別処理
    function gooTouch(){}

    //モーション 2 ハイタッチ 判別処理
    function highTouch(){}

    //モーション 0000 チェンジモーション 判別処理
    function changeMotion(){}



  }

})();
