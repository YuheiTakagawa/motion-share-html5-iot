var changeMotionBool = new Boolean(false);
changeMotionBool = true; //true: 送信者 / false:受信者

var whoAmI = 0;


/******************************************************************/
/********         送信者・受信者 切り替え制御処理            ***********/
/******************************************************************/
function modeChange(){
  changeMotionBool = !changeMotionBool;

  if(changeMotionBool == true){
    senderMode();
  }
  else if(changeMotionBool == false){
    receiverMode();
  }
}



/******************************************************************/
/********              送信者モード処理                    ***********/
/******************************************************************/
function senderMode(){
  connect();
  whoAmI = 1;
  //alert(whoAmI);
  $("#modeStatus").html("<label>SEND</label><i class='fa fa-fw fa-cyan fa-angle-double-up'></i>");
  $('input[name="modeChangeBtn"]').prop("checked",true);


  socket.on('data request', function(id){
    alert("Request GET: "+ id[0]);

    var contentID = id[0];
    var socketID = id[1];

    switch (contentID) {
      //  contentID:0 連絡先 受信処理
      case 0:
      sendContact(socketID);
      break;
      //  contentID:1 スケジュール 受信処理
      case 1:
      sendSchedule(socketID);
      break;
      //  contentID:2 画像 受信処理
      case 2:
      sendPhotoData(socketID);
      break;
    }
  });
}


/******************************************************************/
/********              受信者モード処理                   ***********/
/******************************************************************/
function receiverMode(){
  connect();
  whoAmI = 0;
  $("#modeStatus").html("<label>RECEIVE</label><i class='fa fa-fw fa-cyan fa-angle-double-down'></i>");
  $('input[name="modeChangeBtn"]').prop("checked",false);

  socket.on('send real data from server', function(data){
    //data[0] is contentID, data[1] is real Data
    switch (data[0]) {
      //  contentID:0 連絡先 受信処理
      case 0:
      receiveContact(data[1]);
      break;
      //  contentID:1 スケジュール 受信処理
      case 1:
      receiveSchedule(data[1]);
      break;
      //  contentID:2 画像 受信処理
      case 2:
      receivePhotoData(data[1]);
      break;
    }
  });
}
