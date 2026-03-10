<?php

echo index();

function index()
{
    // $text = "PHP is great . PHP is popular popular. I love PHP and programming.";
    // return topNWords($text, 2);

    // $nums = [2, 7, 11, 15];
    // $target = 17;
    // return twoSum_GPT($nums, $target);

    // $str = 'swiss';
    // return firstNonRepeatingChar($str);

    // $nums = [2, 3, 4, 1];
    // return findMissingNumber($nums);

    // return fizzBuzz(15);

    // return isPalindrome("level"); // true
    // return isPalindrome("hello"); // false

    //returns key
    // $search = array_search('Bob', ["Jimmy", "Jimmy"]);
    // $result = ($search) ? $search : -1;

    return giveMeSomething('is cooking');
}

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
// You are developing a small order processing module for a company.
// The system receives a list of orders. Each order contains:
//      order_id
//      customer
//      items (list of items purchased)
//      status

// Each item contains:
//      name
//      price
//      quantity
// Your task is to process the orders and generate a summary report.

// Tasks:
// Compute Order Totals - Add a new field total_amount to each order: total_amount = sum(price * quantity)
// Filter Orders - Create a function that returns only completed orders.

//      $orders = [
//      [
//           "order_id" => 1001,
//           "customer" => "Alice",
//           "status" => "completed",
//           "items" => [
//                ["name" => "Laptop", "price" => 50000, "quantity" => 1],
//                ["name" => "Mouse", "price" => 500, "quantity" => 2]
//           ]
//      ],
//      [
//           "order_id" => 1002,
//           "customer" => "Bob",
//           "status" => "pending",
//           "items" => [
//                ["name" => "Keyboard", "price" => 1500, "quantity" => 1],
//                ["name" => "Mouse", "price" => 500, "quantity" => 1]
//           ]
//      ],
//      [
//           "order_id" => 1003,
//           "customer" => "Alice",
//           "status" => "completed",
//           "items" => [
//                ["name" => "Monitor", "price" => 7000, "quantity" => 2]
//           ]
//      ]
// ];

function addTotalAmountOrders($orders) {
    $orders = array_map(function ($value)  {
        $status = $value['status'];

        $totalAmount = array_map(function ($item) {
            return $item['price'] * $item['quantity'];
        }, $value['items']);

        $map = array_merge($value, ['total_amount' => array_sum($totalAmount)]);
        return $map;

    }, $orders);

    return $orders;
}


function getCompletedOrders($orders) {
    return array_filter($orders, function ($value) {
        return $value['status'] == 'completed';
    });
}

function totalAmountSpentPerCustomer($orders){

    $totalSpent = [];
    foreach($orders as $key => $value){

        $totalAmount = array_map(function ($item) {
            return $item['price'] * $item['quantity'];
        }, $value['items']);

        if(array_key_exists($value['customer'], $totalSpent)){
            $totalAmount = array_sum($totalAmount) + $totalSpent[$value['customer']];
            $totalSpent = array_merge($totalSpent, [
                    $value['customer'] => $totalAmount
            ]);
        }else{
            $totalSpent = array_merge($totalSpent, [
                    $value['customer'] => array_sum($totalAmount)
            ]);
        }
    }

    return $totalSpent;

}

function mostSoldItem($orders){

    $completedOrders = getCompletedOrders($orders);
    $soldItems = [];
    foreach ($completedOrders as $key => $value) {
        foreach ($value['items'] as $key => $item) {
            if(array_key_exists($item['name'], $soldItems)){
                    $totalQty = $item['quantity'] + $soldItems[$item['name']];
                    $soldItems = array_merge($soldItems, [
                        $item['name'] => $totalQty
                    ]);
            }else{
                    $soldItems = array_merge($soldItems, [
                        $item['name'] => $item['quantity']
                    ]);
            }
        }
    }

    $mostSoldItem = '';
    $maxQty = 0;
    foreach($soldItems as $key => $value){
        if($value > $maxQty){
            $maxQty = $value;
            $mostSoldItem = $key;
        }
    }
    return [$mostSoldItem => $maxQty];
}

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////


function giveMeSomething($a) {
    return "something ". $a;
}

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////

