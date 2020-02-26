'use strict';

(function () {
  var ESCAPE_KEY = 'Escape';

  var renderImages = function (photos) {
    var pictureListElement = document.querySelector('.pictures');
    var fragment = document.createDocumentFragment();
    var blankElement = document.querySelector('#picture')
      .content
      .querySelector('.picture');

    var closeBigEscHandler = function (evt) {
      if (evt.key === ESCAPE_KEY) {
        document.querySelector('.big-picture').classList.add('hidden');
        window.utilits.hideBodyOverlay();
        document.removeEventListener('keydown', closeBigEscHandler);
        document.querySelector('#picture-cancel').removeEventListener('click', closeBigHandler);
      }
    };

    var closeBigHandler = function () {
      document.querySelector('.big-picture').classList.add('hidden');
      window.utilits.hideBodyOverlay();
      document.removeEventListener('keydown', closeBigEscHandler);
      document.querySelector('#picture-cancel').removeEventListener('click', closeBigHandler);
    };

    var openBigHandler = function (evt) {
      evt.preventDefault();
      evt.stopPropagation();

      window.big.showBigPicture(window.data.images[evt.currentTarget.dataset.index]);

      document.addEventListener('keydown', closeBigEscHandler);
      document.querySelector('#picture-cancel').addEventListener('click', closeBigHandler);
    };

    for (var i = 0; i < photos.length; i++) {
      var currentElement = blankElement.cloneNode(true);

      currentElement.querySelector('.picture__img').src = photos[i].url;
      currentElement.querySelector('.picture__likes').textContent = photos[i].likes;
      currentElement.querySelector('.picture__comments').textContent = photos[i].length;
      currentElement.dataset.index = i;

      currentElement.addEventListener('click', openBigHandler);

      fragment.appendChild(currentElement);
    }

    pictureListElement.appendChild(fragment);
  };

  renderImages(window.data.images);
})();
