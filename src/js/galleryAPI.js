import imagesCard from '../templates/imagesCard.hbs';
import apiService from './apiService.js';
import refs from '../js/refs.js';

import '@pnotify/core/dist/BrightTheme.css';
import { error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';

const { searchForm, gallery, btnLoadMore } = refs;

searchForm.addEventListener('submit', onSerchFormSubmit);
btnLoadMore.addEventListener('click', onBtnLoadMoreClick);

updateGallery();

function onSerchFormSubmit(e) {
  e.preventDefault();
  const input = e.currentTarget.elements.query;

  if (input.value === '' || input.length < 2) {
    return error({ text: 'Please specify your request', delay: 1500 });
  }

  pegeReset();
  clearGallery();
  updateImageName(input.value);
  updateGallery();

  btnLoadMore.classList.add('visible');
}

function onBtnLoadMoreClick() {
  pageEnlarge();
  apiService
    .fetchImages()
    .then(({ hits }) => {
      gallery.insertAdjacentHTML('beforeend', imagesCard(hits));
    })
    .then(() =>
      btnLoadMore.scrollIntoView({
        block: 'end',
        behavior: 'smooth',
      }),
    );
}

function updateGallery() {
  apiService.fetchImages().then(({ hits }) => {
    gallery.insertAdjacentHTML('beforeend', imagesCard(hits));
  });
}
const pegeReset = () => {
  apiService.page = 1;
};

const clearGallery = () => {
  gallery.innerHTML = '';
};

const updateImageName = name => {
  apiService.imageName = name;
};

const pageEnlarge = () => {
  apiService.page += 1;
};
