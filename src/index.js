import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
//
const DEBOUNCE_DELAY = 300;
// звернення до інпута
const inputSearch = document.querySelector('#search-box');
// звернення до <li></li>
const countryList = document.querySelector('.country-list');
// звернення до <div></div>
const countryInfo = document.querySelector('.country-info');
// слухач на інпут
inputSearch.addEventListener('input', debounce(onInput), DEBOUNCE_DELAY);
//
//
// Выполни санитизацию введенной строки методом trim(), это решит проблему когда в поле ввода только пробелы или они есть в начале и в конце строки.
//
function onInput(evt) {
  //   console.log(evt.target.value);
  const query = evt.target.value;
  if (query === '') {
    countryList.innerHTML = '';
    countryInfo.innerHTML = '';
  }
  fetchCountries(query)
    .then(response => {
      //   console.log(response);
      //   if (query === 0) {
      //     countryList.innerHTML = '';
      //   }
      //   renderUserList(response);
      if (response.length > 10) {
        // console.log(response);

        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      } else if (response.length >= 2 && response.length < 10) {
        // console.log(response);
        renderUserInfo(response);
        countryList.innerHTML = '';
      } else {
        // renderUserInfo(response);
        renderUserList(response);
        countryInfo.innerHTML = '';
      }
    })
    .catch(error => {
      //   console.log(error);
      return Notiflix.Notify.failure(
        'Oops, there is no country with that name'
      );
    });
}

//
// inputSearch.addEventListener(
//   'input',
//   // затримка між паузами
//   debounce(() => {
//     // const name = event.target.value;
//     // виклик ф-ції запросу на ресурс з поверненням промісу масиву країн
//     fetchCountries()
//       .then(event => renderUserList(event))
//       .catch(error => {
//         if (event.length > 9) {
//           // console.log(error);
//           Notify.info(
//             'Too many matches found. Please enter a more specific name.'
//           );
//         }
//       });
//   }),
//   DEBOUNCE_DELAY
// );
// 2-10
function renderUserList(arr) {
  if (arr.length > 1) {
    console.log('Stop!');
    Notify.info('Too many matches found. Please enter a more specific name.');
    return;
  }
  //   console.log(arr[0].name);
  //
  const markup = `
            <li>
             <img src="${arr[0].flags.svg}" alt="${arr[0].name}" width="200">
              <p><b>Name</b>: ${arr[0].name}</p>
              <p><b>Capital</b>: ${arr[0].capital}</p>
              <p><b>Population</b>: ${arr[0].population}</p>

              <p><b>Languages</b>: ${arr[0].languages[0].name}</p>

            </li>
        `;

  countryList.innerHTML = markup;
}
// 1
function renderUserInfo(arr) {
  //   if (arr.length >= 2 && arr.length <= 10) {
  //     console.log('Stop!');
  //     return;
  //   }
  //   console.log(arr[0].name);
  //
  const markup = arr.map(img => {
    return `
            <li class="grid">
             <img src="${img.flags.svg}" alt="${img.name}" width="50">
              <p class="text">${img.name}</p>
            </li>
        `;
  });
  console.log(markup);
  countryInfo.innerHTML = markup.join('');
}
// function renderUserList(country) {
//   console.log(country);
//   const markup = country
//     .map(count => {
//       return `
//           <li>
//            <img src="${count.flags.svg}" alt="${name}">
//             <p><b>Name</b>: ${count.name.official}</p>
//             <p><b>Capital</b>: ${count.capital}</p>
//             <p><b>Population</b>: ${count.population}</p>

//             <p><b>Languages</b>: ${count.languages}</p>

//           </li>
//       `;
//     })
//     .join('');
//   countryList.innerHTML = markup;
// }

//
//
//

// Repeta
// fetch(
//   'https://restcountries.eu/rest/v2/name/ukraine?fields=name;capital;population;flag;languages'
// )
//   .then(response => {
//     console.log(response.json());
//     return response.json();
//   })
//   .then(capital => {
//     console.log(capital);
//   })
//   .catch(error => {
//     console.log(error);
//   });
// fetchCountries().then(data => console.log(data));
