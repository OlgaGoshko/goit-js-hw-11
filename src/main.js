// import iziToast from 'izitoast';
// import 'izitoast/dist/css/iziToast.min.css';

// const form = document.querySelector('.form');
// const gallery = document.querySelector('.gallery');

// form.addEventListener('submit', handleSubmit);

// function handleSubmit(event) {
//   event.preventDefault();
//   const elements = event.target.elements;
//   const searchText = elements['search-text'].value;
//   cardSeach(searchText)
//     .then(data => {})
//     .catch(error => {});
// }
// getImagesByQuery();

// function getImagesByQuery() {
//   axios('https://pixabay.com/api/')
//     .then(res => {
//       console.log(res.data);
//     })
//     .catch(error => {
//       alert(error.messege);
//       // iziToast.error({
//       //   title: 'Error',
//       //   message:
//       //     'Sorry, there are no images matching your search query. Please try again!',
//       //   position: 'topRight',
//       // });
//     });
// }

// axios(BASE_URL, {
//   params: {
//     key: API_KEY,
//     q: 'query',
//     image_type: 'photo',
//     orientation: 'horizontal',
//     safesearch: true,
//   },
// })
//   .then(res => {
//     console.log(res.data);
//     gallery.insertAdjacentHTML('beforeend', createMarkup(res.data.hits));
//   })
//   .catch(error => {
//     alert(error.messege);
//     iziToast.error({
//       title: 'Error',
//       message:
//         'Sorry, there are no images matching your search query. Please try again!',
//       position: 'topRight',
//     });
//   });

// function createMarkup(arr) {
//   return arr
//     .map(
//       ({
//         webformatURL,
//         largeImageURL,
//         tags,
//         likes,
//         views,
//         comments,
//         downloads,
//       }) => `
//    <li>
//     <img src="${webformatURL}" alt= "${tags}"/>
//    </li>`
//     )
//     .join('');
// }

// function cardSeach(card) {
//   const params = new URLSearchParams({
//     keys: API_KEY,
//     q: card,
//   });
//   return fetch(`${BASE_URL}${params}`).then(res => {
//     if (!res.ok) {
//       throw new Error(res.statusText);
//     }
//     return res.json();
//   });
// }

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getImagesByQuery } from './js/pixabay-api';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
} from './js/render-functions';

const form = document.querySelector('.form');

form.addEventListener('submit', async event => {
  event.preventDefault();

  const query = event.target.elements['search-text'].value.trim();

  if (!query) {
    iziToast.error({
      message: 'Please enter a search query!',
      position: 'topRight',
    });
    return;
  }

  clearGallery();
  showLoader();

  try {
    const data = await getImagesByQuery(query);

    if (data.hits.length === 0) {
      iziToast.error({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
      return;
    }

    createGallery(data.hits);
  } catch (error) {
    iziToast.error({
      message: 'Something went wrong. Try again later!',
      position: 'topRight',
    });
  } finally {
    hideLoader();
    form.reset();
  }
});
