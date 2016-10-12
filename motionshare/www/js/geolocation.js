// 位置情報取得処理に渡すオプション
var options = {
  enableHightAccuracy: true,
  maximumAge: 0,
  timeout: 120000
}

var time; //motion.js　で使用する.
var geoData; //motion.js で使用する.


function successCallback(position){
  var latitude         = position.coords.latitude; // 緯度(-180～180度)
  var longitude        = position.coords.longitude; // 経度(-90～90度)

  var now = new Date();
  var year = now.getFullYear();
  var month = now.getMonth() + 1;
  var date = now.getDate();
  var h = now.getHours();
  var m = now.getMinutes();
  var s = now.getSeconds();
  var nowTime = year + ',' +  month + ',' + date + ',' + h + ',' + m + ',' + s;

  time = nowTime;
  geoData = latitude + ',' + longitude;

  //alert(latitude + ',' + longitude + ',' + nowTime);

  //var altitude         = position.coords.altitude; // 高度(m)
  //var accuracy         = position.coords.accuracy; // 緯度・経度の誤差(m)
  //var altitudeAccuracy = position.coords.altitudeAccuracy; // 高度の誤差(m)
  //var heading          = position.coords.heading; // 方角(0～360度)
  //var speed            = position.coords.speed; // 速度(m/秒)
  //var timestamp = position.timestamp; // 引数positionからtimestamp(位置情報を取得した時刻のミリ秒)
  //var successDate = new Date(timestamp); // timestampをDate型に変換

  // 緯度・経度を地図上で確認するためにGoogleMapへのリンクを作成
  /*
  document.getElementById("message").innerHTML += "<a target='_blank' href='https://maps.google.co.jp/maps?q="
  + latitude + "," + longitude + "+%28%E7%8F%BE%E5%9C%A8%E4%BD%8D%E7%BD%AE%29&iwloc=A'>緯度・経度をGoogleMapで確認</a><br /><br />";
  */
}

function errorCallback(positionError){
  var code = positionError.code;
  var message = positionError.message;

  switch (code) {
    case positionError.PERMISSION_DENIED: // codeが1
    document.getElementById("message").innerHTML += "GeolocationAPIのアクセス許可がありません<br />";
    break;
    case positionError.POSITION_UNAVAILABLE: // codeが2
    document.getElementById("message").innerHTML += "現在の位置情報を特定できませんでした<br />";
    break;
    case positionError.TIMEOUT: // codeが3
    document.getElementById("message").innerHTML += "指定されたタイムアウト時間内に現在の位置情報を特定できませんでした<br />";
    break;
  }
  alert(message);
}

// watchPosition()の戻り値。この戻り値をclearWatch()に渡すことでwatch(監視)を停止させる。
var watchId = null;


// 位置情報監視開始
function getGeoStart(){
  if (watchId == null) {
    if (navigator.geolocation) {
      watchId = navigator.geolocation.watchPosition(successCallback, errorCallback , options);
    } else {
      alert("Geolocation not supported in this browser");
    }
  }
}


// 位置情報監視停止
function getGeoStop(){
  if (watchId != null) {
    navigator.geolocation.clearWatch(watchId);
    watchId = null;
  }
}
