
// C:\laragon\www\explore_html_css\javascript.html




function sytnax1() {
    let x = 5;
    let y = 6;
    let z = x + y;
    return z;
}

// Create a function that will return an integer number corresponding to the amount of digits in the given integer num.
// Examples
// num_of_digits(1000) : 4
// num_of_digits(12) : 2
// num_of_digits(1305981031) : 10
// num_of_digits(0) : 1

function num_of_digits1(num) {
    // ---
    const sol1 = String(num).length;
    // ---
    const sol2 = Math.abs(num).toString().length ?? 0;
    return sol2;
}

function num_of_digits2(num) {
	num = Math.abs(num);
	let count = 0;
	
	if(num === 0){
		return 1;
	}
	
	while (num > 0) {
			num = Math.floor(num / 10);
			count++;
	}
	return count;
}

function num_of_digits3(num) {
	return `${num}`.match(/\d/g).length;
}

const num_of_digits4 = (num) => `${num}`.match(/\d/g).length;

// This Triangular Number Sequence is generated from a pattern of dots that form a triangle. The first 5 numbers of the sequence, or dots, are:

// 1, 3, 6, 10, 15
// This means that the first triangle has just one dot, the second one has three dots, the third one has 6 dots and so on.

// Write a function that returns the number of dots when given its corresponding triangle number of the sequence.

// Examples
// triangle(1) ➞ 1
// triangle(6) ➞ 21
// triangle(215) ➞ 23220

function triangle(n) {
	let dot = 0;
    let total = 0;

    for (let index = 0; index < n; index++) {
        total = n - index;
        dot += total;
    }

    return dot;
}

function triangle2(n) {
	return n * (n + 1) / 2;
}


// Write a function redundant that takes in a string str and returns a function that returns str.
// Examples
// const f1 = redundant("apple")
// f1() ➞ "apple"
// const f2 = redundant("pear")
// f2() ➞ "pear"
// const f3 = redundant("")
// f3() ➞ ""

function redundant(name) {
    return () => name;
}

// Create a function that concatenates n input arrays, where n is variable.
// Examples
// concat([1, 2, 3], [4, 5], [6, 7]) ➞ [1, 2, 3, 4, 5, 6, 7]
// concat([1], [2], [3], [4], [5], [6], [7]) ➞ [1, 2, 3, 4, 5, 6, 7]
// concat([1, 2], [3, 4]) ➞ [1, 2, 3, 4]
// concat([4, 4, 4, 4, 4]) ➞ [4, 4, 4, 4, 4]

function concat(...args) {
	return args.flat();
}

const concat1 = (...args) => args.flat(1);



// Challenge 1: Sum of an Array ⭐ (Easy)
// Return the sum of all numbers in the array.
// sum([1, 2, 3, 4]) // 10
// sum([5, 5, 5])    // 15
// sum([])           // 0

const sum = (arr) => (arr.length > 0) ? Math.sumPrecise(arr) : 0; 


// Challenge 2: Find the Largest Number ⭐ (Easy)
// Return the largest number in the array.
// largest([5, 1, 9, 3]) // 9
// largest([-1, -5, -2]) // -1

const largest = (arr) => Math.max(...arr);

// const largest = (arr) => Math.max(arr);

// Challenge 3: Count Even Numbers ⭐ (Easy)
// Return how many even numbers are in the array.
// countEven([1, 2, 3, 4, 5, 6]) // 3
// countEven([1, 3, 5])          // 0
// Challenge 4: Reverse an Array (Without .reverse()) ⭐⭐
// Return a new array in reverse order.

const countEven = (arr) => arr.filter((x) => x % 2 == 0).length;

// Challenge 4: Reverse an Array (Without .reverse()) ⭐⭐
// Return a new array in reverse order.
// reverse([1, 2, 3]) // [3, 2, 1]
// reverse(["a", "b"]) // ["b", "a"]

function reverse(arr) {
    let newArr = []
    for(let index = (arr.length - 1); index >= 0; index--){
        newArr.push(arr[index]);
    }
    return newArr;
}

// Challenge 5: Remove Duplicates ⭐⭐
// Return a new array that contains only unique values.
// unique([1, 2, 2, 3, 1]) // [1, 2, 3]
// unique(["a", "a", "b"]) // ["a", "b"]


function unique(arr) {
    let newArr = []

    for (let index = 0; index < arr.length; index++) {
        const element = arr[index];
        if(!newArr.includes(element)){
            newArr.push(element);
        }
    }

    return newArr;
}

// Challenge 6: Find the Second Largest Number ⭐⭐
// Return the second largest number.
// secondLargest([10, 5, 20, 15]) // 15
// secondLargest([7, 1, 3])       // 3

