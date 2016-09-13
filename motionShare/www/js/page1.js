//デフォルト設定では本体がアクティブ状態。今後の開発で専用デバイスが接続されていたら自動で切り替えできるようにしたい
tmpBtnTrigger(1);

$("#DeviceSelect li").on("click", deviceButton);
$("#smartButton").on("click", smartButton);



function tmpBtnTrigger(num){
  switch (num) {
    case 0://「専用デバイス」選択状態
    $("#deviceButton").addClass("cyan");
    $("#smartButton").addClass("disabled");
    break;
    case 1://「本体」選択状態
    $("#smartButton").addClass("cyan");
    $("#deviceButton").addClass("disabled");
    break;
  }
}


//専用デバイスボタンのトリガー処理
function deviceButton(){
  $("#deviceButton").addClass("cyan");
  $("#deviceButton").removeClass("disabled");
  $("#smartButton").addClass("disabled");
}

//本体ボタンのトリガー処理
function smartButton(){
  $("#smartButton").removeClass("disabled");
  $("#deviceButton").addClass("disabled");
}
