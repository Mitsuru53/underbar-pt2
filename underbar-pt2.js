const { each } = require('./underbar-pt1');

/**
 * OBJECTS
 * =======
 *
 * In this section, we'll look at a couple of helpers for merging objects.
 */

// Extend a given object with all the properties of the passed in
// object(s).
//
// Example:
//   var obj1 = {key1: "something"};
//   _.extend(obj1, {
//     key2: "something new",
//     key3: "something else new"
//   }, {
//     bla: "even more stuff"
//   }); // obj1 now contains key1, key2, key3 and bla
const extend = function(obj) {
  // Your code here
  // Hint: remember that Array.from can convert an array-like object to handy-dandy array for you.
  var destination = {};
  for (var i = 0; i < arguments.length; i++) {
    for (key in arguments[i]) {
      destination[key] = arguments[i][key]
    }
  }
  return destination;
};

// Like extend, but doesn't ever overwrite a key that already
// exists in obj
const defaults = function(obj) {
  // Your code here
  var destination;
  for (var i = 0; i < arguments.length; i++) {
    if (destination === undefined) {
      destination = arguments[i];
    }
    for (key in arguments[i]) {
      if (!destination.hasOwnProperty(key)) {
        destination[key] = arguments[i][key]
      }
    }
  }
  return destination;
};


/**
 * FUNCTIONS
 * =========
 *
 * Now we're getting into function decorators, which take in any function
 * and return out a new version of the function that works somewhat differently
 */

// Return a function that can be called at most one time. Subsequent calls
// should return the previously returned value.
const once = function(func) {
  // Hint: you're going to need to return another function that you create inside this function.
  var called = false;
  var result = function(){};
  return function() {
    if(!called){
      result = func.apply(this, arguments);
      called = true;
    }
    return result;
  }
};

// Memorize an expensive function's results by storing them. You may assume
// that the function only takes primitives as arguments.
// memoize could be renamed to oncePerUniqueArgumentList; memoize does the
// same thing as once, but based on many sets of unique arguments.
//
// _.memoize should return a function that, when called, will check if it has
// already computed the result for the given argument and return that value
// instead if possible.
const memoize = function(func) {
  // Hint: look up Function.apply
  // Your code here
  const memoizedFunc = function() {
    const cache = memoizedFunc.cache;
    const key = JSON.stringify(arguments);
    if (!cache[key]) {
      cache[key] = func.apply(this, arguments);
    }
    return cache[key];
  };
  memoizedFunc.cache = {};
  return memoizedFunc;
};

// Delays a function for the given number of milliseconds, and then calls
// it with the arguments supplied.
//
// The arguments for the original function are passed after the wait
// parameter. For example _.delay(someFunction, 500, 'a', 'b') will
// call someFunction('a', 'b') after 500ms
const delay = function(func, wait) {
  // Hint: delay things with the global function setTimeout()
  // Hint: look up Function.apply
  var args = Array.from(arguments).slice(2);
  return setTimeout(function(){
    return func.apply(null, args);
  }, wait)
};

// Randomizes the order of an array's contents.
//
// TIP: This function's test suite will ask that you not modify the original
// input array. For a tip on how to make a copy of an array, see:
// http://mdn.io/Array.prototype.slice
const shuffle = function(arr) {
  var copyArr = arr.slice();
  var num = arr.length;
  while (num) {
    var i = Math.floor(Math.random() * num);
    var str = copyArr[--num];
    copyArr[num] = copyArr[i];
    copyArr[i] = str;
  }
  return copyArr;
  // Hint: See http://bost.ocks.org/mike/shuffle/ for an in-depth explanation of the
  // Fisher-Yates Shuffle
};

module.exports = {
  extend: extend,
  defaults: defaults,
  once: once,
  memoize: memoize,
  delay: delay,
  shuffle: shuffle
};
