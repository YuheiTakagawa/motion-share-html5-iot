(function() {

  /******************************************************************/
  /********         センサー値取得処理                       ***********/
  /******************************************************************/
  window.addEventListener("devicemotion", function(e){
      //加速度
      var acc = e.acceleration;
      var x = obj2NumberFix(acc.x, 5);
      var y = obj2NumberFix(acc.y, 5);
      var z = obj2NumberFix(acc.z, 5);

      //傾き(重力加速度)
      var acc_g = e.accelerationIncludingGravity;
      var gx = obj2NumberFix(acc_g.x, 5);
      var gy = obj2NumberFix(acc_g.y, 5);
      var gz = obj2NumberFix(acc_g.z, 5);

      //回転値
      var rota_r = e.rotationRate;
      var a = obj2NumberFix(rota_r.alpha, 5); //z方向
      var b = obj2NumberFix(rota_r.beta, 5); //x方向
      var g = obj2NumberFix(rota_r.gamma, 5); // y方向

      var lastmotion = 0;

    /******************************************************************/
    /********         モーション判別機能 呼出                   ***********/
    /******************************************************************/
    handshake();
    gooTouch();
    highTouch();
    changeMotion();
    cancelMotion();

    /******************************************************************/
    /********         デバッグ用 センサー値表示処理              ***********/
    /******************************************************************/
    print3('acc-x', x, 'acc-y', y, 'acc-z', z); //加速度
    print3('acc-gx', gx, 'acc-gy', gy, 'acc-gz', gz); //傾き
    print3('rr-a', a, 'rr-b', b, 'rr-g', g); //回転値
    // function
    function obj2NumberFix(obj, fix_deg){
      return Number(obj).toFixed(fix_deg);
    }
    function print3(id1, value1, id2, value2, id3, value3){
      print1(id1, value1);
      print1(id2, value2);
      print1(id3, value3);
    }
    function print1(id, value){
      var id_obj = document.getElementById(id);
      id_obj.innerHTML = value;
    }

    /******************************************************************/
    /********         3種ベースモーション判別処理                ***********/
    /******************************************************************/

    //モーション 0 握手
    function handshake(){
      /*
      if(gz > 8){
        SensorValueLoad = false;
        SensorValueLoadControl();
        emitRequest(0);
      }
      */
    }

    //モーション 1 グータッチ
    function gooTouch(){

    }

    //モーション 2 ハイタッチ
    function highTouch(){
      if(Math.abs(gy) > 6 && z < -20){
        SensorValueLoad = false;
        sensorValueLoadControl();
        emitRequest(2);
      }

    }

    //モーション 0000 チェンジモーション
    function changeMotion(){

    }

    //モーション 9999 キャンセルモーション
    function cancelMotion(){

    }


    //モーション判別後 数秒間センサー値を取得しない
    function sensorValueLoadControl(){
      if(SensorValueLoad == false){
        setTimeout(function(){
          SensorValueLoad = true;
        }, 100);
      }
    }



    /******************************************************************/
    /********         コンテンツ送受信 許可リクエスト処理         ***********/
    /******************************************************************/
    function emitRequest(val){
      switch (val) {
        case 0:
        alert("CONTACT go to server");
        break;
        case 1:
        alert("SCHEDULE go to server");
        break;
        case 2:
        alert("PHOTO go to server");
        break;
      }
    }


  });
})();



/*

if(Math.abs(acceleration.x)>9){
$('#accelerometer_watch_word').html("横")
}else if(Math.abs(acceleration.y)>9){
$('#accelerometer_watch_word').html("縦")
}else if(Math.abs(acceleration.z)>9){
$('#accelerometer_watch_word').html("水平")
}else{
$('#accelerometer_watch_word').html("")
}
*/
