'use strict';

(function () {
  var levelElement = document.querySelector('.effect-level');
  var barElement = levelElement.querySelector('.effect-level__line');
  var pinElement = levelElement.querySelector('.effect-level__pin');
  var depthElement = levelElement.querySelector('.effect-level__depth');
  var valueElement = levelElement.querySelector('.effect-level__value');

  var changingFilter = function (percent) {
    var index = percent / 100;
    var image = document.querySelector('.img-upload__preview > img');

    switch (image.className) {
      case 'effects__preview--chrome':
        image.style.filter = 'grayscale(' + (index) + ')';
        break;

      case 'effects__preview--sepia':
        image.style.filter = 'sepia(' + (index) + ')';
        break;

      case 'effects__preview--marvin':
        image.style.filter = 'invert(' + percent + '%)';
        break;

      case 'effects__preview--phobos':
        image.style.filter = 'blur(' + (3 * index) + 'px)';
        break;

      case 'effects__preview--heat':
        image.style.filter = 'brightness(' + (2 * index + 1) + ')';
    }
  };

  var movePinHandler = function (downEvt) {
    downEvt.preventDefault();
    var coordinates = downEvt.clientX;
    var stop = {
      min: Math.round(barElement.getBoundingClientRect().left) - pinElement.offsetWidth / 2,
      max: Math.round(barElement.getBoundingClientRect().left) + barElement.offsetWidth + pinElement.offsetWidth / 2
    };

    var coordinatesToWrite = barElement.offsetWidth;

    var moveHandler = function (moveEvt) {
      moveEvt.preventDefault();

      if (coordinates >= stop.min && coordinates <= stop.max) {
        var shift = coordinates - moveEvt.clientX;

        coordinates = moveEvt.clientX;

        coordinatesToWrite = pinElement.offsetLeft - shift;

        if (coordinatesToWrite < 0) {
          coordinatesToWrite = 0;
        } else if (coordinatesToWrite > barElement.offsetWidth) {
          coordinatesToWrite = barElement.offsetWidth;
        }
      } else {
        coordinates = moveEvt.clientX;
      }

      valueElement.value = Math.round(coordinatesToWrite / barElement.offsetWidth * 100);
      changingFilter(valueElement.value);
      pinElement.style.left = coordinatesToWrite + 'px';
      depthElement.style.width = coordinatesToWrite + 'px';
    };

    var upHandler = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', moveHandler);
      document.removeEventListener('mouseup', upHandler);
    };

    document.addEventListener('mousemove', moveHandler);
    document.addEventListener('mouseup', upHandler);
  };

  var clickBarHandler = function (evt) {
    evt.preventDefault();

    var coordinatesToWrite = evt.clientX - Math.round(barElement.getBoundingClientRect().left);

    valueElement.value = Math.round(coordinatesToWrite / barElement.offsetWidth * 100);
    changingFilter(valueElement.value);
    pinElement.style.left = coordinatesToWrite + 'px';
    depthElement.style.width = coordinatesToWrite + 'px';
  };

  pinElement.addEventListener('mousedown', movePinHandler);
  barElement.addEventListener('click', clickBarHandler);
})();
