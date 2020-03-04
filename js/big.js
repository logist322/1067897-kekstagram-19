'use strict';

(function () {
  var COMMENT_COUNT = 5;
  var ESCAPE_KEY = 'Escape';

  var showBigPicture = function (photo) {
    var pictureElement = document.querySelector('.big-picture');
    var imageElement = pictureElement.querySelector('.big-picture__img > img');
    var likeCountElement = pictureElement.querySelector('.likes-count');
    var commentCountElement = pictureElement.querySelector('.comments-count');
    var commentCurrentElement = pictureElement.querySelector('.comments-current');
    var commentListElement = pictureElement.querySelector('.social__comments');
    var commentElement = document.querySelector('#social__comment').content.querySelector('.social__comment');
    var descriptionElement = pictureElement.querySelector('.social__caption');
    var buttonElement = pictureElement.querySelector('.comments-loader');

    var commentsCopy = photo.comments.slice();

    var closeBigEscHandler = function (evt) {
      if (evt.key === ESCAPE_KEY) {
        document.querySelector('.big-picture').classList.add('hidden');
        window.utilits.hideBodyOverlay();
        document.removeEventListener('keydown', closeBigEscHandler);
        document.querySelector('#picture-cancel').removeEventListener('click', closeBigHandler);
        document.querySelector('.comments-loader').removeEventListener('click', addCommentsHandler);
      }
    };

    var closeBigHandler = function () {
      document.querySelector('.big-picture').classList.add('hidden');
      window.utilits.hideBodyOverlay();
      document.removeEventListener('keydown', closeBigEscHandler);
      document.querySelector('#picture-cancel').removeEventListener('click', closeBigHandler);
      document.querySelector('.comments-loader').removeEventListener('click', addCommentsHandler);
    };

    var addComments = function (comments) {
      var fragment = document.createDocumentFragment();
      var currentCount = COMMENT_COUNT;

      if (COMMENT_COUNT > comments.length) {
        currentCount = comments.length;
      }

      for (var i = 0; i < currentCount; i++) {
        var currentCommentElement = commentElement.cloneNode(true);
        var currentComment = comments[0];
        comments.splice(0, 1);

        currentCommentElement.querySelector('.social__picture').src = currentComment.avatar;
        currentCommentElement.querySelector('.social__picture').alt = currentComment.name;
        currentCommentElement.querySelector('.social__text').textContent = currentComment.message;

        fragment.appendChild(currentCommentElement);
      }

      commentListElement.appendChild(fragment);
      commentCurrentElement.textContent = commentListElement.children.length;

      if (comments.length === 0) {
        buttonElement.classList.add('hidden');
        buttonElement.removeEventListener('click', addCommentsHandler);
      }
    };

    var addCommentsHandler = function () {
      addComments(commentsCopy);
    };

    window.utilits.deleteChildren(commentListElement, 1);

    document.addEventListener('keydown', closeBigEscHandler);
    document.querySelector('#picture-cancel').addEventListener('click', closeBigHandler);

    if (photo.comments.length) {
      buttonElement.classList.remove('hidden');
      buttonElement.addEventListener('click', addCommentsHandler);
      addComments(commentsCopy);
    }

    pictureElement.classList.remove('hidden');
    imageElement.src = photo.url;
    likeCountElement.textContent = photo.likes;
    commentCountElement.textContent = photo.comments.length;
    descriptionElement.textContent = photo.description;

    window.utilits.showBodyOverlay();
  };

  window.big = {
    showBigPicture: showBigPicture
  };
})();
