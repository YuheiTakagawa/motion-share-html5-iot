

var bluetoothBasicFanc = {
  //初期化
  initialize: function() {
    this.bindEvents();
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

    //updateTag.changeButtonName(deviceName);
    //setDeviceInfo.setDeviceInfo(deviceName,deviceId);

    bluetoothSerial.connect(deviceId, this.receiveData, this.onError);
  },

  disconnect: function(event) {
    bluetoothSerial.disconnect(
      showPages.showMainPage, this.onError);
    },

    searchDevice: function(){
      //showPages.showselectDevicePage();
      //デバイスを検索する
      bluetoothSerial.list(updateTag.searchResult, this.onError);
    },

    receiveData: function(){
      bluetoothSerial.subscribe("\n",this.splitString,this.onError);
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
