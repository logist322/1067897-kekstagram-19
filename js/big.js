'use strict';

(function () {
  var showBigPicture = function (photo) {
    var pictureElement = document.querySelector('.big-picture');
    var imageElement = pictureElement.querySelector('.big-picture__img > img');
    var likeCountElement = pictureElement.querySelector('.likes-count');
    var commentCountElement = pictureElement.querySelector('.comments-count');
    var commentListElement = pictureElement.querySelector('.social__comments');
    var commentElement = commentListElement.querySelector('.social__comment');
    var fragment = document.createDocumentFragment();
    var descriptionElement = pictureElement.querySelector('.social__caption');

    pictureElement.classList.remove('hidden');
    imageElement.src = photo.url;
    likeCountElement.textContent = photo.likes;
    commentCountElement.textContent = photo.comments.length;

    for (var i = 0; i < photo.comments.length; i++) {
      var currentCommentElement = commentElement.cloneNode(true);

      currentCommentElement.querySelector('.social__picture').src = photo.comments[i].avatar;
      currentCommentElement.querySelector('.social__picture').alt = photo.comments[i].name;
      currentCommentElement.querySelector('.social__text').textContent = photo.comments[i].message;

      fragment.appendChild(currentCommentElement);
    }

    commentListElement.appendChild(fragment);

    descriptionElement.textContent = photo.description;

    document.querySelector('.social__comment-count').classList.add('hidden');
    document.querySelector('.comments-loader').classList.add('hidden');
    window.utilits.showBodyOverlay();
  };

  window.big = {
    showBigPicture: showBigPicture
  };
})();
