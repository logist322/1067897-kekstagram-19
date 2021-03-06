'use strict';

(function () {
  var getRandomInt = function (min, max) {
    return Math.round(Math.random() * (max - min)) + min;
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

  var deleteChildren = function (parent, start) {
    while (parent.children[start - 1]) {
      parent.removeChild(parent.lastChild);
    }
  };

  window.utilits = {
    getRandomInt: getRandomInt,
    showBodyOverlay: showBodyOverlay,
    hideBodyOverlay: hideBodyOverlay,
    removeAllClass: removeAllClass,
    deleteChildren: deleteChildren
  };
})();
