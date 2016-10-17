window.addEventListener("devicemotion", deviceMotion);

var acX;
var acY;
var acZ;

var agX;
var agY;
var agZ;

var rtA;
var rtB;
var rtG;


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


		document.getElementById("ax").innerHTML = "acX: " + acX;
		document.getElementById("ay").innerHTML = "acY: " + acY;
		document.getElementById("az").innerHTML = "acZ: " + acZ;

		document.getElementById("agx").innerHTML = "agX: " + agX;
		document.getElementById("agy").innerHTML = "agY: " + agY;
		document.getElementById("agz").innerHTML = "agZ: " + agZ;

		document.getElementById("rta").innerHTML = "ALPHA: " + rtA;
		document.getElementById("rtb").innerHTML = "BETA: " + rtB;
		document.getElementById("rtg").innerHTML = "GAMMA: " + rtG;
}
