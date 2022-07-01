//https://pixabay.com/api/?key=28373158-c538c9e9e2bb6e6b192e187c7&q=yellow+flowers&image_type=photo
// const BASE_URL = 'https://pixabay.com/api/';
// const API = 'key=28373158-c538c9e9e2bb6e6b192e187c7';
//Для HTTP запросов использована библиотека axios.
import axios from 'axios';
import Notiflix from 'notiflix';

export default async function fetchPhotos(value, page) {
  try {
    console.log(value, page);
    const response = await axios({
      url: 'https://pixabay.com/api/',
      params: {
        key: '28373158-c538c9e9e2bb6e6b192e187c7',
        q: value,
        orientation: 'horizontal',
        image_type: 'photo',
        safesearch: true,
        page: page,
        per_page: 40,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
}

// fetchPhotos(value, page);
// //  ф-ція запросу на ресурс з поверненням промісу масиву країн
// export function fetchCountries(name) {
//   const BASE_URL = 'https://pixabay.com/api/';
//   const options = '?key=28373158-c538c9e9e2bb6e6b192e187c7';

//   const itemToFind = `${BASE_URL}${name}${options}`;
//   return fetch(itemToFind).then(data => {
//     console.log(data);
//     //
//     if (!data.ok) {
//       console.log(data.json());
//       throw new Error('Oops, there is no country with that name');
//     }
//     return data.json();
//   });
//   // .then(response => {
//   //   console.log(response);
//   // });

//   //
//   // .then(response => {
//   //   if (!response.ok) {
//   //     console.log(response.json());
//   //     throw new Error(response.status);
//   //   }
//   //   return response.json();
//   // })
//   // .catch(() => {
//   //   Notiflix.Notify.failure('Oops, there is no country with that name');
//   // });
// }
// fetchCountries('ukraine').then(data => console.log(data));

// function fetchCountries() {
//   const url = 'https://restcountries.com/v2/all?fields=name,';
//   const capital = 'capital,currencies';
//   const response = fetch(`${url}${capital}`);
//   return fetch(response)
//     .then(response => {
//       if (!response.ok) {
//         console.log(response);
//         throw new Error(response.status);
//       }
//       return response.json();
//     })
//     .catch(() => {
//       Notiflix.Notify.failure('Oops, there is no country with that name');
//     });
// }

// export function fetchCountries(name) {
//   return fetch(
//     'https://restcountries.eu/rest/v2/name/ukraine?fields=name;capital;population;flag;languages'
//   )
//     .then(response => response.json())
//     .then(dat => console.log(dat));
// }
//
//
//
// if (!response.ok) {
//       throw new Error(response.status);
//     }
//     return response.json();
//   });
