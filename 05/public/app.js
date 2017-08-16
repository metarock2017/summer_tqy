
var txt;
var packet;
var i = 0;
var submit=document.querySelector('#submit');
function previewFile() {
    var size;
    var preview = document.querySelector('img');
    var file = document.querySelector('input[type=file]').files[0];

    var reader = new FileReader();

    reader.addEventListener("load", function() {
        preview.src = reader.result;
    }, false);

    if (file) {
        reader.onloadend = function(event) {
            var num = 0;
            txt =event.target.result;
            size = parseInt(txt.length / 1024);

    }


    reader.readAsDataURL(file);
    };
}

var file = document.querySelector('.file')

submit.addEventListener('click', function (e){
    e.preventDefault()
    var xhr = new XMLHttpRequest();
    var url = '/upload';

    xhr.open('POST', url, true);
    xhr.setRequestHeader("Content-type", 'multipart/form-data, boundary=AaB03x');
    xhr.onreadystatechange = function(e) {
        if (xhr.readyState == 4 && xhr.status == 200) {
            console.log(xhr.responseText)
            console.log('Got a POST request');
        }
    }

    xhr.send(file.files[0]);

    var prog=document.querySelector('#prog');
    var percentage=document.querySelector('#percentage');

    xhr.addEventListener('progress', updateProgress);
    xhr.upload.addEventListener('progress', updateProgress);

    function updateProgress(event) {
        if (event.lengthComputable) {
             prog.max = event.total;
             prog.value = event.loaded;
             percentage.innerHTML = Math.round(event.loaded / event.total * 100) + "%";
        }
    }
});
