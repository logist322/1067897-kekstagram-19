'use strict';

(function () {
  var IMAGE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var input = document.querySelector('.img-upload__input');
  var image = document.querySelector('.img-upload__preview img');

  var changeImageHandler = function () {
    var file = input.files[0];
    var fileName = file.name.toLowerCase();

    var loadingStubElement = document.querySelector('#messages').content.querySelector('.img-upload__message').cloneNode(true);

    var matches = IMAGE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    document.querySelector('.img-upload__preview').appendChild(loadingStubElement);

    if (matches) {
      var render = new FileReader();

      render.addEventListener('load', function () {
        image.src = render.result;
        loadingStubElement.remove();
      });

      render.readAsDataURL(file);
    }
  };

  input.addEventListener('change', changeImageHandler);
})();
