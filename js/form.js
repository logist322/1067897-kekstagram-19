'use strict';

(function () {
  var SCALE_MIN_COUNT = 25;
  var SCALE_MAX_COUNT = 100;
  var SCALE_STEP = 25;
  var SCALE_DEFAULT = 100;
  var HASHTAG_MAX_COUNT = 5;
  var HASHTAG_MAX_LENGTH = 20;
  var ESCAPE_KEY = 'Escape';

  var imageScaleForm = SCALE_DEFAULT;

  var filters = ['none', 'chrome', 'sepia', 'marvin', 'phobos', 'heat'];

  var buttonUploadElement = document.querySelector('#upload-file');
  var formUploadImageElement = document.querySelector('.img-upload__overlay');
  var buttonCloseFormElement = formUploadImageElement.querySelector('#upload-cancel');
  var buttonScaleSmallerElement = formUploadImageElement.querySelector('.scale__control--smaller');
  var buttonScaleBiggerElement = formUploadImageElement.querySelector('.scale__control--bigger');
  var imageFormElement = formUploadImageElement.querySelector('.img-upload__preview > img');
  var effectElement = formUploadImageElement.querySelector('.img-upload__effect-level');
  var effectListElement = formUploadImageElement.querySelector('.effects__list');
  var hashtagAddingElement = formUploadImageElement.querySelector('.text__hashtags');
  var commentAddingElement = document.querySelector('.text__description');
  var formElement = document.querySelector('#upload-select-image');

  var addFormHandlers = function () {
    buttonCloseFormElement.addEventListener('click', closeFormHandler);
    document.addEventListener('keydown', closeFormEscHandler);
    buttonScaleBiggerElement.addEventListener('click', getImageBiggerHandler);
    buttonScaleSmallerElement.addEventListener('click', getImageSmallerHandler);
    effectListElement.addEventListener('click', changeFilterHandler);
    commentAddingElement.addEventListener('keydown', noEscHandler);
    hashtagAddingElement.addEventListener('keydown', noEscHandler);
    hashtagAddingElement.addEventListener('change', validateHashtagsHandler);
    hashtagAddingElement.addEventListener('input', removeCustomValidityHandler);
  };

  var removeFormHandlers = function () {
    buttonCloseFormElement.removeEventListener('click', closeFormHandler);
    document.removeEventListener('keydown', closeFormEscHandler);
    buttonScaleBiggerElement.removeEventListener('click', getImageBiggerHandler);
    buttonScaleSmallerElement.removeEventListener('click', getImageSmallerHandler);
    effectListElement.removeEventListener('click', changeFilterHandler);
    commentAddingElement.removeEventListener('keydown', noEscHandler);
    hashtagAddingElement.removeEventListener('change', validateHashtagsHandler);
    hashtagAddingElement.removeEventListener('input', removeCustomValidityHandler);
  };

  var uploadImageHandler = function () {
    var scaleCountElement = formUploadImageElement.querySelector('.scale__control--value');

    scaleCountElement.value = imageScaleForm + '%';
    formUploadImageElement.classList.remove('hidden');
    window.utilits.showBodyOverlay();
    hideEffectBar();
    changeClassFilter('none');
    addFormHandlers();
  };

  var closeFormHandler = function () {
    formUploadImageElement.classList.add('hidden');
    window.utilits.hideBodyOverlay();
    removeFormHandlers();
    resetForm();
  };

  var closeFormEscHandler = function (evt) {
    if (evt.key === ESCAPE_KEY) {
      formUploadImageElement.classList.add('hidden');
      window.utilits.hideBodyOverlay();
      removeFormHandlers();
      resetForm();
    }
  };

  var getImageBiggerHandler = function () {
    var scaleCountElement = formUploadImageElement.querySelector('.scale__control--value');

    imageScaleForm += SCALE_STEP;

    if (imageScaleForm > SCALE_MAX_COUNT) {
      imageScaleForm = SCALE_MAX_COUNT;
    }

    scalePicture(imageScaleForm, scaleCountElement, imageFormElement);
  };

  var getImageSmallerHandler = function () {
    var scaleCountElement = formUploadImageElement.querySelector('.scale__control--value');

    imageScaleForm -= SCALE_STEP;

    if (imageScaleForm < SCALE_MIN_COUNT) {
      imageScaleForm = SCALE_MIN_COUNT;
    }

    scalePicture(imageScaleForm, scaleCountElement, imageFormElement);
  };

  var changeFilterHandler = function (evt) {
    for (var j = 0; j < filters.length; j++) {
      if (evt.target.matches('input[value=' + filters[j] + ']')) {
        changeClassFilter(filters[j]);
      }
    }
  };

  var resetFilter = function () {
    document.querySelector('.effect-level__value').value = 100;
    imageFormElement.style.filter = '';
    document.querySelector('.effect-level__pin').style.left = effectElement.querySelector('.effect-level__line').offsetWidth + 'px';
    document.querySelector('.effect-level__depth').style.width = effectElement.querySelector('.effect-level__line').offsetWidth + 'px';
  };

  var changeClassFilter = function (filter) {
    window.utilits.removeAllClass(imageFormElement);

    if (filter !== 'none') {
      imageFormElement.classList.add('effects__preview--' + filter);
      showEffectBar();
    } else {
      hideEffectBar();
    }

    resetFilter();
  };

  var noEscHandler = function (evt) {
    evt.stopPropagation();
  };

  var scalePicture = function (scale, input, image) {
    input.value = scale + '%';
    image.style.transform = 'scale(' + scale / 100 + ')';
  };

  var showEffectBar = function () {
    effectElement.classList.remove('hidden');
  };

  var hideEffectBar = function () {
    effectElement.classList.add('hidden');
  };

  var validateHashtagsHandler = function () {
    var hashtags = hashtagAddingElement.value.split(/\s+/);
    var hashtagsLower = [];

    if (hashtagAddingElement.value === '') {
      hashtagAddingElement.setCustomValidity('');
      return;
    }

    for (var i = 0; i < hashtags.length; i++) {
      hashtagsLower[i] = hashtags[i].toLowerCase();
    }

    for (var j = 0; j < hashtagsLower.length; j++) {
      if (hashtagsLower[j] === '#') {
        hashtagAddingElement.setCustomValidity('Хеш-тег не может состоят только из решетки.');
        return;
      } else {
        hashtagAddingElement.setCustomValidity('');
      }
    }

    for (var k = 0; k < hashtagsLower.length; k++) {
      if (hashtagsLower[k][0] !== '#') {
        hashtagAddingElement.setCustomValidity('Каждый хеш-тег начинается с решетки "#".');
        return;
      } else {
        hashtagAddingElement.setCustomValidity('');
      }
    }

    for (var n = 0; n < hashtagsLower.length; n++) {
      if (/^[#][a-zа-яё0-9]+[#]/.test(hashtagsLower[n])) {
        hashtagAddingElement.setCustomValidity('Хеш-теги разделяются пробелом.');
        return;
      } else {
        hashtagAddingElement.setCustomValidity('');
      }
    }

    for (var m = 0; m < hashtagsLower.length; m++) {
      if (!(/^[#][a-zа-яё0-9]+$/.test(hashtagsLower[m]))) {
        hashtagAddingElement.setCustomValidity('Хеш-тег состоит из букв и цифр.');
        return;
      } else {
        hashtagAddingElement.setCustomValidity('');
      }
    }

    for (var l = 0; l < hashtagsLower.length; l++) {
      if (hashtagsLower[l].length > HASHTAG_MAX_LENGTH) {
        hashtagAddingElement.setCustomValidity('Хеш-тег не может быть длинее 20 символов.');
        return;
      } else {
        hashtagAddingElement.setCustomValidity('');
      }
    }

    for (var z = 0; z < hashtagsLower.length; z++) {
      var currentHashtag = hashtagsLower[z];

      for (var x = i + 1; x < hashtagsLower.length; x++) {
        if (hashtagsLower.length !== 1 && currentHashtag === hashtagsLower[x]) {
          hashtagAddingElement.setCustomValidity('Не может быть повторяющихся хеш-тегов. Хэш-теги нечувствительны к регистру: #ХэшТег и #хэштег считаются одним и тем же тегом.');
          return;
        } else {
          hashtagAddingElement.setCustomValidity('');
        }
      }
    }

    if (hashtagsLower.length > HASHTAG_MAX_COUNT) {
      hashtagAddingElement.setCustomValidity('Максимальное количество хеш-тегов ' + HASHTAG_MAX_COUNT + '.');
      return;
    } else {
      hashtagAddingElement.setCustomValidity('');
    }
  };

  var removeCustomValidityHandler = function () {
    hashtagAddingElement.setCustomValidity('');
  };

  var resetForm = function () {
    formUploadImageElement.querySelector('input[value=none]').checked = true;
    hashtagAddingElement.value = '';
    commentAddingElement.value = '';
    formUploadImageElement.querySelector('.effect-level__value').value = 100;
    buttonUploadElement.value = '';
    imageScaleForm = SCALE_DEFAULT;
    scalePicture(imageScaleForm, formUploadImageElement.querySelector('.scale__control--value'), imageFormElement);
  };

  var deleteSuccessMessage = function () {
    document.querySelector('.success').remove();
    document.removeEventListener('keydown', deleteSuccessMessageEscHandler);
  };

  var deleteSuccessMessageHandler = function () {
    deleteSuccessMessage();
  };

  var deleteSuccessMessageOverlayHandler = function (evt) {
    if (evt.target.className === 'success') {
      deleteSuccessMessage();
    }
  };

  var deleteSuccessMessageEscHandler = function (evt) {
    if (evt.key === ESCAPE_KEY) {
      deleteSuccessMessage();
    }
  };

  var showSuccessMessage = function () {
    var element = document.querySelector('#success').content.cloneNode(true);
    document.querySelector('main').appendChild(element);
    document.querySelector('.success__button').addEventListener('click', deleteSuccessMessageHandler);
    document.querySelector('.success').addEventListener('click', deleteSuccessMessageOverlayHandler);
    document.addEventListener('keydown', deleteSuccessMessageEscHandler);
  };

  var successSubmitHandler = function () {
    formUploadImageElement.classList.add('hidden');
    window.utilits.hideBodyOverlay();
    removeFormHandlers();
    showSuccessMessage();
    resetForm();
  };

  var deleteErrorMessage = function () {
    document.querySelector('.error').remove();
    document.removeEventListener('keydown', deleteSuccessMessageEscHandler);
  };

  var deleteErrorMessageHandler = function () {
    deleteErrorMessage();
  };

  var deleteErrorMessageOverlayHandler = function (evt) {
    if (evt.target.className === 'error') {
      deleteErrorMessage();
    }
  };

  var deleteErrorMessageEscHandler = function (evt) {
    if (evt.key === ESCAPE_KEY) {
      deleteErrorMessage();
    }
  };

  var showErrorMessage = function () {
    var element = document.querySelector('#error').content.cloneNode(true);
    document.querySelector('main').appendChild(element);
    document.querySelector('.error__button').addEventListener('click', deleteErrorMessageHandler);
    document.querySelector('.error').addEventListener('click', deleteErrorMessageOverlayHandler);
    document.addEventListener('keydown', deleteErrorMessageEscHandler);
  };

  var errorSubmitHandler = function () {
    formUploadImageElement.classList.add('hidden');
    window.utilits.hideBodyOverlay();
    removeFormHandlers();
    showErrorMessage();
    resetForm();
  };

  var submitFormHandler = function (evt) {
    window.data.save(successSubmitHandler, errorSubmitHandler, new FormData(formElement));

    evt.preventDefault();
  };

  buttonUploadElement.addEventListener('change', uploadImageHandler);
  formElement.addEventListener('submit', submitFormHandler);
})();
