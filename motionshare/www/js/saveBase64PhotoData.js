function saveBase64PhotoData(data) {
    //var base64Data = localStorage.getItem('imageData');
    cordova.base64ToGallery(
        data,

        {
            prefix: 'img_',
            mediaScanner: true
        },

        function(path) {
            alert("画像を受信しました　:"+path);
        },

        function(err) {
            alert(err);
        }
    );
}
