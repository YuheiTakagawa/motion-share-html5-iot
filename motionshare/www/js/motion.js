
window.addEventListener("devicemotion", deviceMotion);

var acX, acY, acZ;
var agX, agY, agZ;
var rtA, rtB, rtG;

var geoData = localStorage.getItem('geoData');

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



function deviceMotion(e) {
  e.preventDefault();
  var ac = e.acceleration;
  var ag = e.accelerationIncludingGravity;
  var rt = e.rotationRate;

  //加速度
  acX = Math.round(e.acceleration.x * 10) / 10;
  acY = Math.round(e.acceleration.y * 10) / 10;
  acZ = Math.round(e.acceleration.z * 10) / 10;
  //重力加速度
  agX = Math.round(e.accelerationIncludingGravity.x * 10) / 10;//左右
  agY = Math.round(e.accelerationIncludingGravity.y * 10) / 10;//上下
  agZ = Math.round(e.accelerationIncludingGravity.z * 10) / 10;//前後
  //回転速度
  rtA = Math.round(e.rotationRate.alpha * 10) / 10;
  rtB = Math.round(e.rotationRate.beta * 10) / 10;
  rtG = Math.round(e.rotationRate.gamma * 10) / 10;


  document.getElementById("ax").innerHTML = "acX: " + ac.x;
  document.getElementById("ay").innerHTML = "acY: " + ac.y;
  document.getElementById("az").innerHTML = "acZ: " + ac.z;

  document.getElementById("agx").innerHTML = "agX: " + ag.x;
  document.getElementById("agy").innerHTML = "agY: " + ag.y;
  document.getElementById("agz").innerHTML = "agZ: " + ag.z;

  document.getElementById("rta").innerHTML = "ALPHA: " + rt.alpha;
  document.getElementById("rtb").innerHTML = "BETA: " + rt.beta;
  document.getElementById("rtg").innerHTML = "GAMMA: " + rt.gamma;

  gooTouch();
  highTouch();




  function gooTouch(){
    if(ac.x < -10 && ag.z < -8){
      socket.emit("send motion data", 1000 + ',' + whoAmI + ',' + 1 + ',' + now.time() + ',' + geoData);
      alert("gooTouch");
    }
  }


  function highTouch(){
    if(ac.z < -14 && ag.y > 2.5){
      socket.emit("send motion data", 1000 + ',' + whoAmI + ',' + 2 + ',' + now.time() + ',' + geoData);
      alert("highTouch");
    }
  }


}
