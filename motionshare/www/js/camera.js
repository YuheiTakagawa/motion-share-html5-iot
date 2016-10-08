// カメラから画像を取得して、Base64形式で取得する
function getCameraBase64(){
  navigator.camera.getPicture(
    function(imageData){
      // cameraSuccess
      socket.emit("html5_test", imageData);
      alert("PHOTO GO TO SERVER");
      $('#camera_pic').attr('src', 'data:image/jpeg;charset=utf-8;base64,' + imageData);
    },
    function(message){
      // cameraError
      alert(message);
    },
    {
      //option
      quality : 75,
      destinationType : Camera.DestinationType.DATA_URL,
      sourceType : Camera.PictureSourceType.CAMERA, // 0:Photo Library, 1=Camera, 2=Saved Album
      saveToPhotoAlbum: true,
    });
  };


  // ギャラリーなどから選択した画像をbase64で取得する
  function getPhotoDATA(){
    navigator.camera.getPicture(
      function(imageData){
        // cameraSuccess
        $('#camera_pic').attr('src', 'data:image/jpeg;charset=utf-8;base64,' + imageData);
        socket.emit("html5_test", imageData);
        alert("PHOTO GO TO SERVER");
      },
      function(message){
        // cameraError
        alert(message);
      },
      {
        quality : 75,
        destinationType : Camera.DestinationType.DATA_URL,
        sourceType : Camera.PictureSourceType.PHOTOLIBRARY,
      });
    };
