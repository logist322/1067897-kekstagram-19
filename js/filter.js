'use strict';

(function () {
  var RANDOM_IMAGE_COUNT = 10;

  var showDefault = window.debounce(function (photos) {
    window.render.renderImages(photos);
  });

  var showRandom = window.debounce(function (photos) {
    var photosCopy = photos.slice();
    var photosToShow = [];

    for (var i = 0; i < RANDOM_IMAGE_COUNT; i++) {
      var currentIndex = window.utilits.getRandomInt(1, photosCopy.length) - 1;
      photosToShow[i] = photosCopy[currentIndex];
      photosCopy.splice(currentIndex, 1);
    }

    window.render.renderImages(photosToShow);
  });

  var showDiscussed = window.debounce(function (photos) {
    var photosCopy = photos.slice();

    photosCopy.sort(function (left, right) {
      return right.comments.length - left.comments.length;
    });

    window.render.renderImages(photosCopy);
  });

  window.filter = {
    showRandom: showRandom,
    showDiscussed: showDiscussed,
    showDefault: showDefault
  };
})();
