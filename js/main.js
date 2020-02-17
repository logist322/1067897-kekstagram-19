'use strict';

var CARDS_COUNT = 25;
var LIKES_MIN_COUNT = 15;
var LIKES_MAX_COUNT = 200;
var COMMENTS_MAX_COUNT = 30;
var AVATARS_COUNT = 6;
var ESCAPE_KEY = 'Escape';

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
  showBodyOverlay();
};

var showBodyOverlay = function () {
  document.querySelector('body').classList.add('modal-open');
};

var hideBodyOverlay = function () {
  document.querySelector('body').classList.remove('modal-open');
};

var init = function () {
  createImageArray();
  renderImages(images);
};

init();

var smallElement = document.querySelector('.picture');
var closeBigHandler = function (evt) {
  if (evt.key === ESCAPE_KEY) {
    document.querySelector('.big-picture').classList.add('hidden');
    hideBodyOverlay();
    document.removeEventListener('keydown', closeBigHandler);
  }
};

smallElement.addEventListener('click', function () {
  showBigPicture(images[0]);
  document.addEventListener('keydown', closeBigHandler);
});

var SCALE_MIN_COUNT = 25;
var SCALE_MAX_COUNT = 100;
var SCALE_STEP = 25;
var SCALE_DEFAULT = 100;
var HASHTAG_MAX_COUNT = 5;
var HASHTAG_MAX_LENGTH = 20;

var imageScaleForm = SCALE_DEFAULT;

var filters = ['none', 'chrome', 'sepia', 'marvin', 'phobos', 'heat'];

var buttonUploadElement = document.querySelector('#upload-file');
var formUploadImageElement = document.querySelector('.img-upload__overlay');
var buttonCloseFormElement = formUploadImageElement.querySelector('#upload-cancel');
var buttonScaleSmallerElement = formUploadImageElement.querySelector('.scale__control--smaller');
var buttonScaleBiggerElement = formUploadImageElement.querySelector('.scale__control--bigger');
var imageFormElement = formUploadImageElement.querySelector('.img-upload__preview > img');
var effectElement = formUploadImageElement.querySelector('.img-upload__effect-level');
var effectListElement = formUploadImageElement.querySelector('.effects__list');
var hashtagAddingElement = formUploadImageElement.querySelector('.text__hashtags');
var commentAddingElement = document.querySelector('.text__description');

var addFormHandlers = function () {
  buttonCloseFormElement.addEventListener('click', closeFormHandler);
  document.addEventListener('keydown', closeFormEscHandler);
  buttonScaleBiggerElement.addEventListener('click', getImageBiggerHandler);
  buttonScaleSmallerElement.addEventListener('click', getImageSmallerHandler);
  effectListElement.addEventListener('click', changeFilterHandler);
  commentAddingElement.addEventListener('keydown', noEscHandler);
  hashtagAddingElement.addEventListener('keydown', noEscHandler);
  hashtagAddingElement.addEventListener('change', validateHashtagsHandler);
  hashtagAddingElement.addEventListener('input', removeCustomValidityHandler);
};

var removeFormHandlers = function () {
  buttonCloseFormElement.removeEventListener('click', closeFormHandler);
  document.removeEventListener('keydown', closeFormEscHandler);
  buttonScaleBiggerElement.removeEventListener('click', getImageBiggerHandler);
  buttonScaleSmallerElement.removeEventListener('click', getImageSmallerHandler);
  effectListElement.removeEventListener('click', changeFilterHandler);
  commentAddingElement.removeEventListener('keydown', noEscHandler);
  hashtagAddingElement.removeEventListener('change', validateHashtagsHandler);
  hashtagAddingElement.removeEventListener('input', removeCustomValidityHandler);
};

var uploadImageHandler = function () {
  var scaleCountElement = formUploadImageElement.querySelector('.scale__control--value');

  scaleCountElement.value = imageScaleForm + '%';
  formUploadImageElement.classList.remove('hidden');
  showBodyOverlay();
  hideEffectBar();
  changeClassFilter('none');
  addFormHandlers();
};

var closeFormHandler = function () {
  formUploadImageElement.classList.add('hidden');
  hideBodyOverlay();
  removeFormHandlers();
};

var closeFormEscHandler = function (evt) {
  if (evt.key === ESCAPE_KEY) {
    formUploadImageElement.classList.add('hidden');
    hideBodyOverlay();
    removeFormHandlers();
  }
};

