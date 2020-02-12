'use strict';

var CARDS_COUNT = 25;
var LIKES_MIN_COUNT = 15;
var LIKES_MAX_COUNT = 200;
var COMMENTS_MAX_COUNT = 30;
var AVATARS_COUNT = 6;

var images = [];
var names = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var messages = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var descriptions = ['Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 'Proin sed pretium velit.', 'Sed sit amet diam odio. In ac condimentum tellus, in porttitor elit.', 'Donec sed dui ut nulla dapibus interdum sed in magna.', 'Maecenas sem urna, dapibus et pulvinar interdum, varius a turpis. In maximus ornare est, et vehicula tellus volutpat et.', 'Phasellus massa purus, placerat eget lacus sit amet, consectetur tempor nisl.'];

var getRandomInt = function (min, max) {
  return Math.round(Math.random() * (max - min)) + min;
};

var getRandomElement = function (array) {
  return array[Math.round(Math.random() * (array.length - 1))];
};

var createImageArray = function () {
  for (var i = 0; i < CARDS_COUNT; i++) {
    var currentElement = {};

    currentElement.url = 'photos/' + String(i + 1) + '.jpg';
    currentElement.description = getRandomElement(descriptions);
    currentElement.likes = getRandomInt(LIKES_MIN_COUNT, LIKES_MAX_COUNT);
    currentElement.comments = [];

    var iterations = getRandomInt(1, COMMENTS_MAX_COUNT);

    for (var j = 0; j < iterations; j++) {
      var currentComment = {};

      currentComment.avatar = 'img/avatar-' + getRandomInt(1, AVATARS_COUNT) + '.svg';
      currentComment.message = getRandomElement(messages);
      currentComment.name = getRandomElement(names);

      currentElement.comments[j] = currentComment;
    }

    images[i] = currentElement;
  }
};

var renderImages = function (photos) {
  var pictureListElement = document.querySelector('.pictures');
  var fragment = document.createDocumentFragment();
  var blankElement = document.querySelector('#picture')
    .content
    .querySelector('.picture');

  for (var i = 0; i < photos.length; i++) {
    var currentElement = blankElement.cloneNode(true);

    currentElement.querySelector('.picture__img').src = photos[i].url;
    currentElement.querySelector('.picture__likes').textContent = photos[i].likes;
    currentElement.querySelector('.picture__comments').textContent = photos[i].length;

    fragment.appendChild(currentElement);
  }

  pictureListElement.appendChild(fragment);
};

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
  document.querySelector('body').classList.add('modal-open');
};

var init = function () {
  createImageArray();
  renderImages(images);
  showBigPicture(images[0]);
};

init();
