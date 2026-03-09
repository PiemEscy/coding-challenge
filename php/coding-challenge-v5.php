<?php

    function index(){
        $workLogs = [
            ['employee' => 'Juan', 'date' => '2026-03-01', 'hours' => 8],
            ['employee' => 'Maria', 'date' => '2026-03-01', 'hours' => 7],
            ['employee' => 'Juan', 'date' => '2026-03-02', 'hours' => 9],
            ['employee' => 'Pedro', 'date' => '2026-03-01', 'hours' => 6],
            ['employee' => 'Maria', 'date' => '2026-03-02', 'hours' => 8],
            ['employee' => 'Juan', 'date' => '2026-03-03', 'hours' => 5],
        ];
        
        return analyzeWorkHours($workLogs);
    }

    function analyzeWorkHours($workLogs){

        $total_hours = [];
        $top_employee = [];
        $overtime_days = [];
        $average_hours = [];
        $max_hours = PHP_INT_MIN;
        $employees = (isset($workLogs[0]) && isset($workLogs[0]['employee'])) ? array_unique(array_column($workLogs, 'employee')) : [];

        if(count($employees) > 0){
            foreach($employees as $emp){
                $filter = array_filter($workLogs, function($item) use($emp){
                    if($item['employee'] == $emp){
                        return $item;
                    }
                });
                $compute_hours = array_sum(array_column($filter, 'hours'));
                $compute_days = count(array_unique(array_column($filter, 'date')));
                $total_hours[$emp] =  $compute_hours;
                $average_hours[$emp] =  $compute_hours / $compute_days;

                if($compute_hours > $max_hours){
                    $max_hours = $compute_hours;
                    $top_employee = ['employee' => $emp, 'hours' => $compute_hours];
                }
            }
        }

        foreach ($workLogs as $key => $value) {
            if($value['hours'] > 8){
                $overtime_days[] = $value;
            }
        }

        return [
            'total_hours' => $total_hours,
            'top_employee' => $top_employee,
            'overtime_days' => $overtime_days,
            'average_hours' => $average_hours,
        ];
    }

    //////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////
    // PHP Coding Challenge #5 – Employee Work Hours Analyzer
    //////////////////////////////////////////////////////////////////////////////
    // >>>> Scenario
    // - You are building a time tracking system for a company.
    // - Each employee logs the number of hours worked per day.
    // - Your task is to generate a weekly work summary report.

    // >>>> Sample Input:
    // $workLogs = [
    //     ['employee' => 'Juan', 'date' => '2026-03-01', 'hours' => 8],
    //     ['employee' => 'Maria', 'date' => '2026-03-01', 'hours' => 7],
    //     ['employee' => 'Juan', 'date' => '2026-03-02', 'hours' => 9],
    //     ['employee' => 'Pedro', 'date' => '2026-03-01', 'hours' => 6],
    //     ['employee' => 'Maria', 'date' => '2026-03-02', 'hours' => 8],
    //     ['employee' => 'Juan', 'date' => '2026-03-03', 'hours' => 5],
    // ];

    // >>>> Your Task
    // Create a function:
    // function analyzeWorkHours($workLogs)
    // Return the following report.

    // >>>> Task 1 — Total hours worked per employee
    // Expected:
    // [
    //     'Juan' => 22,
    //     'Maria' => 15,
    //     'Pedro' => 6
    // ]

    // >>>> Task 2 — Employee with the most hours
    // Expected:
    // [
    //     'employee' => 'Juan',
    //     'hours' => 22
    // ]

    // >>>> Task 3 — Detect overtime days
    // A day is overtime if hours > 8.
    // Expected:
    // [
    //     [
    //         'employee' => 'Juan',
    //         'date' => '2026-03-02',
    //         'hours' => 9
    //     ]
    // ]

    // >>>> Expected Final Return
    // [
    //     'total_hours' => [],
    //     'top_employee' => [],
    //     'overtime_days' => []
    // ]

    // Example Output
    // Array
    // (
    //     [total_hours] => Array
    //         (
    //             [Juan] => 22
    //             [Maria] => 15
    //             [Pedro] => 6
    //         )

    //     [top_employee] => Array
    //         (
    //             [employee] => Juan
    //             [hours] => 22
    //         )

    //     [overtime_days] => Array
    //         (
    //             [0] => Array
    //                 (
    //                     [employee] => Juan
    //                     [date] => 2026-03-02
    //                     [hours] => 9
    //                 )
    //         )
    // )
    // Bonus (Very Common Interview Twist)

    // Add a 4th result:

    // Average hours per employee

    // Expected:

    // [
    //     'Juan' => 7.33,
    //     'Maria' => 7.5,
    //     'Pedro' => 6
    // ]

    // Formula:

    // total hours / number of days worked
    // Why This Is a Real Interview-Type Challenge

    // It tests:

    // array aggregation

    // grouping data

    // condition detection

    // sorting/comparing values

    // clean PHP structure

    // This is very similar to real backend coding exams.

    echo '<pre>';
    print_r(index());
    echo '</pre>';


    function analyzeWorkHours_GPT($workLogs)
    {
        $total_hours = [];
        $days_worked = [];
        $overtime_days = [];

        $top_employee = [
            'employee' => null,
            'hours' => 0
        ];

        foreach ($workLogs as $log) {
            $employee = $log['employee'];
            $date = $log['date'];
            $hours = $log['hours'];

            // Initialize employee
            if (!isset($total_hours[$employee])) {
                $total_hours[$employee] = 0;
                $days_worked[$employee] = [];
            }

            // Add hours
            $total_hours[$employee] += $hours;

            // Track days worked
            $days_worked[$employee][$date] = true;

            // Detect overtime
            if ($hours > 8) {
                $overtime_days[] = $log;
            }
        }

        // Compute averages and find top employee
        $average_hours = [];

        foreach ($total_hours as $employee => $hours) {

            $days = count($days_worked[$employee]);

            $average_hours[$employee] = $days > 0
                ? round($hours / $days, 2)
                : 0;

            if ($hours > $top_employee['hours']) {
                $top_employee = [
                    'employee' => $employee,
                    'hours' => $hours
                ];
            }
        }

        return [
            'total_hours' => $total_hours,
            'top_employee' => $top_employee,
            'overtime_days' => $overtime_days,
            'average_hours' => $average_hours,
        ];
    }
?>