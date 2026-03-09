<?php

function index()
{
    // return computeFinalStock();
    return detectNegativeInventory();
    // return findLowStockProducts();
    // return findHighestStockProduct();
}

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
// PHP Coding Challenge #2 — Inventory Stock Manager
//////////////////////////////////////////////////////////////////////////////

// >>>> TASK 1 - Compute Final Stock
// Calculate the remaining stock for each product.
// Formula: Stock = IN - OUT
// Expected Output: [Laptop : 6, Mouse : 35, Keyboard : 15, Monitor : 20]

// >>>> TASK 2 - Detect Negative Inventory
// If an OUT transaction makes the stock below zero, flag it as invalid transaction.
// Example scenario: ["product"=>"Laptop","type"=>"OUT","quantity"=>20]
// Expected behavior: Error: Laptop stock cannot go negative

// >>>> TASK 3 - Find Low Stock Products
// Display products with stock below 10.
// Expected Output: Low Stock Products: Laptop : 6

// >>>> TASK 4 - Find Product With Highest Stock
// Expected Output: Highest Stock Product: Mouse (35)

// >>>> Requirements
// - Your code must:
// - Use associative arrays
// - Use loops
// - Use clean logic
// - Avoid using frameworks
// - Be written in pure PHP

function inventoryStockManagerTransactions() {
   return [
        ["product" => "Laptop", "type" => "IN", "quantity" => 10],
        ["product" => "Mouse", "type" => "IN", "quantity" => 50],
        ["product" => "Keyboard", "type" => "IN", "quantity" => 30],
        ["product" => "Laptop", "type" => "OUT", "quantity" => 11],
        ["product" => "Mouse", "type" => "OUT", "quantity" => 10],
        ["product" => "Mouse", "type" => "OUT", "quantity" => 5],
        ["product" => "Keyboard", "type" => "OUT", "quantity" => 15],
        ["product" => "Monitor", "type" => "IN", "quantity" => 20],
    ];
}

function computeFinalStock() {
    $transactions = inventoryStockManagerTransactions();
    $result = [];
    foreach($transactions as $value){
        $quantity = ($value['type'] == 'IN') ? $value['quantity'] : $value['quantity'] * -1;
        if(array_key_exists($value['product'], $result)){
            $totalQty = $result[$value['product']] + $quantity;
            $result[$value['product']] = $totalQty;
        }else{
            $result[$value['product']] = $quantity;
        }
    }

    return $result;
}

function detectNegativeInventory()
{
    $transactions = inventoryStockManagerTransactions();
    $stock = [];
    $errors = [];

    foreach ($transactions as $transaction) {
        $product = $transaction['product'];
        $qty = $transaction['quantity'];

        if (!isset($stock[$product])) {
            $stock[$product] = 0;
        }

        if ($transaction['type'] === 'IN') {
            $stock[$product] += $qty;
        } else {
            $stock[$product] -= $qty;

            if ($stock[$product] < 0) {
                $errors[] = "Error: {$product} stock cannot go negative ({$stock[$product]})";
            }
        }
    }

    return $errors;
}

function findLowStockProducts() {
    $finalStock = computeFinalStock();
    $result = [];
    $minQty = 10;
    foreach($finalStock as $key => $value) {
        if($value < $minQty){
            $result[$key] = $value;
        }
    }
    return ["Low Stock Products" => $result];
}

function findHighestStockProduct() {
    $finalStock = computeFinalStock();
    $result = "Highest Stock Product: None";
    $maxQty = PHP_INT_MIN;
    foreach($finalStock as $key => $value) {
        if($value > $maxQty){
            $maxQty = $value;
            $result = "Highest Stock Product: $key ($value)";
        }
    }
    return $result;
}


echo '<pre>';
print_r(index());
echo '</pre>';
