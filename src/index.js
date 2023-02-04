import './css/styles.css';
import { fetchCountries } from './fetchCountries';
let _ = require('lodash');

const DEBOUNCE_DELAY = 300;

const searchBox = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

searchBox.addEventListener(
  'input',
  _.debounce(() => {
    countryInfo.innerHTML = '';
    countryList.innerHTML = '';
    if (searchBox.value == '') {
      return;
    } else {
      fetchCountries(searchBox.value.trim());
    }
  }, DEBOUNCE_DELAY)
);

export const countryListEl = country => {
  countryList.insertAdjacentHTML(
    'beforeend',
    `
  <li class="country-list__item">
    <img src="${country.flags.svg}" alt="${country.flags.svg}"/>
    <p>${country.name.common}</p>
   </li>`
  );
};

export const countryInfoDetails = country => {
  countryInfo.innerHTML = `
  <div class="country-info__name">
    <img src="${country.flags.svg}" alt="${country.flags.svg}"/>
    <h2>${country.name.common}</h2>
  </div>
  <div class="country-info__details">
    <p><span class="bold">Capital:</span> ${country.capital}</p>
    <p><span class="bold">Population:</span> ${country.population}</p>
    <p><span class="bold">Languages:</span> ${Object.values(
      country.languages
    )}</>
  </div>
  `;
};
