'use strict';

(function () {
  var ESCAPE_KEY = 'Escape';

  var filterElement = document.querySelector('.img-filters');
  var pictureListElement = document.querySelector('.pictures');
  var fragment = document.createDocumentFragment();
  var blankElement = document.querySelector('#picture')
    .content
    .querySelector('.picture');

  var data = [];

  var successLoadHandler = function (response) {
    data = response.slice();
    renderImages(data);
  };

  var deleteLoadError = function () {
    window.utilits.hideBodyOverlay();
    document.querySelector('.load-error').remove();
    document.removeEventListener('keydown', deleteLoadErrorEscHandler);
  };

  var deleteLoadErrorHandler = function () {
    deleteLoadError();
  };

  var deleteLoadErrorOverlayHandler = function (evt) {
    if (evt.target.className === 'load-error') {
      deleteLoadError();
    }
  };

  var deleteLoadErrorEscHandler = function (evt) {
    if (evt.key === ESCAPE_KEY) {
      deleteLoadError();
    }
  };

  var errorLoadHandler = function () {
    window.utilits.showBodyOverlay();
    var element = document.querySelector('#load-error').content.cloneNode(true);
    document.querySelector('main').appendChild(element);
    document.querySelector('.load-error__button').addEventListener('click', deleteLoadErrorHandler);
    document.querySelector('.load-error').addEventListener('click', deleteLoadErrorOverlayHandler);
    document.addEventListener('keydown', deleteLoadErrorEscHandler);
  };

  var renderImages = function (photos) {
    var openBigHandler = function (evt) {
      evt.preventDefault();
      evt.stopPropagation();

      window.big.showBigPicture(photos[evt.currentTarget.dataset.index]);
    };

    var changeFilterHandler = function (evt) {
      evt.stopPropagation();
      if (evt.target.type === 'button') {
        changeActive(evt.target);
      }

      switch (evt.target.id) {
        case 'filter-random':
          window.filter.showRandom(data);
          break;

        case 'filter-discussed':
          window.filter.showDiscussed(data);
          break;

        case 'filter-default':
          window.filter.showDefault(data);
          break;
      }
    };

    var changeActive = function (item) {
      filterElement.querySelectorAll('.img-filters__button')
        .forEach(function (it) {
          it.classList.remove('img-filters__button--active');
        });
      item.classList.add('img-filters__button--active');
    };

    var renderSmallImage = function (image, index) {
      var currentElement = blankElement.cloneNode(true);

      currentElement.querySelector('.picture__img').src = image.url;
      currentElement.querySelector('.picture__likes').textContent = image.likes;
      currentElement.querySelector('.picture__comments').textContent = image.comments.length;
      currentElement.dataset.index = index;

      currentElement.addEventListener('click', openBigHandler);

      fragment.appendChild(currentElement);
    };

    filterElement.classList.remove('img-filters--inactive');
    filterElement.addEventListener('click', changeFilterHandler);
    window.utilits.deleteChildren(document.querySelector('.pictures'), 3);

    photos.forEach(renderSmallImage);

    pictureListElement.appendChild(fragment);
  };

  window.data.load(successLoadHandler, errorLoadHandler);

  window.render = {
    data: data,
    renderImages: renderImages
  };
})();
