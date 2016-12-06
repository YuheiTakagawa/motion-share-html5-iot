function saveBase64PhotoData(data) {
    //var base64Data = localStorage.getItem('imageData');
    cordova.base64ToGallery(
        data,

        {
            prefix: 'img_',
            mediaScanner: true
        },

        function(path) {
            alert("Saved photo:"+path);
            var photoname=path.match(".+/(.+?)$")[1];
            $("#photoName").html(photoname);
        },

        function(err) {
            alert(err);
        }
    );
}
