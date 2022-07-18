"use strict";

const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".countries");

///////////////////////////////////////

//  https://restcountries.com/v2/

// http methods: get, post, put, patch

const getCountryData = function (country) {
  const request = new XMLHttpRequest();

  //type , string that contains the url
  request.open("GET", `https://restcountries.com/v3.1/name/${country}`);
  //send the request to the url
  request.send();

  //when the send finished in the background, the callback function will be called
  request.addEventListener("load", function () {
    console.log(this.responseText); //"this" points to the request

    const [data] = JSON.parse(this.responseText);
    console.log(data);

    const html = `<article class="country">
  <img class="country__img" src="${data.flags.svg}" />
  <div class="country__data">
    <h3 class="country__name">${data.name.common}</h3>
    <h4 class="country__region">${data.region}</h4>
    <p class="country__row"><span>👫</span>${(
      +data.population / 1000000
    ).toFixed(1)} million people</p>
    <p class="country__row"><span>🗣️</span>${
      Object.values(data.languages)[0]
    }</p>
      <p class="country__row"><span>💰</span>${
        Object.keys(data.currencies)[0]
      }</p>
  </div>
</article>`;

    countriesContainer.insertAdjacentHTML("beforeend", html);
    countriesContainer.style.opacity = 1;
  });
};

getCountryData("china");
getCountryData("usa");
getCountryData("United Kingdom");
