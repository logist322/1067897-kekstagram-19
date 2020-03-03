'use strict';

(function () {
  var ESCAPE_KEY = 'Escape';
  var data = [];

  var successLoadHandler = function (response) {
    data = response.slice();
    renderImages(data);
  };

  var renderImages = function (photos) {
    var filterElement = document.querySelector('.img-filters');
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

      window.big.showBigPicture(photos[evt.currentTarget.dataset.index]);

      document.addEventListener('keydown', closeBigEscHandler);
      document.querySelector('#picture-cancel').addEventListener('click', closeBigHandler);
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

    filterElement.classList.remove('img-filters--inactive');
    filterElement.addEventListener('click', changeFilterHandler);
    window.utilits.deleteChildren(document.querySelector('.pictures'), 3);

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

  window.data.load(successLoadHandler);

  window.render = {
    data: data,
    renderImages: renderImages
  };
})();
