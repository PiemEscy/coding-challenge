<?php

    function index(){
        return 'hello world: challenge v6';
    }

    echo '<pre>';
    print_r(index());
    echo '</pre>';

// PHP Coding Challenge #5 – Payment Transaction Validator
// Scenario

// You are building a payment processing system.

// Each transaction contains:

// transaction_id

// user_id

// amount

// timestamp

// However, due to a system bug, duplicate transactions may appear.

// A duplicate transaction is defined as:

// Same user_id AND same amount occurring within 60 seconds.

// Your task is to detect and separate duplicate transactions.

// Sample Input
// $transactions = [
//     ['transaction_id' => 1, 'user_id' => 10, 'amount' => 100, 'timestamp' => 1700000000],
//     ['transaction_id' => 2, 'user_id' => 10, 'amount' => 100, 'timestamp' => 1700000030], // duplicate
//     ['transaction_id' => 3, 'user_id' => 12, 'amount' => 200, 'timestamp' => 1700000100],
//     ['transaction_id' => 4, 'user_id' => 10, 'amount' => 100, 'timestamp' => 1700001000],
//     ['transaction_id' => 5, 'user_id' => 12, 'amount' => 200, 'timestamp' => 1700000150], // duplicate
// ];
// Rules

// A transaction is a duplicate if:

// same user_id
// same amount
// timestamp difference <= 60 seconds

// Only the first occurrence is valid.

// Later ones are duplicates.

// Your Task

// Create a function:

// function validateTransactions($transactions)

// Return:

// [
//     'valid_transactions' => [...],
//     'duplicate_transactions' => [...]
// ]
// Expected Output
// Valid Transactions
// [
//     ['transaction_id' => 1, 'user_id' => 10, 'amount' => 100, 'timestamp' => 1700000000],
//     ['transaction_id' => 3, 'user_id' => 12, 'amount' => 200, 'timestamp' => 1700000100],
//     ['transaction_id' => 4, 'user_id' => 10, 'amount' => 100, 'timestamp' => 1700001000],
// ]
// Duplicate Transactions
// [
//     ['transaction_id' => 2, 'user_id' => 10, 'amount' => 100, 'timestamp' => 1700000030],
//     ['transaction_id' => 5, 'user_id' => 12, 'amount' => 200, 'timestamp' => 1700000150],
// ]
// Important Notes

// Example:

// Transaction 1
// user:10 amount:100 time:1700000000

// Transaction 2:

// user:10 amount:100 time:1700000030
// difference = 30 seconds
// → duplicate
// Bonus (Real Interview Twist)

// Also return:

// Total valid amount processed

// Example:

// 'total_valid_amount' => 400
// Skills This Tests

// This challenge evaluates:

// hashing/grouping logic

// timestamp comparison

// efficient lookup structures

// real backend fraud/duplicate detection logic

// Interview Tip

// Many candidates fail this because they:

// compare every transaction with every other transaction

// creating O(n²) logic.

// A good solution should aim for:

// O(n)

// When you're done, send your solution and I'll review it like a real coding interviewer again (logic, efficiency, and improvements).

?>


