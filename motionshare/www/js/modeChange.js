
  //var mode = 0;

  $(function(){
    $("#modeBtn").on('touchstart',modeChange);
  });


  function modeChange(mode){
    if(mode==0){
      mode = 1;
      $("#modeStatus").html("送信者");
    }else if(mode==1){
      mode = 0;
      $("#modeStatus").html("");

      alert("R-MODE OPEN");
      socket.on('html5_test_show', function(rcvMsg) {
        alert(rcvMsg);
      });


    }
  }
