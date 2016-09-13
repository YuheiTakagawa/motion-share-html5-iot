
var bluetoothFanc = {
  //初期化
  initialize: function() {
    this.bindEvents();
  },

  //イベントの管理
  bindEvents: function() {
    var TOUCH_START = 'touchstart';
    document.addEventListener('deviceready', this.onDeviceReady, false);
    deviceButton.addEventListener(TOUCH_START,this.searchDevice,false);
    DeviceSelect.addEventListener(TOUCH_START, this.connect, false);
    smartButton.addEventListener(TOUCH_START,this.chooseSmart,false);
    disconnectButton.addEventListener(TOUCH_START, this.disconnect, false);
  },

  onDeviceReady: function() {
    //cordovaがOnになった時に行いたい処理を記述

    //this.autoConnect();
  },


  //起動時に自動ペアリングする
  autoConnect: function(){
    var deviceId=deviceInfo.getDeviceId();
    var deviceName=deviceInfo.getDeviceName();
    if(deviceId!=""){
      bluetoothSerial.connect(deviceId,function(){
        alert("success:"+deviceName);
        //this.receiveData();
      },this.onError);
    }else{
      alert("本体を設定しています。")
    }
  },


  //デバイスに接続した時の処理
  connect: function(e) {
    //接続したデバイスの情報を取得
    var deviceName = e.target.dataset.deviceName;
    var deviceId = e.target.dataset.deviceId;

    deviceInfo.setDeviceId(deviceId);
    deviceInfo.setDeviceName(deviceName);

    bluetoothSerial.connect(deviceId, function(){
      alert("success:"+deviceId);
    }, bluetoothFanc.onError);
  },


  //bluetooth端末との接続を解除する
  disconnect: function(event) {
    bluetoothSerial.disconnect(
      function(){alert("ペアリング解除成功")}, bluetoothFanc.onError);
    },


    //デバイスを検索する
    searchDevice: function(){
      bluetoothSerial.list(updateTag.searchResult, bluetoothFanc.onError);
    },


    //データを受信する
    receiveData: function(){
      bluetoothSerial.subscribe("\n",bluetoothFanc.splitString,bluetoothFanc.onError);
    },


    //受信した文字列を整数に変換する
    splitString: function(data){
      var acc=[];
      var gyr=[];
      var strings=data.split(",");
      for(var i=0;i<strings.length/2;i++){
        acc[i]=Number(strings[i]);    //accX,accY,accZ
        gyr[i]=Number(string[i+3]);  //gyrX,gryY,gryZ
      }
    },


    onError: function(reason) {
      alert("ERROR: " + reason);
    },



    //本体を選んだ時の処理
    chooseSmart: function(){
      var deviceName="";
      var deviceId="";
      deviceInfo.setDeviceId("");
      deviceInfo.setDeviceName("");
      bluetoothSerial.disconnect(function(){
        alert("本体に設定しました。");
      },bluetoothFanc.onError);
    }
  };


  //HTML内のタグに関わる操作
  var updateTag={
    //検索したデバイスをドロップダウンに反映
    searchResult: function(devices){
      //listによる実装
      //ドロップダウンを一度初期化し再度追加していく
      DeviceSelect.innerHTML = "";
      devices.forEach(function(device) {
        var listItem = document.createElement('li'),
        html =  device.name;

        listItem.innerHTML = html;
        listItem.dataset.deviceName=device.name;
        listItem.dataset.deviceId = device.id;

        DeviceSelect.appendChild(listItem);
      });
    },

    //デバイス選択画面のタグ表示名を変更
    changeButtonName:function(name){
      //ドロップダウンのDevicesの表示名を変更
      devices.innerHTML=name;
      //専用デバイスボタンの表示名を変更
      deviceButton.innerHTML="<p>専用デバイス<br>"+name+"</p>";
    },
  };



  var deviceInfo={
    setDeviceId(id){
      localStorage.id=id;
    },
    getDeviceId(){
      return localStorage.id;
    },
    setDeviceName(name){
      localStorage.name=name;
    },
    getDeviceName(){
      return localStorage.name;
    }
  };



  /*
  var bluetoothBasicFanc = {
  //初期化
  initialize: function() {
  //alert("a");
  this.bindEvents();
  showPages.showMainPage();
},

//イベントの管理
bindEvents: function() {
var TOUCH_START = 'touchstart';
document.addEventListener('deviceready', this.onDeviceReady, false);
deviceButton.addEventListener(TOUCH_START,this.searchDevice,false);
deviceList.addEventListener(TOUCH_START, this.connect, false);
disconnectButton.addEventListener(TOUCH_START, this.disconnect, false);
},

onDeviceReady: function() {
//cordovaがOnになった時に行いたい処理を記述

//this.autoConnect();
},

//起動時に自動ペアリングする
autoConnect: function(){
var deviceId=getDeviceInfo.getDeviceId();
if(deviceId!=""){
bluetoothSerial.connect(deviceId,function(){
alert("success:"+localStorage.name);
//this.receiveData();
},this.onError);
updateTag.changeButtonName();
}
},

//デバイスに接続した時の処理
connect: function(e) {
//接続したデバイスの情報を取得
var deviceName = e.target.dataset.deviceName;
var deviceId = e.target.dataset.deviceId;

updateTag.changeButtonName(deviceName);
//deviceBeanは１スプリント目では使用しない
////setDeviceInfo.setDeviceName(deviceName);
////setDeviceInfo.setDeviceId(deviceId);
bluetoothSerial.connect(deviceId, function(){
alert("success:"+deviceId);}, bluetoothBasicFanc.onError);
},

disconnect: function(event) {
bluetoothSerial.disconnect(
showPages.showMainPage, bluetoothBasicFanc.onError);
},

searchDevice: function(){
showPages.showSelectDevicePage();
//デバイスを検索する
bluetoothSerial.list(updateTag.searchResult, bluetoothBasicFanc.onError);
},

receiveData: function(){
bluetoothSerial.subscribe("\n",bluetoothBasicFanc.splitString,bluetoothBasicFanc.onError);
},

//受信した文字列を整数に変換する
splitString: function(data){
var acc=[];
var gyr=[];
var strings=data.split(",");
for(var i=0;i<strings.length/2;i++){
acc[i]=Number(strings[i]);    //accX,accY,accZ
gyr[i+3]=Number(string[i+3]);  //gyrX,gryY,gryZ
}
},

onError: function(reason) {
alert("ERROR: " + reason);
}
};
*/
