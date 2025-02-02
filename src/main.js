import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import {
  resetPage,
  searchImages,
  plusPage,
  getPage,
} from './js/pixabay-api.js';
import { displayImages } from './js/render-function.js';

const gallery = document.getElementById('gallery');
const pagebutton = document.querySelector('.pagebutton');
let previousSearchRequest = '';
const maxpages = 10;

const lightbox = new SimpleLightbox('.image-link', {
  captionsData: 'alt',
  captionDelay: 500,
});

async function handleSearch(event, shouldReset) {
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
  if (shouldReset) {
    resetPage();
    previousSearchRequest = searchrequest;
    gallery.innerHTML = '';
  } else {
    plusPage();
  }

  const loader = document.querySelector('.loader');
  loader.style.visibility = 'visible';

  try {
    const images = await searchImages(searchrequest);
    if (images.length === 0) {
      iziToast.warning({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
      pagebutton.style.visibility = 'hidden';
    } else {
      displayImages(images);
      lightbox.refresh();

      setTimeout(() => {
        const imagecard = document.querySelector('.image-card');
        if (imagecard) {
          const { height: cardHeight } = imagecard.getBoundingClientRect();
          window.scrollBy({
            top: cardHeight * 2,
            behavior: 'smooth',
          });
        }
      }, 100);

      if (getPage() >= maxpages) {
        pagebutton.style.visibility = 'hidden';
        iziToast.warning({
          title: 'Warning',
          message: 'You have reached the last page!',
          position: 'topRight',
        });
      }
    }
  } catch (error) {
    console.error('RENDER ERROR', error);
    iziToast.error({
      title: 'Error',
      message: 'Failed to load images. Please try again!',
      position: 'topRight',
    });
  } finally {
    loader.style.visibility = 'hidden';
    if (gallery.children.length > 0 && getPage() < maxpages) {
      pagebutton.style.visibility = 'visible';
    } else {
      pagebutton.style.visibility = 'hidden';
    }
  }
}

document.getElementById('form').addEventListener('submit', event => {
  handleSearch(event, true);
});
document.getElementById('page-button').addEventListener('click', event => {
  handleSearch(event, false);
});
