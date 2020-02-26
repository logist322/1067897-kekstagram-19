'use strict';

(function () {
  var getRandomInt = function (min, max) {
    return Math.round(Math.random() * (max - min)) + min;
  };

  var getRandomElement = function (array) {
    return array[Math.round(Math.random() * (array.length - 1))];
  };

  var showBodyOverlay = function () {
    document.querySelector('body').classList.add('modal-open');
  };

  var hideBodyOverlay = function () {
    document.querySelector('body').classList.remove('modal-open');
  };

  var removeAllClass = function (element) {
    element.className = '';
  };

  window.utilits = {
    getRandomInt: getRandomInt,
    getRandomElement: getRandomElement,
    showBodyOverlay: showBodyOverlay,
    hideBodyOverlay: hideBodyOverlay,
    removeAllClass: removeAllClass
  };
})();
