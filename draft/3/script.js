"use strict";

const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".countries");

///////////////////////////////////////

//  https://restcountries.com/v2/

// http methods: get, post, put, patch

const renderError = function (msg) {
  countriesContainer.insertAdjacentText("beforeend", msg);
  // countriesContainer.style.opacity = 1;
};

const renderCountry = function (data, className = "") {
  const html = `<article class="country ${className}">
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
  // countriesContainer.style.opacity = 1;
};

// //callbacks hell!!!!!   if we have lots of nested callback functions

// const getCountryAndNeighbour = function (country) {
//   const request = new XMLHttpRequest();

//   //type , string that contains the url
//   request.open("GET", `https://restcountries.com/v3.1/name/${country}`);
//   //send the request to the url
//   request.send();

//   //when the send finished in the background, the callback function will be called
//   request.addEventListener("load", function () {
//     console.log(this.responseText); //"this" points to the request

//     const [data] = JSON.parse(this.responseText);
//     console.log(data);

//     //render country
//     renderCountry(data);

//     //get the neighbor country
//     const nb = data.borders?.[0];

//     //AJAX call country2
//     const request2 = new XMLHttpRequest();
//     request2.open("GET", `https://restcountries.com/v3.1/alpha/${nb}`);
//     request2.send();
//     request2.addEventListener("load", function () {
//       const [data2] = JSON.parse(this.responseText);
//       console.log(data2);

//       renderCountry(data2, "neighbour");
//     });
//   });
// };

// getCountryAndNeighbour("china");

const request = fetch("https://restcountries.com/v3.1/name/china");
console.log(request);

// const getCountryData = function (country) {
//   //fetch return a promise, use "then" to handle the promise
//   //call json method to read the data from response, it returns another promise, call "then" again
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then(function (response) {
//       console.log(response);
//       return response.json(); //new promise
//     })
//     .then(function (data) {
//       console.log(data);
//       renderCountry(data[0]);
//     });
// };

const getJSON = function (url, errorMsg = "Something went wrong") {
  return fetch(url).then((response) => {
    if (!response.ok) {
      //throw errors manually
      throw new Error(`${errorMsg} (${response.status})`);
    }
    return response.json();
  });
};

const getCountryData = function (country) {
  //fetch return a promise, use "then" to handle the promise
  //call json method to read the data from response, it returns another promise, call "then" again

  getJSON(
    `https://restcountries.com/v3.1/name/${country}`,
    "Country not found!"
  )
    .then((data) => {
      renderCountry(data[0]);

      if (!("borders" in data[0])) {
        throw new Error("No neighbour found!");
      }

      const nb = data[0].borders[0];

      //country2
      return getJSON(
        `https://restcountries.com/v3.1/alpha/${nb}`,
        "Country not found"
      );
    })
    .then((data) => renderCountry(data[0], "neighbour"))
    .catch((err) => {
      //return promise
      console.error(`${err} !!!!`);
      renderError(`Something went wrong: ${err.message}`);
    })
    .finally(() => {
      // only works with promise
      //always happen
      countriesContainer.style.opacity = 1;
    }); //catch any error in any place
};

btn.addEventListener("click", function () {
  getCountryData("china");
});

setTimeout(() => {
  console.log("222");
}, 1000);

//promisify the geolocation app
const getPosi = function () {
  return new Promise(function (resolve, reject) {
    // navigator.geolocation.getCurrentPosition(
    //   (pos) => resolve(pos),
    //   (err) => reject(err)
    // );

    //getCurrentPosition automatically calls either of the two callbacks and passes the appropriate argument (position object for success callback, or the error object for error callback)
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

getPosi().then((res) => console.log(res));

//asy function
const whereAmI = async function (country) {
  const res = await fetch(`https://restcountries.com/v3.1/name/${country}`);
  console.log(res);

  const data = await res.json();
  renderCountry(data[0]);
};

whereAmI("usa");

// Running Promises in Parallel
const get3Countries = async function (c1, c2, c3) {
  try {
    // const [data1] = await getJSON(
    //   `https://restcountries.eu/rest/v2/name/${c1}`
    // );
    // const [data2] = await getJSON(
    //   `https://restcountries.eu/rest/v2/name/${c2}`
    // );
    // const [data3] = await getJSON(
    //   `https://restcountries.eu/rest/v2/name/${c3}`
    // );
    // console.log([data1.capital, data2.capital, data3.capital]);

    const data = await Promise.all([
      //one promise reject,  the whole reject
      getJSON(`https://restcountries.com/v3.1/name/${c1}`),
      getJSON(`https://restcountries.com/v3.1/name/${c2}`),
      getJSON(`https://restcountries.com/v3.1/name/${c3}`),
    ]);
    console.log(data.map((d) => d[0].capital));
  } catch (err) {
    console.error(err);
  }
};
get3Countries("portugal", "canada", "tanzania");

// Other Promise Combinators: race, allSettled and any
// Promise.race
(async function () {
  const res = await Promise.race([
    //three promises race against each other
    //promise that get reject also win the "race"
    getJSON(`https://restcountries.eu/rest/v2/name/italy`),
    getJSON(`https://restcountries.eu/rest/v2/name/egypt`),
    getJSON(`https://restcountries.eu/rest/v2/name/mexico`),
  ]);
  console.log(res[0]);
})();

//case
const timeout = function (sec) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error("Request took too long!"));
    }, sec * 1000);
  });
};

Promise.race([
  getJSON(`https://restcountries.eu/rest/v2/name/tanzania`),
  timeout(5),
])
  .then((res) => console.log(res[0]))
  .catch((err) => console.error(err));

// Promise.allSettled : return all results of promises
Promise.allSettled([
  Promise.resolve("Success"),
  Promise.reject("ERROR"),
  Promise.resolve("Another success"),
]).then((res) => console.log(res));

Promise.all([
  Promise.resolve("Success"),
  Promise.reject("ERROR"),
  Promise.resolve("Another success"),
])
  .then((res) => console.log(res))
  .catch((err) => console.error(err));

// Promise.any [ES2021]    return the first fulfilled promise, ignore the rejected promise
Promise.any([
  Promise.resolve("Success"),
  Promise.reject("ERROR"),
  Promise.resolve("Another success"),
])
  .then((res) => console.log(res))
  .catch((err) => console.error(err));
