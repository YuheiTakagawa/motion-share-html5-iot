(function () {

  var cnt =0;
  var flag =5;


  $(function () {
    // DeviceMotion Event
    window.addEventListener("devicemotion", devicemotionHandler);
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
    if(x > l || x < -l) cnt++;


    if(cnt > flag){
      alert('握手');
      cnt = 0;
    }
  }
})();
