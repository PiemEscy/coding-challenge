<?php

    function index(){
        $transactions = [
            ['transaction_id' => 1, 'user_id' => 10, 'amount' => 100, 'timestamp' => 1700000000],
            ['transaction_id' => 2, 'user_id' => 10, 'amount' => 100, 'timestamp' => 1700000030], // duplicate
            ['transaction_id' => 3, 'user_id' => 12, 'amount' => 200, 'timestamp' => 1700000100],
            ['transaction_id' => 4, 'user_id' => 10, 'amount' => 100, 'timestamp' => 1700001000],
            ['transaction_id' => 5, 'user_id' => 12, 'amount' => 200, 'timestamp' => 1700000150], // duplicate
        ];

        return validateTransactions($transactions);
    }

    function validateTransactions($transactions){

        $valid_transactions = [];
        $duplicate_transactions = [];

        foreach($transactions as $value){
            if(count($transactions) > 0){
                $valid_transactions_check = array_filter($valid_transactions, function ($item) use($value) {
                    $stamp_compare = ($value['timestamp'] > $item['timestamp']) ? $value['timestamp'] - $item['timestamp'] : $item['timestamp'] - $value['timestamp'];
                    if($item['user_id'] == $value['user_id'] && $item['amount'] == $value['amount'] && $stamp_compare <= 60){
                        return $item;
                    } 
                });

                if(count($valid_transactions_check) > 0){
                    $duplicate_transactions[] = $value;
                }else{
                    $valid_transactions[] = $value;
                }
            }else{
                $valid_transactions[] = $value;
            }
        }
    
        return [
            'valid_transactions' => $valid_transactions,
            'duplicate_transactions' => $duplicate_transactions,
            'total_valid_amount' => array_sum(array_column($valid_transactions, 'amount'))
        ];
    }

    function validateTransactions_GPT($transactions){

        $valid_transactions = [];
        $duplicate_transactions = [];

        foreach($transactions as $value){

            $valid_transactions_check = array_filter($valid_transactions, function ($item) use($value) {

                $stamp_compare = abs($value['timestamp'] - $item['timestamp']);

                if(
                    $item['user_id'] == $value['user_id'] &&
                    $item['amount'] == $value['amount'] &&
                    $stamp_compare <= 60
                ){
                    return true;
                }

                return false;
            });

            if(count($valid_transactions_check) > 0){
                $duplicate_transactions[] = $value;
            }else{
                $valid_transactions[] = $value;
            }

        }

        return [
            'valid_transactions' => $valid_transactions,
            'duplicate_transactions' => $duplicate_transactions,
            'total_valid_amount' => array_sum(array_column($valid_transactions, 'amount'))
        ];
    }

    // optimized O(n)
    function validateTransactions_GPT2($transactions)
    {
        $valid_transactions = [];
        $duplicate_transactions = [];

        // lookup table
        $transaction_map = [];

        foreach ($transactions as $transaction) {

            $key = $transaction['user_id'] . '-' . $transaction['amount'];

            if (isset($transaction_map[$key])) {

                $time_diff = $transaction['timestamp'] - $transaction_map[$key];

                if ($time_diff <= 60) {
                    $duplicate_transactions[] = $transaction;
                    continue;
                }
            }

            // valid transaction
            $valid_transactions[] = $transaction;

            // update latest timestamp
            $transaction_map[$key] = $transaction['timestamp'];
        }

        return [
            'valid_transactions' => $valid_transactions,
            'duplicate_transactions' => $duplicate_transactions,
            'total_valid_amount' => array_sum(array_column($valid_transactions, 'amount'))
        ];
    }

    echo '<pre>';
    print_r(index());
    echo '</pre>';

    //////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////
    // PHP Coding Challenge #6 – Payment Transaction Validator
    //////////////////////////////////////////////////////////////////////////////
    // >>>> Scenario
    // You are building a payment processing system.
    // - Each transaction contains:
    // - transaction_id
    // - user_id
    // - amount
    // - timestamp
    // However, due to a system bug, duplicate transactions may appear.
    // A duplicate transaction is defined as:
    // Same user_id AND same amount occurring within 60 seconds.
    // Your task is to detect and separate duplicate transactions.

    // >>>> Sample Input
    // $transactions = [
    //     ['transaction_id' => 1, 'user_id' => 10, 'amount' => 100, 'timestamp' => 1700000000],
    //     ['transaction_id' => 2, 'user_id' => 10, 'amount' => 100, 'timestamp' => 1700000030], // duplicate
    //     ['transaction_id' => 3, 'user_id' => 12, 'amount' => 200, 'timestamp' => 1700000100],
    //     ['transaction_id' => 4, 'user_id' => 10, 'amount' => 100, 'timestamp' => 1700001000],
    //     ['transaction_id' => 5, 'user_id' => 12, 'amount' => 200, 'timestamp' => 1700000150], // duplicate
    // ];

    // >>>> Rules
    // A transaction is a duplicate if:
    // - same user_id
    // - same amount
    // - timestamp difference <= 60 seconds
    // - Only the first occurrence is valid.
    // - Later ones are duplicates.

    // >>>> Your Task
    // Create a function: validateTransactions($transactions)

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

?>


