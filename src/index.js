// goit-js-hw-13-image-finder
'use strict';

import fetchFunc from './apiGetService.js';
import card from './imageCard.hbs';
import './style.css';

let page = 1;
let query;

const key = '15706976-4d1554b6a0e3b07c0b8f96066';

const refs = {
  root: document.querySelector('.root'),
  input: document.querySelector('input'),
  form: document.querySelector('#search-form'),
  gallery: document.querySelector('.gallery'),
};

function moreBtnCreate() {
  if (!document.querySelector('.more')) {
    const moreBtn = document.createElement('button');
    moreBtn.classList.add('more');
    refs.root.append(moreBtn);
    moreBtn.textContent = 'Load more';
  }
}

function renderImages(e) {
  e.preventDefault();
  refs.gallery.innerHTML = '';
  query = refs.input.value;
  fetchFunc(query, page, key).then(hits => {
    const markup = card(hits);
    refs.gallery.innerHTML = markup;
    moreBtnCreate();
    document.querySelector('.more').addEventListener('click', renderMoreImages);
    refs.form.reset();
  });
}

function renderMoreImages() {
  page++;
  fetchFunc(query, page, key).then(hits => {
    const markup = card(hits);
    refs.gallery.insertAdjacentHTML('beforeend', markup);
    setTimeout(() => {
      window.scrollBy({
        top: document.documentElement.clientHeight - 100,
        behavior: 'smooth',
      });
    }, 500);
  });
}

refs.form.addEventListener('submit', renderImages);
