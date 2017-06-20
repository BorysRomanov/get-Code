//to start run "node getSecretCode.js"

//install: npm install --save isomorphic-fetch es6-promise

const fetch = require('isomorphic-fetch');

//recurcive function with number verification
function coolOrNot(number) {
  if (number === 4) { return false };
  if (number === 1) { return true };
  let array = ('' + number).split('');
  let newNumber = array.reduce( (sum, current) => {
    return (sum + (current * current));
  }, 0);
  return coolOrNot(newNumber);
};

//get sum of all "cool numbers" starting with 1 and going up to and including 1,000,000
let sumCoolNumbers = (function () {
  let amount = 0;
  for (let i = 1; i <= 1000000; i++) {
    if (coolOrNot(i)) {
      amount += i;
    };
  };
  return amount;
}());

let requests = [];

// POST requests
for (let i = 0; i <= 100; ++i) {
    requests.push(fetch(`http://dev.getethos.com/code${i}`, {
        method: "post",
        headers: {
            "X-COOL-SUM": sumCoolNumbers
        }
    }).then((response) => {
        if(response.status == 200) {
            return response.text();
        }
    }, (error) => {
        console.log(new Error(err));
    }));
};

console.log(sumCoolNumbers);

// put letters together in the order of the requests & get code
Promise.all(requests).then((item) => {
    console.log(`Code is "${item.join('')}"`);
});
