
$(function(){
  document.addEventListener("deviceready",
  function(){
    $('#cameraBase64').attr('href', 'javascript:getCameraBase64()');
  },
  false);
})


// カメラから画像を取得して、Base64形式で取得する
function getCameraBase64(){
  navigator.camera.getPicture(
    function(imageData){
      // cameraSuccess
      $('#camera_pic')
      .css('display', 'block')
      .attr('src', 'data:image/jpeg;base64,' + imageData);
    },
    function(message){
      // cameraError
      alert(message);
    },
    {
      quality : 75,
      destinationType : Camera.DestinationType.DATA_URL,
      sourceType : Camera.PictureSourceType.CAMERA,
    });
  };



  /*
  var pictureSource;   // picture source
  var destinationType; // sets the format of returned value

  // Wait for device API libraries to load
  //
  document.addEventListener("deviceready",onDeviceReady,false);

  // device APIs are available
  //
  function onDeviceReady() {
  pictureSource=navigator.camera.PictureSourceType;
  destinationType=navigator.camera.DestinationType;
}

// Called when a photo is successfully retrieved
//
function onPhotoDataSuccess(imageData) {
// Uncomment to view the base64-encoded image data
// console.log(imageData);

// Get image handle
//
var smallImage = document.getElementById('smallImage');

// Unhide image elements
//
smallImage.style.display = 'block';

// Show the captured photo
// The in-line CSS rules are used to resize the image
//
smallImage.src = "data:image/jpeg;base64," + imageData;
}

// Called when a photo is successfully retrieved
//
function onPhotoURISuccess(imageURI) {
// Uncomment to view the image file URI
// console.log(imageURI);

// Get image handle
//
var largeImage = document.getElementById('largeImage');

// Unhide image elements
//
largeImage.style.display = 'block';

// Show the captured photo
// The in-line CSS rules are used to resize the image
//
largeImage.src = imageURI;
}

// A button will call this function
//
function capturePhoto() {
// Take picture using device camera and retrieve image as base64-encoded string
navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 50,
destinationType: destinationType.DATA_URL });
}


// A button will call this function
//
function getPhoto(source) {
// Retrieve image file location from specified source
navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 50,
destinationType: destinationType.FILE_URI,
sourceType: source });
}

// Called if something bad happens.
//
function onFail(message) {
alert('Failed because: ' + message);
}


var video = document.getElementByTagName("img")[0];
navigator.getUserMedia("img", function(s){
video.src = s;
});
*/