function secondLargest(arr) {
    let sorted = arr.sort((a, b) => a - b);
    return sorted[arr.length - 2];
}


// Challenge 7: Rotate an Array ⭐⭐⭐
// Move the last element to the beginning.
// rotate([1, 2, 3, 4]) // [4, 1, 2, 3]
// rotate(["a", "b"])   // ["b", "a"]

function rotate(arr) {
    const lastElement = arr.at(arr.length-1);
    let removedArr = arr.slice(0, arr.length-1);
    let newArr = [];
    newArr[0] = lastElement;
    for (let index = 0; index < removedArr.length; index++) {
        newArr[index + 1] = removedArr[index];
    }
    return newArr;
}


// Challenge 8: Find Missing Number ⭐⭐⭐
// The array contains numbers from 1 to n, but one number is missing.
// Find the missing number.
// missing([1, 2, 4, 5]) // 3
// missing([2, 3, 1, 5]) // 4

function missing(arr) {
    let sortedArr = arr.sort((a, b) => a - b);
    for (let index = 0; index < sortedArr.length; index++) {
         if(sortedArr[index] != (sortedArr[index + 1] - 1)){
            return sortedArr[index] + 1;
         }
    }
    return null;
}

function missing_GPT(arr) {
    const n = arr.length + 1;
    const expectedSum = n * (n + 1) / 2;
    let actualSum = (arr.length > 0) ? Math.sumPrecise(arr) : 0;
    return expectedSum - actualSum;
}


// Challenge 9: Most Frequent Element ⭐⭐⭐
// Return the element that appears the most.
// mostFrequent([1, 2, 2, 3, 2, 1]) // 2
// mostFrequent(["a", "b", "a"])    // "a"

function mostFrequent(arr) {
    let unique = arr.filter((value, index, array) => array.indexOf(value) === index);
    let mostFrequentValue;
    let mostFrequentCount = 0;

    for (let index = 0; index < unique.length; index++) {
        let element = unique[index];
        let countElement = arr.filter((value, array) => value == element).length;
        if (countElement > mostFrequentCount){
            mostFrequentValue = element;
            mostFrequentCount = countElement;
        }
    }

    return mostFrequentValue;
}

function mostFrequent_GPT(arr) {
    const frequency = new Map();
    let mostFrequentValue;
    let mostFrequentCount = 0;

    for (const element of arr) {
        const count = (frequency.get(element) || 0) + 1;
        frequency.set(element, count);

        if (count > mostFrequentCount) {
            mostFrequentCount = count;
            mostFrequentValue = element;
        }
    }

    return mostFrequentValue;
}

// Challenge 10: Two Sum ⭐⭐⭐⭐ (Very Popular Interview Question)
// Return the indices of the two numbers that add up to the target.
// twoSum([2, 7, 11, 15], 9)
// [0, 1]
// twoSum([3, 2, 4], 6)
// [1, 2]

function twoSum(arr, target) {

    for (let index = 0; index < arr.length; index++) {
        const firstElement = arr[index];
        for (let secondIndex = 0; secondIndex < arr.length; secondIndex++) {
            const secondElement = arr[secondIndex];
            if(index != secondIndex && firstElement + secondElement == target){
                return [index, secondIndex];
            }
        }
    }

    return [];
}

function twoSum_GPT(arr, target) {
    for (let index = 0; index < arr.length; index++) {
        const firstElement = arr[index];

        for (let secondIndex = index + 1; secondIndex < arr.length; secondIndex++) {
            const secondElement = arr[secondIndex];

            if (firstElement + secondElement === target) {
                return [index, secondIndex];
            }
        }
    }

    return [];
}

function sample() {
    // add element specific
    // const arr = [1, 2, 4]; 
    // arr.splice(2, 0, 3); // index del value
    // return arr;
    // [1, 2, 3, 4]

    // Remove elements specific
    // const arr = [1, 2, 3, 4, 5];
    // arr.splice(1, 2);
    // return arr;
    // result: [1, 4, 5]

    // Remove/add element first/last
    // const arr = [1, 2, 3, 4, 5];
    // arr.shift(); // remove first
    // arr.pop(); // remove last
    // arr.unshift(0); // add first
    // arr.push(6); // add last
    // return arr;

    const arr = ["A", "B", "C", "D", "E"];
    return arr.slice(1, 4); // index length/count
    // ["B", "C", "D"]
}


console.log(sample());
// NOTES

/*
+-----------+----------------------------------------------------------+
| Keyword   | Description                                              |
+-----------+----------------------------------------------------------+
| var       | Declares a variable                                      |
| let       | Declares a block-scoped variable                         |
| const     | Declares a block-scoped constant                         |
| if        | Executes code when a condition is true                   |
| switch    | Executes different code based on matching cases          |
| for       | Executes a block of code in a loop                       |
| function  | Declares a function                                      |
| return    | Exits a function and optionally returns a value          |
| try       | Implements error handling for a block of code            |
+-----------+----------------------------------------------------------+
*/

