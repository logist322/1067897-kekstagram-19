'use strict';

(function () {
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
      currentElement.querySelector('.picture__comments').textContent = image.length;
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

  window.data.load(successLoadHandler);

  window.render = {
    data: data,
    renderImages: renderImages
  };
})();