var getImageBiggerHandler = function () {
  var scaleCountElement = formUploadImageElement.querySelector('.scale__control--value');

  imageScaleForm += SCALE_STEP;

  if (imageScaleForm > SCALE_MAX_COUNT) {
    imageScaleForm = SCALE_MAX_COUNT;
  }

  scalePicture(imageScaleForm, scaleCountElement, imageFormElement);
};

var getImageSmallerHandler = function () {
  var scaleCountElement = formUploadImageElement.querySelector('.scale__control--value');

  imageScaleForm -= SCALE_STEP;

  if (imageScaleForm < SCALE_MIN_COUNT) {
    imageScaleForm = SCALE_MIN_COUNT;
  }

  scalePicture(imageScaleForm, scaleCountElement, imageFormElement);
};

var changeFilterHandler = function (evt) {
  for (var j = 0; j < filters.length; j++) {
    if (evt.target.matches('input[value=' + filters[j] + ']')) {
      changeClassFilter(filters[j]);
    }
  }
};

var removeAllClass = function (element) {
  element.className = '';
};

var changeClassFilter = function (filter) {
  removeAllClass(imageFormElement);
  if (filter !== 'none') {
    imageFormElement.classList.add('effects__preview--' + filter);
    showEffectBar();
  }
};

var noEscHandler = function (evt) {
  evt.stopPropagation();
};

var scalePicture = function (scale, input, image) {
  input.value = scale + '%';
  image.style.transform = 'scale(' + scale / 100 + ')';
};

var showEffectBar = function () {
  effectElement.classList.remove('hidden');
};

var hideEffectBar = function () {
  effectElement.classList.add('hidden');
};

var validateHashtagsHandler = function () {
  var hashtags = hashtagAddingElement.value.split(/\s+/);
  var hashtagsLower = [];

  for (var i = 0; i < hashtags.length; i++) {
    hashtagsLower[i] = hashtags[i].toLowerCase();
  }

  for (var j = 0; j < hashtagsLower.length; j++) {
    if (hashtagsLower[j] === '#') {
      hashtagAddingElement.setCustomValidity('Хеш-тег не может состоят только из решетки.');
      return;
    } else {
      hashtagAddingElement.setCustomValidity('');
    }
  }

  for (var k = 0; k < hashtagsLower.length; k++) {
    if (hashtagsLower[k][0] !== '#') {
      hashtagAddingElement.setCustomValidity('Каждый хеш-тег начинается с решетки "#".');
      return;
    } else {
      hashtagAddingElement.setCustomValidity('');
    }
  }

  for (var n = 0; n < hashtagsLower.length; n++) {
    if (/^[#][a-zа-яё0-9]+[#]/.test(hashtagsLower[n])) {
      hashtagAddingElement.setCustomValidity('Хеш-теги разделяются пробелом.');
      return;
    } else {
      hashtagAddingElement.setCustomValidity('');
    }
  }

  for (var m = 0; m < hashtagsLower.length; m++) {
    if (!(/^[#][a-zа-яё0-9]+$/.test(hashtagsLower[m]))) {
      hashtagAddingElement.setCustomValidity('Хеш-тег состоит из букв и цифр.');
      return;
    } else {
      hashtagAddingElement.setCustomValidity('');
    }
  }

  for (var l = 0; l < hashtagsLower.length; l++) {
    if (hashtagsLower[l].length > HASHTAG_MAX_LENGTH) {
      hashtagAddingElement.setCustomValidity('Хеш-тег не может быть длинее 20 символов.');
      return;
    } else {
      hashtagAddingElement.setCustomValidity('');
    }
  }

  for (var z = 0; z < hashtagsLower.length; z++) {
    var currentHashtag = hashtagsLower[z];

    for (var x = i + 1; x < hashtagsLower.length; x++) {
      if (hashtagsLower.length !== 1 && currentHashtag === hashtagsLower[x]) {
        hashtagAddingElement.setCustomValidity('Не может быть повторяющихся хеш-тегов. Хэш-теги нечувствительны к регистру: #ХэшТег и #хэштег считаются одним и тем же тегом.');
        return;
      } else {
        hashtagAddingElement.setCustomValidity('');
      }
    }
  }

  if (hashtagsLower.length > HASHTAG_MAX_COUNT) {
    hashtagAddingElement.setCustomValidity('Максимальное количество хеш-тегов ' + HASHTAG_MAX_COUNT + '.');
    return;
  } else {
    hashtagAddingElement.setCustomValidity('');
  }
};

var removeCustomValidityHandler = function () {
  hashtagAddingElement.setCustomValidity('');
};

buttonUploadElement.addEventListener('change', uploadImageHandler);
