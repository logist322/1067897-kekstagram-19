'use strict';

var imageArray = [];
var CARDS_NUMBER = 25;

var names = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];

var messages = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

var takeRandomNaturalNumber = function (maxNumber) {
  return Math.round(Math.random() * (maxNumber - 1)) + 1;
};

var takeRandomElement = function (array) {
  return array[Math.round(Math.random() * (array.length - 1))];
};

var createImageArray = function () {
  for (var i = 0; i < CARDS_NUMBER; i++) {
    var currentElement = {};

    currentElement.url = 'photos/' + String(i + 1) + '.jpg';
    currentElement.description = '';
    currentElement.likes = takeRandomNaturalNumber(185) + 15;
    currentElement.comments = [];

    for (var j = 0; j < takeRandomNaturalNumber(6); j++) {
      var currentComment = {};

      currentComment.avatar = 'img/avatar-' + takeRandomNaturalNumber(6) + '.svg';
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
