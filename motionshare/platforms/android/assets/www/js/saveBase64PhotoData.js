function saveBase64PhotoData(data) {
    //var base64Data = localStorage.getItem('imageData');
    cordova.base64ToGallery(
        data,

        {
            prefix: 'img_',
            mediaScanner: true
        },

        function(path) {
            //alert("Saved photo:"+path);
            Materialize.toast('Saved Photo:\n'+path, 2000);
            var photoname=path.match(".+/(.+?)$")[1];
            $("#photoName").html(photoname);
        },

        function(err) {
            alert(err);
        }
    );
}
