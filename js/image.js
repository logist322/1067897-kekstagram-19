'use strict';

(function () {
  var IMAGE_TYPES = [/(.gif)$/, /(.jpg)$/, /(jpeg)$/, /(png)$/];

  var imgUploadInputElement = document.querySelector('.img-upload__input');
  var imgUploadPreviewElement = document.querySelector('.img-upload__preview img');

  var changeImageHandler = function () {
    var file = imgUploadInputElement.files[0];
    var fileName = file.name.toLowerCase();

    var loadingStubElement = document.querySelector('#messages').content.querySelector('.img-upload__message').cloneNode(true);

    var matches = IMAGE_TYPES.some(function (it) {
      return it.test(fileName);
    });

    document.querySelector('.img-upload__preview').appendChild(loadingStubElement);

    if (matches) {
      var render = new FileReader();

      render.addEventListener('load', function () {
        imgUploadPreviewElement.src = render.result;
        loadingStubElement.remove();
      });

      render.readAsDataURL(file);
    }
  };

  imgUploadInputElement.addEventListener('change', changeImageHandler);
})();
