'use strict';

(function () {
  var CARDS_COUNT = 25;
  var LIKES_MIN_COUNT = 15;
  var LIKES_MAX_COUNT = 200;
  var COMMENTS_MAX_COUNT = 30;
  var AVATARS_COUNT = 6;

  var images = [];
  var names = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var messages = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
  var descriptions = ['Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 'Proin sed pretium velit.', 'Sed sit amet diam odio. In ac condimentum tellus, in porttitor elit.', 'Donec sed dui ut nulla dapibus interdum sed in magna.', 'Maecenas sem urna, dapibus et pulvinar interdum, varius a turpis. In maximus ornare est, et vehicula tellus volutpat et.', 'Phasellus massa purus, placerat eget lacus sit amet, consectetur tempor nisl.'];

  for (var i = 0; i < CARDS_COUNT; i++) {
    var currentElement = {};

    currentElement.url = 'photos/' + String(i + 1) + '.jpg';
    currentElement.description = window.utilits.getRandomElement(descriptions);
    currentElement.likes = window.utilits.getRandomInt(LIKES_MIN_COUNT, LIKES_MAX_COUNT);
    currentElement.comments = [];

    var iterations = window.utilits.getRandomInt(1, COMMENTS_MAX_COUNT);

    for (var j = 0; j < iterations; j++) {
      var currentComment = {};

      currentComment.avatar = 'img/avatar-' + window.utilits.getRandomInt(1, AVATARS_COUNT) + '.svg';
      currentComment.message = window.utilits.getRandomElement(messages);
      currentComment.name = window.utilits.getRandomElement(names);

      currentElement.comments[j] = currentComment;
    }

    images[i] = currentElement;
  }

  window.data = {
    images: images
  };
})();
