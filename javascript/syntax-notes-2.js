

// Problem 1 (Easy–Medium): String Manipulation
// Write a function compressString(s) that performs basic run-length encoding on a string.
// Replace consecutive repeated characters with the character followed by the count.
// If the compressed string is not shorter than the original, return the original string unchanged.
// Only uppercase/lowercase letters are given, no spaces or digits.
// Example:
// Input: "aaabbbccd"
// Output: "a3b3c2d1"
// Input: "abcd"
// Output: "abcd"   (compressed "a1b1c1d1" is longer, so return original)

// BUG
function compressString(s) {
    const arrayed = s.split("");
    const unique = arrayed.filter((value, index, array) => array.indexOf(value) === index);
    let finalString = '';
    let getCounts = [];

    for (let i = 0; i < unique.length; i++) {
        const element = unique[i];
        const stringCount = arrayed.filter((x) => x === element).length;
        getCounts.push(stringCount);
        finalString += element + "" + stringCount;
    }
    const isMultiple = getCounts.filter((x) => x > 1).length;
    return (isMultiple) ? finalString : finalString.replaceAll("1", "");
}

function compressString_claude(s) {
    if (s.length === 0) return s;
    let finalString = '';
    let count = 1;
    for (let i = 1; i <= s.length; i++) {
        if (i < s.length && s[i] === s[i - 1]) {
            // still in a run of the same character, keep counting
            count++;
        } else {
            // run has ended (or we hit the end of string), flush it
            finalString += s[i - 1] + count;
            count = 1;
        }
    }
    return finalString.length < s.length ? finalString : s;
}


// Problem 2 (Medium): Array Logic
// Given an array of integers arr and an integer k, find the maximum sum of any contiguous subarray of size exactly k.
// Write a function maxSubarraySum(arr, k) that returns this maximum sum.
// Example:
// Input: arr = [2, 1, 5, 1, 3, 2], k = 3
// Output: 9   (subarray [5,1,3])
// Input: arr = [2, 3, 4, 1, 5], k = 2
// Output: 7   (subarray [3,4])
// Constraints: 1 ≤ k ≤ length of arr ≤ 10^5


//  BUG
function maxSubarraySum(arr, k) {
    let finalSum = 0;
    for (let i = 0; i < arr.length; i++) {
        let maxSum = 0;
        for (let j = 0; j < k; j++) {
            maxSum += arr[i + j] ?? 0;
        }
        if (maxSum > finalSum) {
            finalSum = maxSum;
        }
    }
    return finalSum;
}

function maxSubarraySum_claude(arr, k) {
    let finalSum = -Infinity;
    for (let i = 0; i <= arr.length - k; i++) {  // stop once k elements can still fit
        let windowSum = 0;
        for (let j = 0; j < k; j++) {
            windowSum += arr[i + j];  // no need for ?? 0 now — always in bounds
        }
        if (windowSum > finalSum) {
            finalSum = windowSum;
        }
    }
    return finalSum;
}


// Problem 3 (Medium): Array Rotation
// Given an array arr and a non-negative integer d, rotate the array to the left by d positions.
// Write a function rotateLeft(arr, d) that returns the rotated array.
// Example:
// Input: arr = [1, 2, 3, 4, 5], d = 2
// Output: [3, 4, 5, 1, 2]
// Input: arr = [1, 2, 3], d = 5
// Output: [3, 1, 2]   (d can be larger than array length)
// Input: arr = [10, 20, 30], d = 0
// Output: [10, 20, 30]   (no rotation)
// Input: arr = [10, 20, 30], d = 3
// Output: [10, 20, 30]   (rotating by exactly the array length brings it back to itself)
// Input: arr = [10, 20, 30], d = 7
// Output: [20, 30, 10]   (d is way bigger than arr.length — think about what actually matters here)
// Constraints: 1 ≤ arr.length ≤ 10^5, 0 ≤ d ≤ 10^9

