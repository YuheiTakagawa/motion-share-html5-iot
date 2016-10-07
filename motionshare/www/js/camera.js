
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
      quality : 75,
      destinationType : Camera.DestinationType.DATA_URL,
      sourceType : Camera.PictureSourceType.CAMERA, // 0:Photo Library, 1=Camera, 2=Saved Album
      saveToPhotoAlbum: true,
    });
  };

  // カメラから画像を取得して、保存された画像のURIを取得する
  function getCameraURI(){
    alert("getcamera");
    navigator.camera.getPicture(
      function(imageURI){
        // cameraSuccess
        $('#camera_pic')
        .css('display', 'block')
        .attr('src', imageURI);
      },
      function(message){
        // cameraError
        alert(message);
      },
      {
        quality : 75,
        destinationType : Camera.DestinationType.FILE_URI,
        sourceType : Camera.PictureSourceType.CAMERA,
        saveToPhotoAlbum: true,
      });
    };


    // ギャラリーなどから選択した画像のURIを取得する
    function getPhotoURI(){
      navigator.camera.getPicture(
        function(imageURI){
          // cameraSuccess
          $('#camera_pic').attr('src', 'data:image/jpeg;charset=utf-8;base64,' + imageURI);
          $(".test").html(camera_pic.src);
        },
        function(message){
          // cameraError
          alert(message);
        },
        {
          quality : 75,
          destinationType : Camera.DestinationType.DATA_URI,
          sourceType : Camera.PictureSourceType.PHOTOLIBRARY,
        });
      };