/*
==============================================================
 JavaScript Data Types
==============================================================

Data Type    Example                 Description
-----------  ----------------------  ------------------------------
String       "Hello"                 Text
Number       25, 3.14                Numeric values
BigInt       1234567890123456789n    Large integers
Boolean      true                    True or false
Undefined    undefined               No assigned value
Null         null                    Empty or intentional absence
Object       { name: "John" }        Key-value collection
Array        [1, 2, 3]               Ordered collection
Function     function() {}           Reusable block of code
Symbol       Symbol("id")            Unique identifier

==============================================================
*/

/*
==============================================================
 JavaScript Array
==============================================================

Declaration
-----------
let arr = [];
let arr = [1, 2, 3];
let fruits = ["Apple", "Banana", "Orange"];

Common Syntax
-------------
arr.length                 Number of elements
arr[index]                 Access an element
arr.at(index)              Access element (supports negative index)
arr.unshift(value)         Add to beginning
arr.push(value)            Add to end
arr.shift()                Remove from beginning
arr.pop()                  Remove from end

Search
------
arr.includes(value)        Check if value exists
arr.indexOf(value)         First index of value
arr.lastIndexOf(value)     Last index of value
arr.find(fn)               First matching element
arr.findIndex(fn)          Index of first match

Modify
------
arr.splice(start, count)   Add/Remove elements
arr.slice(start, end)      Copy portion of array
arr.concat(arr2)           Merge arrays
arr.reverse()              Reverse array
arr.sort()                 Sort array
arr.fill(value)            Fill array with value

Iteration
---------
arr.forEach(fn)            Loop through array
arr.map(fn)                Transform elements
arr.filter(fn)             Filter elements
arr.reduce(fn, init)       Reduce to one value
arr.some(fn)               At least one matches
arr.every(fn)              All match

Conversion
----------
arr.join(", ")             Array → String
str.split(",")             String → Array

Examples
--------
arr.push(10)
arr.pop()
arr.includes(5)
arr.map(x => x * 2)
arr.filter(x => x > 5)
arr.reduce((sum, x) => sum + x, 0)

Time Complexity
---------------
Access by index            O(1)
Push / Pop                O(1)
Shift / Unshift           O(n)
Search (includes/indexOf) O(n)
Sort                      O(n log n)
Map / Filter / Reduce     O(n)

==============================================================

/*
==============================================================
 JavaScript Math Syntax
==============================================================

Math.abs(x)        Absolute value          Math.abs(-5)         // 5
Math.ceil(x)       Round up                Math.ceil(4.2)       // 5
Math.floor(x)      Round down              Math.floor(4.9)      // 4
Math.round(x)      Round to nearest        Math.round(4.5)      // 5
Math.trunc(x)      Remove decimal          Math.trunc(4.9)      // 4

Math.max(...)      Largest value           Math.max(1,5,3)      // 5
Math.min(...)      Smallest value          Math.min(1,5,3)      // 1

Math.pow(x, y)     x raised to y           Math.pow(2,3)        // 8
Math.sqrt(x)       Square root             Math.sqrt(25)        // 5
Math.cbrt(x)       Cube root               Math.cbrt(27)        // 3

Math.random()      Random (0–1)            Math.random()
Math.floor(Math.random() * 10)             // 0–9

Math.log(x)        Natural logarithm       Math.log(Math.E)     // 1
Math.log10(x)      Base-10 logarithm       Math.log10(1000)     // 3

Math.PI            π                       3.141592653589793
Math.E             Euler's number          2.718281828459045

==============================================================
*/

/*
==============================================================
 Big O Complexity
==============================================================

O(1)       Constant      Same execution time.             arr[5]
O(log n)   Logarithmic   Reduces work by half each step.  binarySearch(arr, target)
O(n)       Linear        One loop through the input.      for (const item of arr) {}
O(n log n) Linearithmic  Efficient sorting.               arr.sort((a, b) => a - b)
O(n²)      Quadratic     Two nested loops.                for (...) { for (...) {} }
O(n³)      Cubic         Three nested loops.              for (...) { for (...) { for (...) {} } }
O(2ⁿ)      Exponential   Doubles work each step.          fib(n - 1) + fib(n - 2)
O(n!)      Factorial     Every possible arrangement.      generatePermutations(arr)

Time  = How much work the algorithm does.
Space = How much extra memory it uses.

Fastest → O(1) → O(log n) → O(n) → O(n log n) →
            O(n²) → O(n³) → O(2ⁿ) → O(n!)

==============================================================
*/