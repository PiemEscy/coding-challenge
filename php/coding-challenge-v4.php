<?php

function index()
{
    $logs = [
        "[2026-03-08 10:15:32] ERROR: Database connection failed",
        "[2026-03-08 10:16:01] INFO: User login successful",
        "[2026-03-08 10:16:45] WARNING: Disk space low",
        "[2026-03-08 10:17:10] ERROR: Payment service timeout",
        "[2026-03-08 10:18:02] INFO: User logout successful",
        "[2026-03-08 10:19:55] ERROR: Failed to send email"
    ];
    $count_log = countLogLevels($logs);
    $extract_message = extractErrorMessages($logs);
    $find_latest = findLatestError($logs);
    $group_logs = groupLogsPerMinute($logs);
    return $group_logs;
}

function countLogLevels($logs){
    $result = [];
    foreach($logs as $value){
        $start = (substr($value, strpos($value, "]") + 1));
        $end = substr($start, 1, strpos($start, ":") - 1);
        if(array_key_exists($end, $result)){
            $result[$end] = $result[$end] + 1;
        }else{
            $result[$end] = 1;
        }
    }
    return $result;
}

function extractErrorMessages($logs){
    $result = [];
    foreach($logs as $value){
        $result[] = (substr($value, strrpos($value, ":") + 1));
    }
    return $result;
}

function findLatestError($logs){
    $latestDate = 0;
    $result = '';
    foreach($logs as $value){
         if(str_contains($value, 'ERROR')){
            $start = (substr($value, strpos($value, "[")));
            $end = substr($start, 1, strpos($start, "]") - 1);
            if($end > $latestDate){
                $latestDate = $end;
                $result = $value;
            }
         }
    }
    return $result;
}

function groupLogsPerMinute($logs){
    $result = [];
    foreach($logs as $value){
            $date = (substr($value, 1, strpos($value, "]") - 4));
            if(array_key_exists($date, $result)){
                $result[$date] = $result[$date] + 1;
            }else{
                $result[$date] = 1;
            }
    }
    return $result;
}

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
// PHP Coding Challenge #4 — Log File Analyzer
//////////////////////////////////////////////////////////////////////////////
// >>>> Scenario
// You are building a log analyzer for a server.
// Each log entry follows this format: [TIMESTAMP] LEVEL: MESSAGE
// Example: [2026-03-08 10:15:32] ERROR: Database connection failed
// The system receives a list of log entries.
// Your task is to analyze the logs.

// >>>> Input Data:
// $logs = [
// "[2026-03-08 10:15:32] ERROR: Database connection failed",
// "[2026-03-08 10:16:01] INFO: User login successful",
// "[2026-03-08 10:16:45] WARNING: Disk space low",
// "[2026-03-08 10:17:10] ERROR: Payment service timeout",
// "[2026-03-08 10:18:02] INFO: User logout successful",
// "[2026-03-08 10:19:55] ERROR: Failed to send email"
// ];

// >>>> Task 1 — Count Log Levels
// Return the number of logs for each level.
// Expected output:
// ERROR : 3
// INFO : 2
// WARNING : 1

// >>>> Task 2 — Extract Error Messages
// Return only the ERROR messages.
// Expected output:
// [
// "Database connection failed",
// "Payment service timeout",
// "Failed to send email"
// ]

// >>>> Task 3 — Find the Latest Error
// Return the latest ERROR log based on timestamp.
// Expected output:
// Latest Error:
// [2026-03-08 10:19:55] ERROR: Failed to send email

// Task 4 — Group Logs by Minute
// Group logs by minute.
// Example key:
// 2026-03-08 10:16
// Expected structure:
// [
//  "2026-03-08 10:15" => 1,
//  "2026-03-08 10:16" => 2,
//  "2026-03-08 10:17" => 1,
//  "2026-03-08 10:18" => 1,
//  "2026-03-08 10:19" => 1
// ]

// >>>> Requirements
// You should practice using:
// - explode()
// - substr()
// - strpos()
// - array manipulation
// - loops
// Avoid using frameworks.

// >>>> Bonus Challenge (Real Interview Difficulty)
// Some logs may be invalid:
// INVALID LOG ENTRY
// Example:
// $logs[] = "INVALID LOG ENTRY";
// You must skip invalid logs safely.

echo '<pre>';
print_r(index());
echo '</pre>';



/////////////////////////////////////////
// GPT VERSION
////////////////////////////////////////

function parseLog_GPT($log)
{

    if (!preg_match('/^\[(.*?)\]\s(\w+):\s(.+)$/', $log, $matches)) {
        return null;
    }

    // (.*?): timestamp
    // (\w+): level
    // (.+): message
    return [
        "timestamp" => $matches[1],
        "level" => $matches[2],
        "message" => $matches[3],
    ];
}

function countLogLevels_GPT($logs)
{
    $result = [];

    foreach ($logs as $log) {
        $parsed = parseLog_GPT($log);

        if (!$parsed) {
            continue;
        }

        $level = $parsed['level'];

        $result[$level] = ($result[$level] ?? 0) + 1;
    }

    return $result;
}


function extractErrorMessages_GPT($logs)
{
    $result = [];

    foreach ($logs as $log) {
        $parsed = parseLog_GPT($log);

        if (!$parsed) {
            continue;
        }

        if ($parsed['level'] === "ERROR") {
            $result[] = $parsed['message'];
        }
    }

    return $result;
}

function findLatestError_GPT($logs)
{
    $latestTime = 0;
    $latestLog = null;

    foreach ($logs as $log) {
        $parsed = parseLog_GPT($log);

        if (!$parsed || $parsed['level'] !== "ERROR") {
            continue;
        }

        $timestamp = strtotime($parsed['timestamp']);

        if ($timestamp > $latestTime) {
            $latestTime = $timestamp;
            $latestLog = $log;
        }
    }

    return $latestLog;
}

function groupLogsPerMinute_GPT($logs)
{
    $result = [];

    foreach ($logs as $log) {
        $parsed = parseLog_GPT($log);

        if (!$parsed) {
            continue;
        }

        $minute = substr($parsed['timestamp'], 0, 16);

        $result[$minute] = ($result[$minute] ?? 0) + 1;
    }

    return $result;
}