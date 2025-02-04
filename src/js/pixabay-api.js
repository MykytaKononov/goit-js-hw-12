import axios from 'axios';
import iziToast from 'izitoast';

const API_KEY = '48551671-8e0bd0e05b8a9090cbea8e4d9';
let page = 1;
const maxpages = 10;

export async function searchImages(searchrequest) {
  const URL = `https://pixabay.com/api/`;
  try {
    const response = await axios.get(URL, {
      params: {
        key: API_KEY,
        q: searchrequest,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: 15,
        page: page,
      },
    });

    return response.data.hits;
  } catch (error) {
    console.error('REQUEST ERROR', error);
    iziToast.error({
      title: 'Error',
      message: 'Failed to fetch images. Please try again!',
      position: 'topRight',
    });
    return [];
  }
}

export function resetPage() {
  page = 1;
}

export function plusPage() {
  page += 1;
}

export function getPage() {
  return page;
}