function isPalindrome($str) {
    $str = strtolower($str);
    return $str === strrev($str) ? 'yes' : 'no';
}

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
// Coding Challenge: FizzBuzz Variant
// Write a PHP function that prints numbers from 1 to N, but:
// - If the number is divisible by 3, print "Fizz" instead of the number
// - If the number is divisible by 5, print "Buzz" instead of the number
// - If the number is divisible by both 3 and 5, print "FizzBuzz"
// - Otherwise, print the number itself
// Use the modulus operator (%) to check divisibility.

function fizzBuzz($N) {
    for ($i = 1; $i <= $N; $i++) {
        if ($i % 3 == 0 && $i % 5 == 0) {
            echo "$i is divisible by 3 and 5. result: ".($i % 3).", ".($i % 5)." <br>";
        } elseif ($i % 3 == 0) {
            echo "$i is divisible 3. result: ".($i % 3)." <br>";
        } elseif ($i % 5 == 0) {
            echo "$i is divisible 5. result: ".($i % 5)." <br>";
        } else {
            echo "$i is  not divisible by 3 and 5. result: ".($i % 3).", ".($i % 5)." <br>";
        }
    }
}

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
// Coding Challenge: Find the Missing Number
// You are given an array containing numbers from 1 to N, but one number is missing.
// Write a PHP function that returns the missing number.
// Requirements:
// - The array is unsorted
// - Numbers range from 1 to N
// - Exactly one number is missing
// example: $nums = [1,2,4,5];
// output: 3

function findMissingNumber($nums) {
    sort($nums);

    for ($i = 0; $i < count($nums); $i++){
        if($nums[$i + 1] != ($nums[$i] + 1)){
            return $nums[$i] + 1;
        }
    }
    return $nums;
}

function findMissingNumber_GPT($nums) {
    sort($nums);

    for ($i = 0; $i < count($nums) - 1; $i++) {
        if ($nums[$i + 1] != $nums[$i] + 1) {
            return $nums[$i] + 1;
        }
    }

    return null;
}


//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
// Coding Challenge: First Non-Repeating Character
// Write a PHP function that takes a string and returns the first character that does not repeat anywhere in the string.
// If all characters repeat, return null.
// for example: $str = "swiss"; return "w";

function firstNonRepeatingChar($str) {
    $strSplit = str_split($str);
    $countVal = array_count_values($strSplit);
    $filter = array_filter($countVal, function ($value) {
        if($value == 1){
            return $value;
        }
    });
    return array_key_first($filter);
}

function firstNonRepeatingChar_GPT($str) {
    $chars = str_split($str);
    $count = array_count_values($chars);

    foreach ($chars as $char) {
        if ($count[$char] == 1) {
            return $char;
        }
    }

    return null;
}

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////

// Coding Challenge: Two Sum
// Write a PHP function that takes:
// - an array of integers
// - a target number
// Return the indices of the two numbers that add up to the target.
// Assume:
// - There is exactly one solution
// - You cannot use the same element twice

// my answer
function twoSum($nums, $target) {
    $count = count($nums);
    $result = [];
    for($i = 0; $i < $count; $i++){
        $firstNumber = $nums[$i];
        foreach($nums as $key => $secondNumber){
            if($i != $key && ($firstNumber +  $secondNumber) == $target){
                    return [$i, $key];
            }
        }
    }
    return $result;
}

// gpt answer
function twoSum_GPT($nums, $target) {
    $count = count($nums);

    for ($i = 0; $i < $count; $i++) {
        for ($j = $i + 1; $j < $count; $j++) {
            if ($nums[$i] + $nums[$j] == $target) {
                    return [$i, $j];
            }
        }
    }

    return [];
}

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
function topNWords($text, $n) {
    $text = preg_replace("/[^\w\s]/", "", $text);
    $text = strtolower($text);

    $words = explode(' ', $text);

    $frequency = array_count_values($words);

    uksort($frequency, function ($a, $b) use ($frequency) {
        if ($frequency[$a] == $frequency[$b]) {
            return strcmp($a, $b);
        }
        return $frequency[$b] - $frequency[$a];
    });

    return array_slice($frequency, 0, $n, true);
}

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
// function that i can use in coding challenge

