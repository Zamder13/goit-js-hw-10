import './css/styles.css';
import fetchCountries from './js/fetchCountries';
import { debounce } from 'lodash';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const refs = {
  searchInput: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryBox: document.querySelector('.country-info'),
};

refs.searchInput.addEventListener('input', debounce(onFormInput, DEBOUNCE_DELAY));

function onFormInput(event) {
  const input = event.target.value.trim();
  if (input === '') {
    clear();
    return;
  }

  fetchCountries(input).then(data => {
    if (data.length > 10) {
      clear();
      Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
    } else if (data.length <= 10 && data.length >= 2) {
      clear();
      renderCountries(data);
    } else if (data.length === 1) {
      clear();
      renderCountry(data);
    }
    console.log(data);
  });
}

function renderCountries(data) {
  if (data.length >= 2) {
    let markup = data
      .map(
        ({ name, flags }) => `
    <li class="list">
  <img src="${flags.svg}" alt="flag">
  <p class="description">${name.common}</p>
</li>`,
      )
      .join('');

    refs.countryList.insertAdjacentHTML('beforeend', markup);
  }
}

function renderCountry(data) {
  if ((data.length = 1)) {
    let markup = data
      .map(
        ({ name, flags, capital, population, languages }) => `
   <div><img src="${flags.svg}" alt="flag">
        <div class="container">
            <h1>Name: </h1>
            <p>${name.official}</p>
        </div>
    </div>
    <div class="container">
        <h2>Capital: </h2>
        <p>${capital}</p>
    </div>
    <div class="container">
        <h2>Population:</h2>
        <p>${population}</p>
    </div>
    <div class="container">
        <h2>Languages:</h2>
        <p>${Object.values(languages)}</p>
    </div>`,
      )
      .join('');
    refs.countryBox.insertAdjacentHTML('beforeend', markup);
  }
}

function clear() {
  refs.countryBox.innerHTML = '';
  refs.countryList.innerHTML = '';
}
