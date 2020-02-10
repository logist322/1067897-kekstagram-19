'use strict';

var imageArray = [];

var CARDS_NUMBER = 25;
var LIKES_MIN_NUMBER = 15;
var LIKES_MAX_NUMBER = 200;
var COMMENTS_MAX_NUMBER = 6;
var AVATARS_NUMBER = 6;


var names = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];

var messages = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

var getRandomInt = function (maxNumber, minNumber) {
  if (!minNumber) {
    minNumber = 1;
  }

  return Math.round(Math.random() * (maxNumber - minNumber - 1)) + minNumber + 1;
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

createImageArray();
renderImages(imageArray);
