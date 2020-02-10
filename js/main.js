'use strict';

var CARDS_NUMBER = 25;
var LIKES_MIN_NUMBER = 15;
var LIKES_MAX_NUMBER = 200;
var COMMENTS_MAX_NUMBER = 30;
var AVATARS_NUMBER = 6;

var imageArray = [];
var names = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var messages = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

var getRandomInt = function (maxNumber, minNumber) {
  if (!minNumber) {
    minNumber = 1;
  }

  if (maxNumber < minNumber) {
    var change = maxNumber;
    maxNumber = minNumber;
    minNumber = change;
  }

  return Math.round(Math.random() * (maxNumber - minNumber)) + minNumber;
};

var takeRandomElement = function (array) {
  return array[Math.round(Math.random() * (array.length - 1))];
};

var createImageArray = function () {
  for (var i = 0; i < CARDS_NUMBER; i++) {
    var currentElement = {};

    currentElement.url = 'photos/' + String(i + 1) + '.jpg';
    currentElement.description = '';
    currentElement.likes = getRandomInt(LIKES_MAX_NUMBER, LIKES_MIN_NUMBER);
    currentElement.comments = [];

    var iterations = getRandomInt(COMMENTS_MAX_NUMBER);

    for (var j = 0; j < iterations; j++) {
      var currentComment = {};

      currentComment.avatar = 'img/avatar-' + getRandomInt(AVATARS_NUMBER) + '.svg';
      currentComment.message = takeRandomElement(messages);
      currentComment.name = takeRandomElement(names);

      currentElement.comments[j] = currentComment;
    }

    imageArray[i] = currentElement;
  }
};

var renderImages = function (array) {
  var picturesContainer = document.querySelector('.pictures');
  var fragment = document.createDocumentFragment();
  var blank = document.querySelector('#picture')
    .content
    .querySelector('.picture');

  for (var i = 0; i < array.length; i++) {
    var currentFragment = blank.cloneNode(true);

    currentFragment.querySelector('.picture__img').src = array[i].url;
    currentFragment.querySelector('.picture__likes').textContent = array[i].likes;
    currentFragment.querySelector('.picture__comments').textContent = array[i].length;

    fragment.appendChild(currentFragment);
  }

  picturesContainer.appendChild(fragment);
};

var showBigPicture = function (array) {
  var pictureElement = document.querySelector('.big-picture');
  var imageElement = pictureElement.querySelector('.big-picture__img > img');
  var likesElement = pictureElement.querySelector('.likes-count');
  var commentsCountElement = pictureElement.querySelector('.comments-count');
  var commentsListElement = pictureElement.querySelector('.social__comments');
  var commentElement = commentsListElement.querySelector('.social__comment');
  var fragment = document.createDocumentFragment();
  var descriptionElement = pictureElement.querySelector('.social__caption');

  pictureElement.classList.remove('hidden');
  imageElement.src = array[0].url;
  likesElement.textContent = array[0].likes;
  commentsCountElement.textContent = array[0].comments.length;

  for (var i = 0; i < array[0].comments.length; i++) {
    var currentCommentElement = commentElement.cloneNode(true);

    currentCommentElement.querySelector('.social__picture').src = array[0].comments[i].avatar;
    currentCommentElement.querySelector('.social__picture').alt = array[0].comments[i].name;
    currentCommentElement.querySelector('.social__text').textContent = array[0].comments[i].message;

    fragment.appendChild(currentCommentElement);
  }

  commentsListElement.appendChild(fragment);

  descriptionElement.textContent = array[0].description;
};

var hideCommentCount = function () {
  document.querySelector('.social__comment-count').classList.add('hidden');
};

var hideCommentLoader = function () {
  document.querySelector('.comments-loader').classList.add('hidden');
};

var fixBody = function () {
  document.querySelector('body').classList.add('modal-open');
};

createImageArray();
renderImages(imageArray);
showBigPicture(imageArray);
hideCommentCount();
hideCommentLoader();
fixBody();
