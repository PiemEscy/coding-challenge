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

function mergeIntervals(intervals) {
    let string = 'abcd';
    return string[0];
}

console.log(mergeIntervals([[1,4], [2,3]])); [[1,5]]




// -------------------
function sample() {
    let string = 'abcd';
    return string[0];
}


