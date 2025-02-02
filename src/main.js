import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { resetPage, searchImages, plusPage } from './js/pixabay-api.js';
import { displayImages } from './js/render-function.js';

const gallery = document.getElementById('gallery');
const pagebutton = document.querySelector('.pagebutton');
let previousSearchRequest = '';

document
  .getElementById('form')
  .addEventListener('submit', async function (event) {
    event.preventDefault();

    const searchrequest = document.getElementById('input').value.trim();

    if (!searchrequest) {
      iziToast.error({
        title: 'Error',
        message: 'Please enter search request!',
        position: 'topRight',
      });
      return;
    }

    if (previousSearchRequest !== searchrequest) {
      resetPage();
      previousSearchRequest = searchrequest;
    } else {
      plusPage();
    }
    const loader = document.querySelector('.loader');
    loader.style.visibility = 'visible';

    try {
      gallery.innerHTML = '';
      const images = await searchImages(searchrequest);
      displayImages(images);
      new SimpleLightbox('.image-link', {
        captionsData: 'alt',
        captionDelay: 500,
      }).refresh();
    } catch (error) {
      console.error('RENDER ERROR', error);
      iziToast.error({
        title: 'Error',
        message: 'Failed to load images. Please try again!',
        position: 'topRight',
      });
    } finally {
      loader.style.visibility = 'hidden';
      if (gallery.children.length > 0) {
        pagebutton.style.visibility = 'visible';
      } else {
        pagebutton.style.visibility = 'hidden';
      }
    }
  });
document
  .getElementById('page-button')
  .addEventListener('click', async function (event) {
    event.preventDefault();

    const searchrequest = document.getElementById('input').value.trim();

    if (!searchrequest) {
      iziToast.error({
        title: 'Error',
        message: 'Please enter search request!',
        position: 'topRight',
      });
      return;
    }

    if (previousSearchRequest !== searchrequest) {
      resetPage();
      previousSearchRequest = searchrequest;
    } else {
      plusPage();
    }
    const loader = document.querySelector('.loader');
    loader.style.visibility = 'visible';

    try {
      const images = await searchImages(searchrequest);
      displayImages(images);
      new SimpleLightbox('.image-link', {
        captionsData: 'alt',
        captionDelay: 500,
      }).refresh();
    } catch (error) {
      console.error('RENDER ERROR', error);
      iziToast.error({
        title: 'Error',
        message: 'Failed to load images. Please try again!',
        position: 'topRight',
      });
    } finally {
      loader.style.visibility = 'hidden';
      if (gallery.children.length > 0) {
        pagebutton.style.visibility = 'visible';
      } else {
        pagebutton.style.visibility = 'hidden';
      }
    }
  });
