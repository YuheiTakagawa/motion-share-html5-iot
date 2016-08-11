
var app = {
  initialize: function() {
    this.bindEvents();
    this.showMainPage();
  },
  bindEvents: function() {
    var TOUCH_START = 'touchstart';
    document.addEventListener('deviceready', this.onDeviceReady, false);
    refreshButton.addEventListener(TOUCH_START, this.refreshDeviceList, false);
    sendButton.addEventListener(TOUCH_START, this.sendData, false);
    disconnectButton.addEventListener(TOUCH_START, this.disconnect, false);
    deviceList.addEventListener(TOUCH_START, this.connect, false);
    deviceButton.addEventListener(TOUCH_START,this.search,false);

  },
  onDeviceReady: function() {
    app.refreshDeviceList();
  },
  refreshDeviceList: function() {
    bluetoothSerial.list(app.onDeviceList, app.onError);
    console.log("update");

  },
  onDeviceList: function(devices) {
    var option;
    // remove existing devices
    deviceList.innerHTML = "";
    app.setStatus("");

    devices.forEach(function(device) {
//alert(device.id);
      var listItem = document.createElement('li'),
      html = '<b>' + device.name + '</b><br/>' + device.id;

      listItem.innerHTML = html;

      listItem.dataset.deviceId = device.id;

      deviceList.appendChild(listItem);
    });

    if (devices.length === 0) {

      option = document.createElement('option');
      option.innerHTML = "No Bluetooth Devices";
      deviceList.appendChild(option);

      if (cordova.platformId === "ios") { // BLE
        app.setStatus("No Bluetooth Peripherals Discovered.");
      } else { // Android or Windows Phone
        app.setStatus("Please Pair a Bluetooth Device.");
      }

    } else {
      app.setStatus("Found " + devices.length + " device" + (devices.length === 1 ? "." : "s."));
    }

  },
  connect: function(e) {
    var onConnect = function() {
      // subscribe for incoming data
      bluetoothSerial.subscribe('\n', app.onData, app.onError);

      resultDiv.innerHTML = "";
      app.setStatus("Connected");
      app.showDetailPage();
    };

    var deviceId = e.target.dataset.deviceId;
    if (!deviceId) { // try the parent
      deviceId = e.target.parentNode.dataset.deviceId;
    }

    bluetoothSerial.connect(deviceId, onConnect, app.onError);
  },
  onData: function(data) { // data received from Arduino
    console.log(data);
    resultDiv.innerHTML = resultDiv.innerHTML + "Received: " + data + "<br/>";
    resultDiv.scrollTop = resultDiv.scrollHeight;
  },
  sendData: function(event) { // send data to Arduino

    var success = function() {
      console.log("success");
      resultDiv.innerHTML = resultDiv.innerHTML + "Sent: " + messageInput.value + "<br/>";
      resultDiv.scrollTop = resultDiv.scrollHeight;
    };

    var failure = function() {
      alert("Failed writing data to Bluetooth peripheral");
    };

    var data = messageInput.value;
    bluetoothSerial.write(data, success, failure);
  },
  disconnect: function(event) {
    bluetoothSerial.disconnect(app.showMainPage, app.onError);
  },
  showMainPage: function() {
    mainPage.style.display = "";
    detailPage.style.display = "none";
  },
  showDetailPage: function() {
    mainPage.style.display = "none";
    detailPage.style.display = "";
  },
  setStatus: function(message) {
    console.log(message);

    window.clearTimeout(app.statusTimeout);
    statusDiv.innerHTML = message;
    statusDiv.className = 'fadein';

    // automatically clear the status with a timer
    app.statusTimeout = setTimeout(function () {
      statusDiv.className = 'fadeout';
    }, 5000);
  },
  onError: function(reason) {
    alert("ERROR: " + reason); // real apps should use notification.alert
  },

    /*ドロップダウンに検索したデバイスを追加する*/
  search: function(){
       bluetoothSerial.list(app.searchDevice, app.onError);

  },

  searchDevice: function(devices){
    var select=document.getElementById('bluetoothdevice');
      /*ドロップダウンの要素を一度初期化して追加する*/
      if(select.hasChildNodes()){
      while(select.childNodes.length>2) select.removeChild(select.lastChild);}
    devices.forEach(function(device){
      var name=device.name;
      var id=device.id;
      var opt = document.createElement('option');
        opt.value=id;
        opt.text=name;

      // option要素を追加
      select.appendChild(opt);
    });

  },
  /*Bluetoothで受信した文字列のデータを整数型に分割する*/
  receiveData: function(){
    bluetoothSerial.subscribe("\n",app.splitString,app.onError);
  },
  splitString: function(data){
    var acc=[];
    var gyr=[];
    var strings=data.split(",");
    for(var i=0;i<strings.length/2;i++){
      acc[i]=Number(strings[i]);    //accX,accY,accZ
      gyr[i+3]=Number(string[i+3]);  //gyrX,gryY,gryZ
    }
  }
  };
  /*onsenuiでドロップダウンを実現するために使う？まだ実装できてない*/
  var module = ons.bootstrap();
  module.controller('AppController', function($scope) {
  ons.createPopover('popover.html').then(function(popover) {
    $scope.popover = popover;
  });

  $scope.show = function(e) {
    $scope.popover.show(e);
  };
  });

  function connectDevice(){
  obj = document.selectDevice.selectDevices.value;
  if(obj!=""){
     alert(obj);
  }
    bluetoothSerial.connect(obj, function(){
        alert("success");
    }, app.onError);

  }
