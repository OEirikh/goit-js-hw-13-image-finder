import imagesCard from '../templates/imagesCard.hbs';
import apiService from './apiService.js';
import refs from '../js/refs.js';

import '@pnotify/core/dist/BrightTheme.css';
import { error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';

const { searchForm, gallery, btn } = refs;

// apiService.fetchImages('car');
// // console.log(apiService.fetchImages);
// console.log(response);

searchForm.addEventListener('submit', onSerchFormSubmit);
btn.addEventListener('click', onBtnClick);

function onSerchFormSubmit(e) {
  e.preventDefault();
  console.log(e.currentTarget.elements.query.value);
  if (
    e.currentTarget.elements.query.value === '' ||
    e.currentTarget.elements.query.value.length < 2
  ) {
    return error({ text: 'Please specify your request', delay: 1500 });
  }
  resetPage();

  console.log();

  apiService.fetchImages().then(({ hits }) => {
    console.log(e.target.elements.query.value);
    clearList();
    gallery.insertAdjacentHTML('beforeend', imagesCard(hits));
  });

  btn.classList.add('visible');
}

function onBtnClick() {
  pageIncrease();
  apiService
    .fetchImages()
    .then(({ hits }) => {
      gallery.insertAdjacentHTML('beforeend', imagesCard(hits));
    })
    .then(() =>
      btn.scrollIntoView({
        block: 'end',
        behavior: 'smooth',
      }),
    );
}

const pageIncrease = () => {
  apiService.page += 1;
};
const resetPage = () => {
  apiService.page = 1;
};
const clearList = () => {
  gallery.innerHTML = '';
};
