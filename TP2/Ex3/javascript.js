var canvas = document.getElementById("canvas")
var ctx = canvas.getContext('2d');
var uploadedImgFile = document.getElementById('input');
uploadedImgFile.addEventListener('change', handleImage);

function handleImage(uploadedImgFile) {
    var reader = new FileReader();
    reader.onload = function (event) {
        var img = new Image();
        img.onload = function () {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img,0,0);
        }
        img.src = event.target.result;
    }
    reader.readAsDataURL(uploadedImgFile.target.files[0]);
}
