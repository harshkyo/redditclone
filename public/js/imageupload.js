var dropRegion = document.getElementById("drop-region");
var imagePreviewRegion = document.getElementById("image-preview");

var fakeInput = document.createElement("input");
fakeInput.type = "file";
fakeInput.accept = "image";
fakeInput.multiple = false;
dropRegion.addEventListener("click", function () {
  fakeInput.click();
});

fakeInput.addEventListener("change", function () {
  dropRegion.style.padding = "0px";
  var files = fakeInput.files;
  handleFiles(files);
});

function preventDefault(e) {
  e.preventDefault();
  e.stopPropagation();
}

dropRegion.addEventListener("dragenter", preventDefault, false);
dropRegion.addEventListener("dragleave", preventDefault, false);
dropRegion.addEventListener("dragover", preventDefault, false);
dropRegion.addEventListener("drop", preventDefault, false);

function handleDrop(e) {
  var dt = e.dataTransfer,
    files = dt.files;

  if (files.length) {
    handleFiles(files);
  } 
}

dropRegion.addEventListener("drop", handleDrop, false);

function handleFiles(files) {
  for (var i = 0, len = files.length; i < len; i++) {
    if (validateImage(files[i])) previewAnduploadImage(files[i]);
  }
}

function validateImage(image) {
  var validTypes = ["image/jpeg", "image/png", "image/gif"];
  if (validTypes.indexOf(image.type) === -1) {
    alert("Invalid File Type");
    return false;
  }

  // check the size
  var maxSizeInBytes = 10e6; // 10MB
  if (image.size > maxSizeInBytes) {
    alert("File too large");
    return false;
  }

  return true;
}

function previewAnduploadImage(image) {
  // container
  document.getElementsByClassName("drop-message")[0].style.display = "none";
  
  var imgView = document.createElement("div");
  imgView.className = "image-view";
  imagePreviewRegion.appendChild(imgView);

  // previewing image
  var img = document.createElement("img");
  imgView.appendChild(img);

  // progress overlay
  // var overlay = document.createElement("div");
  // overlay.className = "overlay";
  // imgView.appendChild(overlay);

  // read the image...
  var reader = new FileReader();
  reader.onload = function (e) {
    img.src = e.target.result;
  };
  reader.readAsDataURL(image);

  // create FormData
  var formData = new FormData();
  formData.append("image", image);

  // upload the image
  //   var uploadLocation = "https://api.imgbb.com/1/upload";
  //   formData.append("key", "bb63bee9d9846c8d5b7947bcdb4b3573");

  //   var ajax = new XMLHttpRequest();
  //   ajax.open("POST", uploadLocation, true);

  //   ajax.onreadystatechange = function (e) {
  //     if (ajax.readyState === 4) {
  //       if (ajax.status === 200) {
  //         // done!
  //       } else {
  //         // error!
  //       }
  //     }
  //   };

  //   ajax.upload.onprogress = function (e) {
  //     // change progress
  //     // (reduce the width of overlay)

  //     var perc = (e.loaded / e.total) * 100 || 100,
  //       width = 100 - perc;

  //     overlay.style.width = width;
  //   };

  //   ajax.send(formData);
}
