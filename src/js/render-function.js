import iziToast from 'izitoast';

export function displayImages(images) {
  const gallery = document.getElementById('gallery');

  if (images.length === 0) {
    iziToast.error({
      message:
        'Sorry, there are no images matching your search query. Please try again!',
      position: 'topRight',
    });
    return;
  }

  const prefab = images
    .map(
      image => `
    <div class="image-card">
      <a href="${image.largeImageURL}" class="image-link">
        <img src="${image.webformatURL}" alt="${image.tags}" class="image" />
      </a>
      <div class="image-info">
        <p class="image-likes text">Likes</p>
        <p class="image-views text">Views</p>
        <p class="image-downloads text">Downloads</p>
        <p class="image-comments text">Comments</p>
        <p class="number">${image.likes}</p>
        <p class="number">${image.views}</p>
        <p class="number">${image.downloads}</p>
        <p class="number">${image.comments}</p>
      </div>
    </div>
  `
    )
    .join('');

  gallery.insertAdjacentHTML('beforeend', prefab);
}
