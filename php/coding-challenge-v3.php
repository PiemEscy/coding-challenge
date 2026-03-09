<?php

function index()
{
    $employees = [
        ["name" => "Bob", "preferred_shifts" => ["Morning"]],
        ["name" => "David", "preferred_shifts" => ["Night"]],
        ["name" => "Alice", "preferred_shifts" => ["Morning", "Evening"]],
        ["name" => "Charlie", "preferred_shifts" => ["Evening", "Night"]],
    ];
    $available_shifts = ["Morning", "Evening", "Night"];

    $sorted_employees_gpt = sortAlphabeticallyPerSameShift_GPT($employees);
    $assign_shifts_gpt = assignShifts_GPT($sorted_employees_gpt, $available_shifts);
    return empWithoutAssignment_GPT($sorted_employees_gpt, $assign_shifts_gpt[1]);

    $sorted_employees = sortAlphabeticallyPerSameShift($employees, $available_shifts);
    $assign_shifts = assignShifts($sorted_employees, $available_shifts);
    return empWithoutAssignment($sorted_employees, $available_shifts, $assign_shifts);
}

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
// PHP Coding Challenge #3 — Employee Shift Scheduler
//////////////////////////////////////////////////////////////////////////////

// >>>> Scenario
// You are building a system for scheduling employee shifts.
// You receive a list of employees and their preferred shifts, and you need to assign them to available shifts.

// >>>> Input Data:
// $employees = [
//     ["name" => "Alice", "preferred_shifts" => ["Morning", "Evening"]],
//     ["name" => "Bob", "preferred_shifts" => ["Morning"]],
//     ["name" => "Charlie", "preferred_shifts" => ["Evening", "Night"]],
//     ["name" => "David", "preferred_shifts" => ["Night"]],
// ];
// $available_shifts = ["Morning", "Evening", "Night"];

// >>>> Rules:
// - Each employee can have 1 shift per day.
// - Each shift can only have 1 employee.
// - If multiple employees prefer the same shift, assign the employee whose name comes first alphabetically.
// - If an employee cannot be assigned to any of their preferred shifts, assign "Unassigned".

// >>>> Task 1 — Assign Shifts
// Write a function that returns an assignment array:
// Expected output:
// [
//     "Morning" => "Alice",   // Alice vs Bob, Alice comes first alphabetically
//     "Evening" => "Charlie", // Alice already assigned, next preferred is Charlie
//     "Night" => "David"
// ]

// >>>> Task 2 — Employees Without Assignment
// Return an array of employees who couldn’t be assigned any of their preferred shifts:
// ["Bob"] // Bob wanted Morning, but it’s already taken

// >>>> Task 3 — Bonus: Alphabetical Priority
// If multiple employees have the same preferred shift, sort them alphabetically before assignment.

// >>>> Bonus Challenge (Real Interview Twist)
// Multiple Days:
// $employees = [
//     ["name" => "Alice", "preferred_shifts" => ["Morning", "Evening"], "day" => "Monday"],
//     ["name" => "Bob", "preferred_shifts" => ["Morning"], "day" => "Monday"],
//     ["name" => "Charlie", "preferred_shifts" => ["Evening", "Night"], "day" => "Tuesday"],
//     ["name" => "David", "preferred_shifts" => ["Night"], "day" => "Tuesday"],
// ];
// Now you need to assign shifts per day.
// Dynamic Shift Count:
// Some shifts may have more than 1 slot, e.g., "Morning" => 2 slots.

// >>>> Requirements
// - Use arrays, loops, and conditionals
// - Return clean, structured arrays
// - Avoid frameworks
// - Avoid global variables (everything inside functions)


function assignShifts($employees, $available_shifts){
    $result = [];
    foreach ($employees as $key => $value) {
        foreach($available_shifts as $shift){
            if(in_array($shift, $value['preferred_shifts'])){
                if(array_key_exists($shift, $result)){
                    if(strcmp($value['name'], $result[$shift]) === -1){
                        $result[$shift] = $value['name'];
                    }
                }else{
                    if(!in_array($value['name'], $result)){
                        $result[$shift] = $value['name'];
                    }
                }
            }
        }
    }
    return $result;
}

function assignShifts_GPT($employees, $available_shifts)
{
    usort($employees, fn($a,$b) => strcmp($a['name'], $b['name']));

    $assigned = [];
    $employeeAssigned = [];

    foreach ($employees as $employee) {
        foreach ($employee['preferred_shifts'] as $shift) {

            if (!isset($assigned[$shift]) && in_array($shift, $available_shifts)) {
                $assigned[$shift] = $employee['name'];
                $employeeAssigned[] = $employee['name'];
                break;
            }

        }
    }

    return [$assigned, $employeeAssigned];
}

function empWithoutAssignment($employees, $available_shifts, $assign_shifts){
    
    $names = [];
    foreach ($employees as $key => $value) {
        $names[] = $value['name'];
    }
    $assign_shift_names = array_values($assign_shifts);
    return (array_values(array_diff($names, $assign_shift_names)));
}

function empWithoutAssignment_GPT($employees, $assignedNames)
{
    $all = array_column($employees,'name');
    return array_values(array_diff($all, $assignedNames));
}

function sortAlphabeticallyPerSameShift($employees, $available_shifts){
    $names = [];
    foreach ($employees as $key => $value) {
        $names[] = $value['name'];
    }

    sort($names);

    $new_array = [];
    foreach ($names as $key => $name) {
        foreach ($available_shifts as $key => $shift) {
            foreach ($employees as $key => $value) {
                if($value['name'] == $name && in_array($shift, $value['preferred_shifts']) && !in_array($value, $new_array)){
                    $new_array[] = $value;
                }
            }
        }
    }

    return $new_array;
}

function sortAlphabeticallyPerSameShift_GPT($employees){
    usort($employees, fn($a,$b) => strcmp($a['name'], $b['name']));
    return $employees;
}


echo '<pre>';
print_r(index());
echo '</pre>';
