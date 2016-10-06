function homeInitilize(){

  $(function(){
    var date="--/-- --:--";
    var note="スケジュールはありません"
    if(!(localStorage.schedule===void 0)){
      var json=JSON.parse(localStorage.schedule);
      if(Object.keys(json)!=""){
        var date=json["0"].date;
        var dateMatch = date.match(/(\d+)-(\d+)-(\d+)T(\d+):(\d+)/);
        //日付オブジェクトに変換
        var dateObj = new Date(
          +dateMatch[1],     //年
          +dateMatch[2],     //月
          +dateMatch[3],     //日
          +dateMatch[4],     //時
          +dateMatch[5],     //分
          +0                 //秒
        );
        date=(dateMatch[2])+"/"+dateMatch[3]+" "+dateMatch[4]+":"+dateMatch[5];
        note=json["0"].note;
      }
    }
    $("#recentScheduleDate").html(date);
    $("#recentScheduleNote").html(note);
  });
}
