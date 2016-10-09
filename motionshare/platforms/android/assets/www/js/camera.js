/*******　カメラから画像を取得して、Base64形式で取得する *******/
function getCameraBase64(){
  navigator.camera.getPicture(
    function(imageData){
      // cameraSuccess
      localStorage.setItem('imageData', imageData);
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


  /******* ギャラリーなどから選択した画像をbase64で取得する *******/
  function getPhotoDATA(){
    navigator.camera.getPicture(
      function(imageData){
        // cameraSuccess
        localStorage.setItem('imageData', imageData);
        $('#camera_pic').attr('src', 'data:image/jpeg;charset=utf-8;base64,' + imageData);
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


    /******* 画面遷移・起動時してもtop画像の情報をキープする処理 *******/
    function setPhotoDATA(){
      var data = localStorage.getItem('imageData');
      if(data == null){
        //初回起動時のtop画像設定
        localStorage.setItem('imageData', 'img/img.jpg');
      }else{
        //初回以外
        $('#camera_pic').attr('src', 'data:image/jpeg;charset=utf-8;base64,' + data);
      }

      //初回起動時のtop画像設定
      if(data == 'img/img.jpg'){
        $('#camera_pic').attr('src', data);
      }
    }
