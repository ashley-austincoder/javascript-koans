var _; //globals

describe("About Applying What We Have Learnt", function() {

  var products;

  beforeEach(function () {
    products = [
       { name: "Sonoma", ingredients: ["artichoke", "sundried tomatoes", "mushrooms"], containsNuts: false },
       { name: "Pizza Primavera", ingredients: ["roma", "sundried tomatoes", "goats cheese", "rosemary"], containsNuts: false },
       { name: "South Of The Border", ingredients: ["black beans", "jalapenos", "mushrooms"], containsNuts: false },
       { name: "Blue Moon", ingredients: ["blue cheese", "garlic", "walnuts"], containsNuts: true },
       { name: "Taste Of Athens", ingredients: ["spinach", "kalamata olives", "sesame seeds"], containsNuts: true }
    ];
  });

  /*********************************************************************************/

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (imperative)", function () {

    var i,j,hasMushrooms, productsICanEat = [];

    for (i = 0; i < products.length; i+=1) {
        if (products[i].containsNuts === false) {
            hasMushrooms = false;
            for (j = 0; j < products[i].ingredients.length; j+=1) {
               if (products[i].ingredients[j] === "mushrooms") {
                  hasMushrooms = true;
               }
            }
            if (!hasMushrooms) productsICanEat.push(products[i]);
        }
    }

    expect(productsICanEat.length).toBe(1);
  });

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (functional)", function () {

      /* solve using filter() & all() / any() */
      var productsICanEat = products.filter(function(pizza){
        return pizza.containsNuts === false;
      }).filter(function(p){
        if(p.ingredients.indexOf("mushrooms")<0) return true;
      })

      expect(productsICanEat.length).toBe(1);
  });

  /*********************************************************************************/

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (imperative)", function () {

    var sum = 0;
    for(var i=1; i<1000; i+=1) {
      if (i % 3 === 0 || i % 5 === 0) {
        sum += i;
      }
    }

    expect(sum).toBe(233168);
  });

  function range(n){
    var arr = [],
    var i =0;
    while(i < n){
      arr.push(i)
      i++
    }
    return arr;
  }

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (functional)", function () {

    var sum = range(1000).reduce(function(startVal, val){

      if(val % 3 === 0 || val % 5 === 0) {
        return startVal + val;
      }
    }, 0);    /* try chaining range() and reduce() */

    expect(233168).toBe(sum);
  });

  /*********************************************************************************/
   it("should count the ingredient occurrence (imperative)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    for (i = 0; i < products.length; i+=1) {
        for (j = 0; j < products[i].ingredients.length; j+=1) {
            ingredientCount[products[i].ingredients[j]] = (ingredientCount[products[i].ingredients[j]] || 0) + 1;
        }
    }

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  Array.prototype.flatten = function() {
    return this.reduce(function (result, subArray) {
      return result.concat(subArray)
    })
  }

  it("should count the ingredient occurrence (functional)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

products.map(function(pizza){return pizza.ingredients;}).flatten()
  .reduce(function(result, ingredient){
    if(ingredient in result) {
      result[ingredient] = result[ingredient] + 1
      return result;
    } else {
      result[ingredient] = 1
      return result;
    }
  },{})

    /* chain() together map(), flatten() and reduce() */

    expect(ingredientCount['mushrooms']).toBe(2);
  });



//Extra Credit


//Only test prime numbers smaller than the sqrt of n
  it("should find the largest prime factor of a composite number", function (num) {
    //test for factors then test for prime
    var half = Math.floor(num / 2);
    var factors = [1];

    //push all factors into array
    for(var i=2; i < half+1; i++) {
      if(num % i === 0) {
        factors.push(i);
      }
    }
    //filter for only primes
    var primeOnly = factors.filter(function(n){
      var check = Math.sqrt(n);
      for (var i = 2; i <= check; i++) {
        if (n % i === 0) return false;
      }
      return true;
    });
    return primeOnly.pop();
  }


  function isPalidrome(n){
    var forward = "" + n;
    return forward === forward.split("").reverse().join("")
  }



  it("should find the largest palindrome made from the product of two 3 digit numbers", function () {
    var i, j, product, max=0;
    for (i = 999; i > 100; i--){
      for(j = i; j > 100; j--){
        product = i * j;
        if (isPalidrome(product)){
          if (max < product){
            max = product;
          }
        }
      }
    }
    return max;
  });


  it("should find the smallest number divisible by each of the numbers 1 to 20", function () {
    var lcm = 1;
    var sum;
    //for each number 1-20, add lowest common multiple to sum until sum is divisible by that number. Then reset sum.
    for(var i = 1; i <= 20; i++) {
      sum = lcm;
      while(sum % i !== 0){
        sum += lcm;
      }
      lcm = sum;
    }
    return lcm;
  });



  it("should find the difference between the sum of the squares and the square of the sums", function (col) {
    var sum = col.reduce(function(startVal, val){return startVal + val;});
    var squareSum = sum * sum;
    var sumSquares = col.map(function(n){return n * n;})
      .reduce(function(start, nm){return start + nm;});

    return sumSquares - squareSum;
  };

  function primeTester(n) {
    var check = Math.sqrt(n);
     if (n===2) {
        return true;
     } else if (n===1){
       return false;
     }
     for (var i = 2; i <= check; i++) {
      if (n % i === 0) {
        return false;
      }
    }
    return true;
  }

//helper function for next problem
  function isPrime(num){
    if(num === 1) return false;
    if(num === 2) return true;
    for (var i = 2; i <= Math.sqrt(num); i++){
      if(num % i === 0) {
        return false;
      }
    }
    return true
  }


  it("should find the 1001st prime", function () {
    var primes = [2,3];
    //i is prime test val, c is primes.length looking for 1001
    var i = 3, c = 2;
    //until there are 1001 values, look for prime numbers and push when found next
    while(c <= 1001){
      i += 2;
      if isPrime(i) {
        primes.push(i);
        c++;
      }
    }
    return primes[1000]
  });

});
