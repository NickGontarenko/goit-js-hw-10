import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash/debounce';
import './css/styles.css';

import { fetchCountries } from './js/fetchCountries';
import countryInfoTpl from './templates/country_information.hbs';
import shortCountryInfoTpl from './templates/short_info.hbs';

const formRef = document.querySelector('input#search-box');
// console.log(formRef);
const countryInfoRef = document.querySelector('.country-info');
const countryListRef = document.querySelector('.country-list');
const DEBOUNCE_DELAY = 300;

// formRef.addEventListener('input', debounce(onInputName, DEBOUNCE_DELAY));
formRef.addEventListener('input', debounce(onInputName, DEBOUNCE_DELAY));

function onInputName(evt) {
  const inputName = evt.target.value;
  // console.log(inputName);
  if (inputName === '') {
    countryInfoRef.textContent = '';
    countryListRef.textContent = '';
    return;
  }

  fetchCountries(inputName).then(renderCountryCard).catch(fetchError);
}



function renderCountryCard(country) {
  // console.log(country);
  console.log(country.length);
  const markupCountry = countryInfoTpl(country).trim();
  const shortMatupCountry = shortCountryInfoTpl(country).trim();
  console.log(markupCountry);
  console.log(shortMatupCountry);

  if (country.length > 1 && country.length < 11) {
    countryListRef.innerHTML = shortMatupCountry;
    countryInfoRef.textContent = '';
  }
  if (country.length < 2) {
    countryInfoRef.innerHTML = markupCountry;
    countryListRef.textContent = '';
  }
  if (country.length > 10) {
    countryInfoRef.textContent = '';
    countryListRef.textContent = '';
    Notify.info('Too many matches found. Please enter a more specific name.');
  }
}

function fetchError() {
  Notify.failure('Oops, there is no country with that name');
}