// correct
function rotateLeft(arr, d) {
    d = d % arr.length;
    let forRotate = arr.slice(0, d);
    let getRemaining = arr.slice(d);
    return [...getRemaining, ...forRotate];
}


// Problem 4 (Easy–Medium): Anagram Check with a Twist
// Write a function canBeAnagram(str1, str2) that determines whether str2 can be formed by rearranging the characters of str1 after removing at most one character from str1.
// In other words: check if str1 and str2 are anagrams of each other, allowing str1 to have exactly one extra character that gets discarded.
// Example:
// Input: str1 = "listen", str2 = "silent"
// Output: true   (already anagrams, 0 removals needed)
// 
// Input: str1 = "listenx", str2 = "silent"
// Output: true   ("listenx" minus the 'x' is an anagram of "silent")
// 
// Input: str1 = "hello", str2 = "world"
// Output: false  (too many mismatched characters even after removing 1)

// bug and corrected
function canBeAnagram(str1, str2) {

    if (str1.length !== str2.length && str1.length !== str2.length + 1) {
        return false;
    }

    let newStr1 = str1;
    let newStr2 = str2;

    for (let i = 0; i < str1.length; i++) {
        newStr2 = newStr2.replace(str1[i], "");
    }

    for (let j = 0; j < str2.length; j++) {
        newStr1 = newStr1.replace(str2[j], "");
    }


    if (newStr2.length > 1 || newStr1.length > 1 || newStr1.length + newStr2.length > 1) {
        return false;
    }

    return true;
}

function canBeAnagram_clade(str1, str2) {
    // Length check first: str1 can only be 0 or 1 characters longer than str2
    if (str1.length !== str2.length && str1.length !== str2.length + 1) {
        return false;
    }

    const count = new Array(26).fill(0);

    return "b".charCodeAt(0) - 97;

    // Count each letter in str1 as +1
    for (const ch of str1) {
        count[ch.charCodeAt(0) - 97]++;
    }

    // Count each letter in str2 as -1 (cancels out matching letters from str1)
    for (const ch of str2) {
        count[ch.charCodeAt(0) - 97]--;
    }

    let leftover = 0;
    for (const c of count) {
        if (c < 0) return false;   // str2 needed a letter str1 didn't have enough of
        leftover += c;             // total letters left over in str1 after cancelling
    }

    // leftover must be exactly the length difference (0 or 1)
    return leftover === str1.length - str2.length;
}


// Problem 5 (Easy–Medium): Binary Search Variant
// Given a sorted array arr (ascending, no duplicates) that has been rotated at some unknown pivot, and a target value, write a function searchRotated(arr, target) that returns the index of target if it exists, or -1 if it doesn't.
// You must do this in O(log n) time — a plain linear scan won't cut it here.
// Example:
// Input: arr = [4, 5, 6, 7, 0, 1, 2], target = 0
// Output: 4
// Input: arr = [4, 5, 6, 7, 0, 1, 2], target = 3
// Output: -1
// Input: arr = [1], target = 1
// Output: 0
// Constraints: 1 ≤ arr.length ≤ 10^4, all values distinct

// ongoing
function searchRotated(arr, target) {

    let left = 0;
    let right = arr.length - 1;
    let mid = Math.floor(arr.length / 2);

    while (mid >= left && mid <= right) {
        if (arr[mid] === target) return arr[mid];
        console.log(arr[mid]);
        
        if (target < arr[mid]) {
            mid--;
        }

        if (target > arr[mid]) {
            mid++;
        }
    }

    return -1;
}



// -------------------
function sample() {
    let string = 'abcd';
    return string[0];
}


console.log(searchRotated([4, 5, 6, 7, 0, 1, 2], 0)); // 4
// console.log(searchRotated([4, 5, 6, 7, 0, 1, 2], 3)); // -1
// console.log(searchRotated([1], 1)); // 0
