'use strict';

(function () {
  var API_URL = 'https://js.dump.academy/kekstagram';
  var URL_LOAD = API_URL + '/data';
  var URL_SAVE = API_URL + '/';

  var Methods = {
    SAVE: 'POST',
    LOAD: 'GET'
  };

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

  var save = function (successHandler, errorHandler, data) {
    request(Methods.SAVE, URL_SAVE, successHandler, errorHandler, data);
  };

  var load = function (successHandler, errorHandler) {
    request(Methods.LOAD, URL_LOAD, successHandler, errorHandler);
  };

  window.data = {
    load: load,
    save: save
  };
})();
