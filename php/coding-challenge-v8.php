<?php

echo index();

function index()
{
    $param = ["base" => "GBP"];
    $query = http_build_query($param);
    $endpoint = "https://api.frankfurter.dev/v2/rates?".$query;
    $data = json_decode(file_get_contents($endpoint), true);
}

function dd($data)
{
    echo '<pre>';
    print_r($data);
    echo '</pre>';
    die();
}