function tips() {

    $array = ["a","b","a","c"];
    return array_count_values($array);
    // result:
    // [
    // "a" => 2,
    // "b" => 1,
    // "c" => 1
    // ]

    return array_filter([1,2,3,4], function($x){
        return $x % 2 == 0;
    });
    // result: [2,4]

    return array_map(function($x){
        return $x * 2;
    }, [1,2,3]);
    // result: [2,4,6]

    return array_slice([1,2,3,4],0,2);
    // result: [1,2]

    return strlen("hello"); // 5

    sort([1,2,3,4]); // Sort ascending.
    rsort([1,2,3,4]); // Sort descending.
    ksort([1,2,3,4]); // Sort by keys.
    
    //custom value sorting
    // $a first if negative
    // $b first if positive
    // keep their order if: equal or 0
    // shortcut = usort($array, fn($a,$b) => $a <=> $b);
    // echo 3 <=> 5;  -1  (3 < 5)
    // echo 5 <=> 5;  0   (5 == 5)
    // echo 7 <=> 5;  1   (7 > 5)
    usort($array, function($a,$b){
        if($a == $b){
            return 0;
        }else{
            return $a - $b;
        }
    });

    strcmp('a', 'b'); // -1;
    strcmp('c', 'b'); // 1;
    strcmp('b', 'b'); // 0;

    // Get column of names from a recordset:
    array_column($employees,'name');


    // range(start, end, step)
    range(1, 10, 2); // [1,3,5,7,9] Explanation: Start at 1 → 1+2=3 → 3+2=5 → … stop ≤ 10
    range(10, 1, -2); // [10,8,6,4,2]

    // | `strlen()`     | Returns length of string               | `strlen("hello") → 5`                    |
    // | `strtoupper()` | Convert to uppercase                   | `strtoupper("hi") → "HI"`                |
    // | `strtolower()` | Convert to lowercase                   | `strtolower("HI") → "hi"`                |
    // | `ucfirst()`    | Uppercase first character              | `ucfirst("hello") → "Hello"`             |
    // | `ucwords()`    | Uppercase first character of each word | `ucwords("hello world") → "Hello World"` |
    // | `trim()`       | Remove whitespace at both ends         | `trim(" hello ") → "hello"`              |
    // | `ltrim()`      | Remove left whitespace                 | `ltrim(" hello") → "hello"`              |
    // | `rtrim()`      | Remove right whitespace                | `rtrim("hello ") → "hello"`              |

    // | `strpos()`                | Position of first occurrence       | `strpos("hello","e") → 1`                                |
    // | `strrpos()`               | Last occurrence                    | `strrpos("hello","l") → 3`                               |
    // | `stripos()`               | Case-insensitive position          | `stripos("Hello","h") → 0`                               |
    // | `str_replace()`           | Replace all occurrences            | `str_replace("world","PHP","hello world") → "hello PHP"` |
    // | `substr()`                | Extract substring                  | `substr("hello",1,3) → "ell"`                            |
    // | `str_repeat()`            | Repeat string                      | `str_repeat("ha",3) → "hahaha"`                          |
    // | `str_contains()` (PHP 8+) | Check if string contains substring | `str_contains("hello","ell") → true`                     |


    // | `explode()`            | Split string into array      | `explode(" ","hello world") → ["hello","world"]` |
    // | `implode()` / `join()` | Join array into string       | `implode("-",["a","b","c"]) → "a-b-c"`           |
    // | `str_split()`          | Split string into characters | `str_split("abc") → ["a","b","c"]`               |

    $a1=array("a"=>"red","b"=>"green","c"=>"blue","d"=>"yellow");
    $a2=array("a"=>"red","b"=>"green","c"=>"blue");

    // Compare the keys and values of two arrays, and return the differences:
    return array_diff_assoc($a1,$a2);

    // Compare the keys of two arrays, and return the differences:
    return array_diff_key($a1,$a2);

    // Compare the values of two arrays, and return the differences:
    return array_diff($a1,$a2);

    // Fill an array with values:
    // array_fill(index, number, value)
    $a1 = array_fill(0,4,"blue");

    // Fill an array with values, specifying keys:
    $a1 = array("a"=>"red","b"=>"green","c"=>"blue","d"=>"yellow", "f" => ["a" => "nested array"]);
    $a2 = array_fill_keys(['e'],"blue");
    $merge = array_merge($a2, $a1);
    ksort($merge);
    return $merge;

    abs($value['timestamp'] - $item['timestamp']);
    abs(6.7); // 6.7
    abs(-6.7); // 6.7
    abs(-3); // 3
    abs(3); // 3

}

?>