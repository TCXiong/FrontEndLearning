"use strict";

const msg2 = "hi";
console.log(msg2.repeat(3));

const msg = "hello";
console.log(msg.padEnd(10, "x"));

//map
const map = new Map();
map.set("name", "tccc");
map.set("age", 22);
map.set("arr", [1, 2, 3, 4]);
console.log(map);
console.log(map.get("name"));

//set
const ordersSet = new Set(["asdf", "dsfad", "jixjiv", "jisicjcj"]);
console.log(ordersSet.size);
console.log(ordersSet.has("asdf"));
//element cannot repeat
ordersSet.add("add");

const test3 = ["names", "what"];
//enhanced property!!!!!
const obj2 = {
  [test3[0]]: "hello",
};
console.log(obj2);

//for-of loop

const test = ["a", "b", "c", "d", "e", "f"];
for (const i of test) {
  console.log(i);
}

for (const index of test.entries()) {
  console.log(index);
}

// 1. Create one player array for each team (variables 'players1' and
// 'players2')
// 2. The first player in any player array is the goalkeeper and the others are field
// players. For Bayern Munich (team 1) create one variable ('gk') with the
// goalkeeper's name, and one array ('fieldPlayers') with all the remaining 10
// field players
// 3. Create an array 'allPlayers' containing all players of both teams (22
// players)
// 4. During the game, Bayern Munich (team 1) used 3 substitute players. So create a
// new array ('players1Final') containing all the original team1 players plus
// 'Thiago', 'Coutinho' and 'Perisic'
// 5. Based on the game.odds object, create one variable for each odd (called
// 'team1', 'draw' and 'team2')
// 6. Write a function ('printGoals') that receives an arbitrary number of player
// names (not an array) and prints each of them to the console, along with the
// number of goals that were scored in total (number of player names passed in)
// 7. The team with the lower odd is more likely to win. Print to the console which
// team is more likely to win, without using an if/else statement or the ternary
// operator.

const game = {
  team1: "Bayern Munich",
  team2: "Borrussia Dortmund",
  players: [
    [
      "Neuer",
      "Pavard",
      "Martinez",
      "Alaba",
      "Davies",
      "Kimmich",
      "Goretzka",
      "Coman",
      "Muller",
      "Gnarby",
      "Lewandowski",
    ],
    [
      "Burki",
      "Schulz",
      "Hummels",
      "Akanji",
      "Hakimi",
      "Weigl",
      "Witsel",
      "Hazard",
      "Brandt",
      "Sancho",
      "Gotze",
    ],
  ],
  score: "4:0",
  scored: ["Lewandowski", "Gnarby", "Lewandowski", "Hummels"],
  date: "Nov 9th, 2037",
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

for (const d of Object.values(game.odds)) {
  console.log(d);
}
console.log();

//1.
const [players1, players2] = game.players;
console.log(players1, players2);
//2.
const [gk, ...fieldPlayers] = players1;
//3.
const allP = [...players1, ...players2];
console.log(allP);
//4.
const final = [...allP, "Thiago", "Coutinho", "Perisic"];
console.log(final);
//5.
const { team1, x: draw, team2 } = game.odds;
console.log(5, draw);

//6.
const printGoals = function (...obj) {};

// Data needed for a later exercise
const flights =
  "_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30";

// Data needed for first part of the section
const restaurant = {
  name: "Classico Italiano",
  location: "Via Angelo Tavanti 23, Firenze, Italy",
  categories: ["Italian", "Pizzeria", "Vegetarian", "Organic"],
  starterMenu: ["Focaccia", "Bruschetta", "Garlic Bread", "Caprese Salad"],
  mainMenu: ["Pizza", "Pasta", "Risotto"],

  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },
  //es6
  order(start, end) {
    return [this.starterMenu[start], this.mainMenu[end]];
  },
  //set default values    Immediate deconstruct in function
  orderDelivery({ starterIndex = 1, mainIndex = 0, time = "20:00", address }) {
    console.log(
      `Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`
    );
  },
  orderPasta: function (ing1, ing2, ing3) {
    console.log(
      `Here is your delicious pasta with ${ing1}, ${ing2} and ${ing3}`
    );
  },
};

const pair = Object.entries(restaurant.openingHours);

