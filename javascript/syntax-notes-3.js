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

console.log(isValid_claude("()[]{}"));  // true
// console.log(isValid("(]"));      // false
// console.log(isValid("([)]"));    // false
// console.log(isValid("{[]}"));    // true
// console.log(isValid(""));        // true
// console.log(isValid("())"));     // false
// console.log(isValid("))(("));    // false


// -------------------
function sample() {
    let string = 'abcd';
    return string[0];
}


// console.log(isValid('()[]{}')); // t
// console.log(isValid('(]')); // f
// console.log(isValid('([)]')); // f
// console.log(isValid('{[]}')); // t
// console.log(isValid('())')); // t
// console.log(isValid('))((')); // t
