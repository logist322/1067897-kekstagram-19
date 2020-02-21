'use strict';

(function () {
  var renderImages = function (photos) {
    var pictureListElement = document.querySelector('.pictures');
    var fragment = document.createDocumentFragment();
    var blankElement = document.querySelector('#picture')
      .content
      .querySelector('.picture');

    for (var i = 0; i < photos.length; i++) {
      var currentElement = blankElement.cloneNode(true);

      currentElement.querySelector('.picture__img').src = photos[i].url;
      currentElement.querySelector('.picture__likes').textContent = photos[i].likes;
      currentElement.querySelector('.picture__comments').textContent = photos[i].length;
      currentElement.dataset.index = i;

      fragment.appendChild(currentElement);
    }

    pictureListElement.appendChild(fragment);
  };

  renderImages(window.data.images);
})();