for (const [day, { open, close }] of pair) {
  console.log(open, close);
}

console.log(pair);

//looping objects
for (const day of Object.keys(restaurant.openingHours)) {
  console.log(day);
}

for (const num of Object.values(restaurant.openingHours)) {
  console.log(num);
}

//optional chaining, if mon does not exist, then immediately return undefined instead of error.
console.log(restaurant.openingHours.mon?.open);

const rest1 = {
  name: "Capri",
  numGuests: 20,
};

const rest2 = {
  name: "La Piazza",
  owner: "Rose",
};
rest1.numGuests = rest1.numGuests || 10;
rest2.numGuests = rest2.numGuests || 10;
//or assignment
rest1.numGuests ||= 10; //same to rest1.numGuests = rest1.numGuests || 10
rest2.numGuests ||= 10;

//nullish assignment
rest1.numGuests ??= 10;
rest2.numGuests ??= 10;

//And assignment
rest1.owner &&= "ANONYMOUS!";

console.log(rest1);
console.log(rest2);

//nullish value, similar to or, but only null and undefined are false, (not 0 or '')
console.log(0 ?? 10); //return 0

//short circuiting
console.log(3 || "john"); //return 3, means if the first the value is true, it will immediately return the first value
console.log("" || "john"); //return john
console.log(undefined || null); //undefined is false, so return null
console.log(undefined || null || 0 || "hello" || 2); //return hello

//AND: if the first element is false, then immediately return the first element without checking the second value
console.log(0 && "hello"); //return 0

//spread
const arr3 = [1, 2, ...[3, 4]];

//rest pattern,,rest element must be the last element
const [d, h, ...others] = [1, 2, 3, 4, 5];
console.log(others);

//rest param, take multiple values and packed them as an array
const add = function (...numbers) {
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) {
    sum += numbers[i];
  }
  console.log(sum);
};
add(1, 2, 3, 4, 5);

//
const newRest = { foundedIn: 1998, ...restaurant, founder: "Guiseppe" };

const restcopy = { ...restaurant };

// const ingredients = [
//   prompt("Let's make pasta! Ingredient 1?"),
//   prompt("Ingredient 2?"),
//   prompt("Ingredient 3?"),
// ];
// console.log(ingredients);
// restaurant.orderPasta(...ingredients);

//spread operator
//if we need elements individually in the array, we can use spread operator
const arr2 = [7, 8, 9];
const newArr = [1, 2, ...arr2]; //[1,2,7,8,9]
console.log(newArr);

const newMenu = [...restaurant.mainMenu, "Gnocci"];
console.log(newMenu);

restaurant.orderDelivery({
  time: "22:00",
  address: "cs building",
  mainIndex: 2,
  starterIndex: 2,
});

//copy array
const mainMenuCopy = [...restaurant.mainMenu];
const menu2 = [...restaurant.starterMenu, ...restaurant.mainMenu];

const arr = [2, 3, 4];
//deconstruct the array (unpacking)
const [x, y, z] = arr;
console.log(x, y, z);

//skip the second element
let [first, , third] = restaurant.categories;
console.log(first, third);

//switch two variables
[first, third] = [third, first];
console.log(first, third);

let res = restaurant.order(0, 0);
console.log(res);

//deconstruct the nested array
const nested = [2, 4, [5, 6]];
const [i, , [j, k]] = nested;
console.log(j, k);

//set default values
const [p = 1, q = 1, r = 1] = [7, 8];
console.log(p, q, r);

//--------------------------------------------------------------------

//deconstruct objects, order does not matter, select the corresponding name
const { name, openingHours, categories } = restaurant;
console.log(name, openingHours, categories);

// can specify a new name
const {
  name: restaurantName,
  openingHours: hours,
  categories: tag,
} = restaurant;
console.log(restaurantName, hours, tag);

//set default values
const { menu = [], starterMenu: starters = [] } = restaurant;
console.log(menu, starters);

//Mutating variables, change a to 23, change b to 7
let a = 111;
let b = 999;
const obj = { a: 23, b: 7, c: 14 };
({ a, b } = obj);
console.log(a, b);

//nested objects
const {
  fri: { open: o, close: c },
} = openingHours; //??? why do not restaurant.openingHours
console.log(o, c);
