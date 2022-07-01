// Описан в документации
import SimpleLightbox from 'simplelightbox';
// Дополнительный импорт стилей
import 'simplelightbox/dist/simple-lightbox.min.css';
//
import Notiflix from 'notiflix';
// експортт ф-ції
import fetchPhotos from './fetchCountries';
//

//
import './css/styles.css';
Notiflix.Notify.init({
  width: '300px',
  position: 'right-top',
  closeButton: false,
});

//
let page;
let query = '';
let newpages;
//
const target = document.querySelector('.target');
const options = {
  root: null,
  rootMargin: '300px',
  threshold: 1.0,
};
//
const observer = new IntersectionObserver(updatePhotos, options);
// звернення до форми
const inputSearch = document.querySelector('#search-form');
// звернення до gallery
const gallery = document.querySelector('.gallery');
// // звернення до кнопки
// const button = document.querySelector('button');
// слухач на інпут
inputSearch.addEventListener('submit', onSubmit);
// слухач на кнопку
// button.addEventListener('click', handlerBtn);

// servise

//  ф-ція запросу на ресурс з поверненням промісу масиву
async function onSubmit(evt) {
  console.log(evt);
  //   evt.preventDefault();
  gallery.innerHTML = '';
  observer.unobserve(target);
  page = 1;
  // await onInput(evt);
  const query = evt.target.elements.searchQuery.value;
  if (!query) {
    Notiflix.Notify.failure('Enter any value');
    return;
  }

  fetchPhotos(query, page)
    .then(response => {
      console.log(response);
      if (response.data.totalHits === 0) {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      } else if (response) {
        Notiflix.Notify.success('Hooray! We found ${response} images.');
      }
      renderPosts(response.data.hits);
      //
      observer.observe(target);
    })
    .catch(error => console.log(error));
}
//
// function fetchPhotos(value, page) {
//   const params = new URLSearchParams({
//     // key - твой уникальный ключ доступа к API.
//     key: API,
//     // q - термин для поиска. То, что будет вводить пользователь.
//     q: 'animals',
//     // image_type - тип изображения. Мы хотим только фотографии, поэтому задай значение photo.
//     image_type: 'photo',
//     // orientation - ориентация фотографии. Задай значение horizontal.
//     orientation: 'horizontal',
//     // safesearch - фильтр по возрасту. Задай значение true.
//     safesearch: 'true',
//     // per_page: 40,
//     // page,
//     // keyword,
//     // key: API,
//   });
//   //  return fetch(`${BASE_URL}?${API}${params}`)
//   return fetch(`${url}?${params}`).then(response => {
//     if (!response.ok) {
//       throw new Error(response.status);
//     }
//     return response.json();
//   });
// }
// fetchPhotos(value, page);
// рендеримо зображення
function renderPosts(images) {
  const markup = images
    .map(element => {
      return `<div class="photo-card">
      <a class="gallery-link" href="${element.largeImageURL}">
  <img src="${element.webformatURL}" alt="${element.tags}" loading="lazy" width="200" height=""/>
  </a>
  
  <div class="info">
    <p class="info-item">
      <b>Likes: ${element.likes}</b>
    </p>
    <p class="info-item">
      <b>Views: ${element.views}</b>
    </p>
    <p class="info-item">
      <b>Comments: ${element.comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads: ${element.downloads}</b>
    </p>
  </div>
  
</div>`;
    })
    .join('');
  gallery.insertAdjacentHTML('beforeend', markup);
  //
  const lightbox = new SimpleLightbox('.gallery a', {
    //
  });
  lightbox.refresh();
}
// infiniti
function updatePhotos(entries) {
  console.log(entries);
  newpages = entries.forEach(entry => {
    if (entry.isIntersecting) {
      console.log(query);
      page += 1;
      fetchPhotos(query, page).then(response => {
        //FIXME:

        if (response.data.totalHits < page * 40) {
          Notiflix.Notify.failure(
            `We're sorry, but you've reached the end of search results.`
          );
          observer.unobserve(target);
          return;
        }
        renderCards(response.data.hits);
      });
    }
  });
}
