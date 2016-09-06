
//ローカルにデバイス情報を登録
var setDeviceInfo={
  setDeviceInfo: function(name,id)={
    /*端末情報を保存*/
    this.setDeviceName(name);
    this.setDeviceId(id);
  },
  setDeviceName: function(name){
    localStorage.name=name;
  },
  setDeviceId:function(id){
    localStorage.id=id;
  },
};
//ローカルのデバイス情報を取得
var getDeviceInfo={
  getDeviceName: function()={
    /*端末情報を取り出す*/
    return localStorage.name;
  },
  getDeviceId: function()={
    return localStorage.id;
  }
};
