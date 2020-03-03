'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 500;

  window.debounce = function (cb, area) {
    window[area] = {
      lastTimeout: null
    };

    return function () {
      var parameters = arguments;

      if (window[area].lastTimeout) {
        window.clearTimeout(window[area].lastTimeout);
      }

      window[area].lastTimeout = window.setTimeout(function () {
        cb.apply(null, parameters);
      }, DEBOUNCE_INTERVAL);
    };
  };
})();
