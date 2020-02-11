'use strict';

var CARDS_NUMBER = 25;
var LIKES_MIN_NUMBER = 15;
var LIKES_MAX_NUMBER = 200;
var COMMENTS_MAX_NUMBER = 30;
var AVATARS_NUMBER = 6;

var images = [];
var names = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var messages = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var descriptions = ['Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 'Proin sed pretium velit.', 'Sed sit amet diam odio. In ac condimentum tellus, in porttitor elit.', 'Donec sed dui ut nulla dapibus interdum sed in magna.', 'Maecenas sem urna, dapibus et pulvinar interdum, varius a turpis. In maximus ornare est, et vehicula tellus volutpat et.', 'Phasellus massa purus, placerat eget lacus sit amet, consectetur tempor nisl.']

var getRandomInt = function (maxNumber, minNumber) {
  if (!minNumber) {
    minNumber = 1;
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
    currentElement.description = takeRandomElement(descriptions);
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

    images[i] = currentElement;
  }
};

var renderImages = function (photos) {
  var picturesContainer = document.querySelector('.pictures');
  var fragment = document.createDocumentFragment();
  var blank = document.querySelector('#picture')
    .content
    .querySelector('.picture');

  for (var i = 0; i < photos.length; i++) {
    var currentFragment = blank.cloneNode(true);

    currentFragment.querySelector('.picture__img').src = photos[i].url;
    currentFragment.querySelector('.picture__likes').textContent = photos[i].likes;
    currentFragment.querySelector('.picture__comments').textContent = photos[i].length;

    fragment.appendChild(currentFragment);
  }

  picturesContainer.appendChild(fragment);
};

var showBigPicture = function (photo) {
  var pictureElement = document.querySelector('.big-picture');
  var imageElement = pictureElement.querySelector('.big-picture__img > img');
  var likesElement = pictureElement.querySelector('.likes-count');
  var commentsCountElement = pictureElement.querySelector('.comments-count');
  var commentsListElement = pictureElement.querySelector('.social__comments');
  var commentElement = commentsListElement.querySelector('.social__comment');
  var fragment = document.createDocumentFragment();
  var descriptionElement = pictureElement.querySelector('.social__caption');

  pictureElement.classList.remove('hidden');
  imageElement.src = photo.url;
  likesElement.textContent = photo.likes;
  commentsCountElement.textContent = photo.comments.length;

  for (var i = 0; i < photo.comments.length; i++) {
    var currentCommentElement = commentElement.cloneNode(true);

    currentCommentElement.querySelector('.social__picture').src = photo.comments[i].avatar;
    currentCommentElement.querySelector('.social__picture').alt = photo.comments[i].name;
    currentCommentElement.querySelector('.social__text').textContent = photo.comments[i].message;

    fragment.appendChild(currentCommentElement);
  }

  commentsListElement.appendChild(fragment);

  descriptionElement.textContent = photo.description;

  document.querySelector('.social__comment-count').classList.add('hidden');
  document.querySelector('.comments-loader').classList.add('hidden');
  document.querySelector('body').classList.add('modal-open');
};

createImageArray();
renderImages(images);
showBigPicture(images[0]);
