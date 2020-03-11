'use strict';

(function () {
  var ESCAPE_KEY = 'Escape';
  var IMAGE_TYPES = [/\.gif$/, /\.jpg$/, /\.jpeg$/, /\.png$/];

  var imgUploadInputElement = document.querySelector('.img-upload__input');
  var imgUploadPreviewElement = document.querySelector('.img-upload__preview img');

  var deleteTypeErrorMessage = function () {
    window.utilits.hideBodyOverlay();
    document.querySelector('.type-error').remove();
    document.removeEventListener('keydown', deleteTypeErrorMessageEscHandler);
  };

  var deleteTypeErrorMessageHandler = function () {
    deleteTypeErrorMessage();
  };

  var deleteTypeErrorMessageOverlayHandler = function (evt) {
    if (evt.target.className === 'type-error') {
      deleteTypeErrorMessage();
    }
  };

  var deleteTypeErrorMessageEscHandler = function (evt) {
    if (evt.key === ESCAPE_KEY) {
      deleteTypeErrorMessage();
    }
  };

  var showTypeErrorMessage = function () {
    window.utilits.showBodyOverlay();
    var element = document.querySelector('#type-error').content.cloneNode(true);
    document.querySelector('main').appendChild(element);
    document.querySelector('.type-error__button').addEventListener('click', deleteTypeErrorMessageHandler);
    document.querySelector('.type-error').addEventListener('click', deleteTypeErrorMessageOverlayHandler);
    document.addEventListener('keydown', deleteTypeErrorMessageEscHandler);
  };

  var changeImageHandler = function () {
    var file = imgUploadInputElement.files[0];
    var fileName = file.name.toLowerCase();

    var loadingStubElement = document.querySelector('#messages').content.querySelector('.img-upload__message').cloneNode(true);

    var matches = IMAGE_TYPES.some(function (it) {
      return it.test(fileName);
    });

    if (matches) {
      var render = new FileReader();

      window.form.uploadImageHandler();
      document.querySelector('.img-upload__preview').appendChild(loadingStubElement);

      render.addEventListener('load', function () {
        imgUploadPreviewElement.src = render.result;
        loadingStubElement.remove();
      });

      render.readAsDataURL(file);
    } else {
      showTypeErrorMessage();
    }
  };

  imgUploadInputElement.addEventListener('change', changeImageHandler);
})();
