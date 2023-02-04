import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { countryListEl } from './index';
import { countryInfoDetails } from './index';

export const fetchCountries = name => {
  console.log(name);
  fetch(
    `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`
  )
    .then(response => response.json())

    .then(data => {
      if (data.length > 10) {
        Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      } else if (data.length <= 10 && data.length > 1) {
        Notify.info('The following matches were found.');
        data.forEach(country => {
          // Lists up to 10 countries that match entered value
          countryListEl(country);
        });
      } else if (data.length === 1) {
        Notify.info('The following match was found.');
        data.forEach(country => {
          // Creates html element for country with more detailed information
          countryInfoDetails(country);
        });
      } else {
        Notify.failure('Oops, there is no country with that name');
      }
    })
    .catch(() => Notify.failure('Oops, there is no country with that name'));
};
