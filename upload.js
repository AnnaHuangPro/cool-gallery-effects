function upload() {
    let xhr = new XMLHttpRequest();
    let progress = document.getElementById("progress")
    progress.style.display = "block";

    xhr.upload.addEventListener("progress", function(e) {
        if (e.lengthComputable) {
            let percentage = Math.round((e.loaded * 100) / e.total);
            progress.value = percentage;
        }
    }, false);

    xhr.upload.addEventListener("load", function(e){
        console.log("上传完毕...")
    }, false);

    xhr.open("POST", "upload");
    xhr.overrideMimeType('text/plain; charset=x-user-defined-binary');
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            alert(xhr.responseText); // handle response.
            progress.style.display = "none";
            progress.value = 0;
        }
    };
    let file = document.getElementById("imgFile");
    let fd = new FormData();
    fd.append(file.files[0].name, file.files[0]);
    xhr.send(fd);
}