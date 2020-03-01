'use strict';

(function () {
  var URL_LOAD = 'https://js.dump.academy/kekstagram/data';
  var URL_SAVE = 'https://js.dump.academy/kekstagram';
  var METHOD_SAVE = 'POST';
  var METHOD_LOAD = 'GET';

  var request = function (method, url, onSuccess, onError, data) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      onSuccess(xhr.response);
    });
    xhr.addEventListener('error', function () {
      onError(xhr.response);
    });

    xhr.open(method, url);
    xhr.send(data);
  };

  var save = function (succsessHandler, errorHandler, data) {
    request(METHOD_SAVE, URL_SAVE, succsessHandler, errorHandler, data);
  };

  var load = function (succsessHandler, errorHandler) {
    request(METHOD_LOAD, URL_LOAD, succsessHandler, errorHandler);
  };

  window.data = {
    load: load,
    save: save
  };
})();
