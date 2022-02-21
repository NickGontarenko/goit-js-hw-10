import debounce from 'lodash/debounce';
import './css/styles.css';

// import { fetchCountries } from './js/fetchCountries';
import countryInfoTpl from './templates/country_information.hbs';
import shortCountryInfoTpl from './templates/short_info.hbs';

const formRef = document.querySelector('input#search-box');
// console.log(formRef);
const countryInfoRef = document.querySelector('.country-info');
const countryListRef = document.querySelector('.country-list');
const DEBOUNCE_DELAY = 300;

// formRef.addEventListener('input', debounce(onInputName, DEBOUNCE_DELAY));
formRef.addEventListener('input', debounce(onInputName, 1000));

function onInputName(evt) {
  const inputName = evt.target.value;
  // console.log(inputName);

  fetchCountries(inputName)
    .then(renderCountryCard)
    .catch(error => {
      console.log('error');
    });
}

function fetchCountries(countryName) {
  console.log(countryName);

  return fetch(
    `https://restcountries.com/v3.1/name/${countryName}?fields=name,capital,population,flags,languages`,
  ).then(response => {
    // console.log(response);
    return response.json();
  });
}

function renderCountryCard(country) {
  // console.log(country);
  console.log(country.length);
  const markupCountry = countryInfoTpl(country).trim();
  const shortMatupCountry = shortCountryInfoTpl(country).trim();
  // console.log(markupCountry);
  console.log(shortMatupCountry);

  if (country.length < 2) {
    countryInfoRef.innerHTML = markupCountry;
  }

  if (country.length > 1 && country.length < 10) {
    countryListRef.innerHTML = shortMatupCountry;
  }
}
