export const fetchCountries = function (countryName) {
  const url = `https://restcountries.com/v3.1/name/${countryName}?fields=name,capital,population,flags,languages`;

  return fetch(url)
    .then(response => {
      // console.log(response);
      return response.json();
    })
    .then(country => {
      console.log(country);
      const markupCountry = countryInfoTpl(country);
      console.log(markupCountry);
      countryInfoRef.innerHTML = markupCountry;
    })
    .catch(error => {
      console.log('error');
    });
};
