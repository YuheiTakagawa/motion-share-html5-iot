(function () {


  $(function () {
    window.addEventListener("devicemotion", devicemotionHandler);
  });

  // 加速度が変化
  function devicemotionHandler(event) {

    // 加速度
    var x = event.acceleration.x;
    var y = event.acceleration.y;
    var z = event.acceleration.z;

    //重力加速度
    var xg = event.accelerationIncludingGravity.x;	// 横方向の傾斜
    var yg = event.accelerationIncludingGravity.y;	// 縦方向の傾斜
    var zg = event.accelerationIncludingGravity.z;	// 上下方向の傾斜

  })();
