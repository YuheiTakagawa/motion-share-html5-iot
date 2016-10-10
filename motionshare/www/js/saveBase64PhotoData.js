function saveBase64PhotoData() {
    var base64Data = localStorage.getItem('imageData');
    cordova.base64ToGallery(
        base64Data,

        {
            prefix: 'img_',
            mediaScanner: true
        },

        function(path) {
            alert(path);
        },

        function(err) {
            alert(err);
        }
    );
}
