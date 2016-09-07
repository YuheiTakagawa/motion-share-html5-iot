

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
