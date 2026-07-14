// Problem 7 (Easy–Medium): Balanced Brackets
// Given a string s containing only the characters (, ), {, }, [, and ], write a function isValid(s) that determines whether the brackets are balanced — meaning every opening bracket has a matching closing bracket of the same type, in the correct order.
// Example:
// Input: "()[]{}"
// Output: true
// Input: "(]"
// Output: false
// Input: "([)]"
// Output: false   (wrong order — brackets cross over each other)
// Input: "{[]}"
// Output: true
// Constraints: 0 ≤ length of s ≤ 10^4

function isValid(s) {
    let pairLeft = ['(', '[', '{'];
    let pairRight = [')', ']', '}'];

    for(let i = 0; i < s.length; i++){
        const element = s[i];
        const nextElement = s[i + 1];
        const prevElement = s[i - 1];
        const pairedElement = s[(s.length - 1) - i];

        if(pairLeft.includes(element)){
            let leftIndex = pairLeft.indexOf(element);
            if(pairRight[leftIndex] === nextElement ||  pairRight[leftIndex] === pairedElement){
                s.replace(element, "");
                s.replace(pairRight[leftIndex], "");
            }else{
                return false;
            }

        }else{
            let rightIndex = pairRight.indexOf(element); 
            if(pairLeft[rightIndex] === prevElement || pairLeft[rightIndex] === pairedElement){
                s.replace(element, "");
                s.replace(pairLeft[rightIndex], "");
            }else{
                return false;
            }
        }
    }

    return true;
}

function isValid_claude(s) {
    const stack = [];
    const pairs = { ')': '(', ']': '[', '}': '{' };
    

    for (const char of s) {
        if (char === '(' || char === '[' || char === '{') {
            // Opening bracket — just remember it by pushing onto the stack
            stack.push(char);
        } else {
            // Closing bracket — check it against whatever is MOST RECENTLY opened
            const lastOpened = stack.pop(); // removes and returns the top of the stack
            
            if (lastOpened !== pairs[char]) {
                return false; // doesn't match, or stack was already empty (pop returns undefined)
            }
        }
    }

    // If anything is still on the stack, it means some bracket was opened but never closed
    return stack.length === 0;
}

// Problem 11 (Easy–Medium): Palindrome Check with Twist
// Given a string s containing only lowercase letters, determine if it can be rearranged to form a palindrome.
// Write a function canFormPalindrome(s) that returns true or false — you're not rearranging it yourself, just checking if some rearrangement could be a palindrome.
// Example:
// Input: "civic"
// Output: true   (already a palindrome)

// Input: "ivicc"
// Output: true   (can be rearranged to "civic")

// Input: "hello"
// Output: false  (no rearrangement of "hello" can form a palindrome)

// Input: "aabb"
// Output: true   (can be rearranged to "abba")
// Constraints: 1 ≤ s.length ≤ 10^5

function canFormPalindrome(s) {
    let hasMid = s.length % 2 !== 0;
    let count = {};

    for (const ch of s){
        count[ch] = (count[ch] || 0) + 1;
    }
    
    let isPal = Object.values(count).filter((x) => x % 2 !== 0).length;
    
    if(hasMid){
        return isPal !== 1 ? false : true;
    }else{
        return isPal ? false : true;
    }
}

function canFormPalindrome_claude(s) {
    const count = {};

    for (const ch of s) {
        count[ch] = (count[ch] || 0) + 1;
    }

    let oddCount = 0;
    for (const val of Object.values(count)) {
        if (val % 2 !== 0) {
            oddCount++;
        }
    }

    // A palindrome allows AT MOST one character with an odd count
    // (that lone character sits in the middle if the string length is odd)
    return oddCount <= 1;
}

// Problem 12 (Medium): Merge Overlapping Intervals
// Given an array of intervals intervals, where each interval is [start, end], merge all overlapping intervals and return an array of the non-overlapping intervals that cover all the input intervals.
// Write a function mergeIntervals(intervals).
// Example:
// Input: [[1,3], [2,6], [8,10], [15,18]]
// Output: [[1,6], [8,10], [15,18]]
// // [1,3] and [2,6] overlap (3 >= 2), merge into [1,6]

// Input: [[1,4], [4,5]]
// Output: [[1,5]]
// // [1,4] and [4,5] touch at 4 — considered overlapping, merge into [1,5]

// Input: [[1,4], [2,3]]
// Output: [[1,4]]
// // [2,3] is fully contained within [1,4]
// Constraints: 1 ≤ intervals.length ≤ 10^4, intervals are NOT guaranteed to be sorted by start

// bug
function mergeIntervals(intervals) {

    let result = [];
    let arrInterval = [];
    let lastEnd = 0;
    
    for (let i = 0; i < intervals.length; i++) {

        // [1,3], [2,6], [8,10], [15,18]
        const element = intervals[i];
        let start = element[0]; // 1
        let end = element[1]; // 3
        if(start > end){
            start = element[1];
            end = element[0];
        }
        
        // 0 > 3 (f)

        if(lastEnd >= end) {
            continue;
        }

        for (let j = i; j < intervals.length - i; j++) {

            const nextEl = intervals[j];

                let nextStart = nextEl[0];
                let nextEnd = nextEl[1];
                if(nextStart > nextEnd){
                    nextStart = nextEl[1];
                    nextEnd = nextEl[0];
                }
                    // 3 > 2 (t) 
                if(end >= nextStart) {
                    if(nextStart < start){
                        start = nextStart;
                    }
                    if(nextEnd > end){
                        end = nextEnd;
                    }
                }
        }


        lastEnd = end;
        result.push([start, end]);
    }

    return result;
}

function mergeIntervals_claude(intervals) {
    if (intervals.length <= 1) return intervals;

    // Normalize each interval (in case start > end) and sort by start value
    const normalized = intervals.map(([a, b]) => a <= b ? [a, b] : [b, a]);
    normalized.sort((x, y) => x[0] - y[0]);
    const result = [normalized[0]];

    for (let i = 1; i < normalized.length; i++) {
        const [start, end] = normalized[i];
        const last = result[result.length - 1]; // always compare only to the LAST merged interval

        if (start <= last[1]) {
            // overlaps (or touches) — merge into the last interval
            last[1] = Math.max(last[1], end);
        } else {
            // no overlap — push as a brand new separate interval
            result.push([start, end]);
        }
    }

    // return result;
}



// console.log(mergeIntervals_claude([[1,3], [2,6], [8,10], [15,18]])); // [[1,6], [8,10], [15,18]]
// console.log(mergeIntervals([[4,1], [2,3]])); // [[1,4]]
// console.log(mergeIntervals([[1,4], [4,5]])); // [[1,5]]
// console.log(mergeIntervals([[1,4], [0,2], [3,5]])); // [[0,5]]
// console.log(mergeIntervals([[1,10], [2,3], [4,5], [6,7]])); // [[1,10]]
// console.log(mergeIntervals([[1,4]])); // [[1,4]]
// console.log(mergeIntervals([[1,2], [3,4], [5,6]])); // [[1,2], [3,4], [5,6]]
console.log(mergeIntervals_claude([[8,10], [1,3], [2,6], [15,18], [4,5]])); // [[1,6], [8,10], [15,18]]


// 1, 3, 2, 6, 8, 10, 15, 18
// 1, 2, 3, 6, 8, 10, 15, 18



// -------------------
// function sample() {
//     let string = [];
//     for (let index = 0; index < 5; index++) {
//         string.push('wew');
//     }
//     return string;
// }

// console.log(sample());



