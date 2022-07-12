"use strict";

(function () {
  const ele = document.querySelector("h1");
  ele.style.color = "red";

  document.querySelector("body").addEventListener("click", function () {
    ele.style.color = "blue";
  });
})();

//
let f;

const g = function () {
  const a = 23;
  f = function () {
    console.log(a * 2);
  };
};
g();
f();

//
const secureBooking = function () {
  let passengerCount = 0;

  return function () {
    passengerCount++;
    console.log(`${passengerCount} passengers`);
  };
};

//

//Immediately Invoked Function Expressions (IIFE): a function that is is only called once
(function () {
  console.log("run once");
  const privateNum = 23; //cannot access outside the function
})();

//poll
const poll = {
  question: "What is your favourite programming language?",
  options: ["0: JavaScript", "1: Python", "2: Rust", "3: C++"],
  // This generates [0, 0, 0, 0]. More in the next section 😃
  answers: new Array(4).fill(0),
  registerNewAnswer() {
    const ans = Number(
      prompt(
        `${this.question}\n${this.options.join("\n")}\n(Write option number)`
      )
    );
    console.log(ans);
    //register answer

    typeof ans === "number" && ans < this.answers.length && this.answers[ans]++;
    this.displayRes("string");
  },
  displayRes(type = "array") {
    if (type === "array") {
      console.log(this.answers);
    } else if (type === "string") {
      console.log(`${this.answers.join(", ")}`);
    }
  },
};
//poll.registerNewAnswer();

document
  .querySelector(".poll")
  .addEventListener("click", poll.registerNewAnswer.bind(poll));

//
//
// [1, 5, 3, 9, 6, 1]
// display [5, 2, 3]
poll.displayRes.call({ answers: [5, 2, 3] }, "string");

poll.displayRes.bind({ answers: [1, 5, 3, 9, 6, 1] })("string");

//---------------------------------------------------------------------
const lufthansa = {
  airline: "Lufthansa",
  iataCode: "LH",
  bookings: [],
  // book: function() {}
  book(flightNum, name) {
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
    );
    this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name });
  },
};

lufthansa.book(239, "Jonas Schmedtmann");
lufthansa.book(635, "John Smith");

const eurowings = {
  airline: "Eurowings",
  iataCode: "EW",
  bookings: [],
};

const book = lufthansa.book;
// Does NOT work
// book(23, 'Sarah Williams');

// Call method
//the first arg is what we want the "this" keyword point to
// firstly call the "call" method, then the "call" method calls the "book" method
book.call(eurowings, 23, "ttccc");
console.log(eurowings.bookings);
//
book.call(lufthansa, 239, "Tom");
console.log(lufthansa);

//Apply, very similar to call, but pass the array as the second arg
const flightData = [];
book.apply(eurowings, [99, "Jones"]);
console.log(eurowings.bookings);
//modern js usually do: call + spread array
const data = [124, "Bob"];
book.call(eurowings, ...data);
console.log(eurowings.bookings);
//Bind method
const bookEW23 = book.bind(eurowings, 23); //partial application: part of arg of original functions are set
bookEW23("Jane");
console.log(eurowings.bookings);

lufthansa.planes = 300;
lufthansa.buyPlane = function () {
  console.log(this);
  this.planes++;
  console.log(this.planes);
};

//the event function calls the buyPlane functions, so this points to the button whose class is buy
document.querySelector(".buy").addEventListener("click", lufthansa.buyPlane);

//manually define this.
document
  .querySelector(".buy")
  .addEventListener("click", lufthansa.buyPlane.bind(lufthansa));

//-------------------------------
//-------------------------------
//-------------------------------
const say = function (str) {
  console.log(str);
};

const greet = function (msg) {
  return say(msg);
};

greet("hello");

const flight = "LH234";
const jonas = {
  name: "Jonas Schmedtmann",
  passport: 24739479284,
};

const bookings = [];

const createBooking = function (
  flightNum,
  numPassengers = 1, //default value
  price = 199 * numPassengers
) {
  // ES5
  // numPassengers = numPassengers || 1;
  // price = price || 199;

  const booking = {
    flightNum,
    numPassengers,
    price,
  };
  console.log(booking);
  bookings.push(booking);
};

createBooking("LH123");
createBooking("LH123", 2, 800);
createBooking("LH123", 2);
createBooking("LH123", 5);

createBooking("LH123", undefined, 1000);
