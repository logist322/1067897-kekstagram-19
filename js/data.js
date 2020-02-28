'use strict';

(function () {
  var URL_LOAD = 'https://js.dump.academy/kekstagram/data';

  var load = function (onLoad) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';
    xhr.open('GET', URL_LOAD);

    xhr.addEventListener('load', function () {
      onLoad(xhr.response);
    });

    xhr.send();
  };

  window.data = {
    load: load
  };
})();
