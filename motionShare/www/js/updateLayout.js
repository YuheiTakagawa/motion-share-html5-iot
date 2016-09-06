
//HTML内のタグに関わる操作
var updateTag={
  //検索したデバイスをドロップダウンに反映
  searchResult: function(devices){
    //listによる実装
    //ドロップダウンを一度初期化し再度追加していく
    deviceList.innerHTML = "";

    devices.forEach(function(device) {
      var listItem = document.createElement('li'),
      html = '<b>' + device.name + '</b>';

      listItem.innerHTML = html;
      listItem.dataset.deviceName=device.name;
      listItem.dataset.deviceId = device.id;

      deviceList.appendChild(listItem);
    });
  },

  //デバイス選択画面のタグ表示名を変更
  changeButtonName:function(name){
    //ドロップダウンのDevicesの表示名を変更
    document.getElementById("devices").value=name;
    //専用デバイスボタンの表示名を変更
    deviceButton.innerHTML="<p>専用デバイス<br>"+name+"</p>";
  },
};
