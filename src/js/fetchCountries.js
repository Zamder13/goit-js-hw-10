import Notiflix from 'notiflix';

export default function fetchCountries(name) {
  const URL = `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`;
  return fetch(URL).then(response => {
    console.log(response);
    if (!response.ok) {
      throw Notiflix.Notify.failure('Oops, there is no country with that name');
    }

    return response.json();
  });
}
