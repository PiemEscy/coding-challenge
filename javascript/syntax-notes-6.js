
// Challenge: Shift Scheduling Conflict & Coverage Report (no API — hardcoded data)

// You run scheduling for a small retail store. You have a local hardcoded list of employee shifts for a single day, each with a start/end time (24hr "HH:MM" strings) and a department. You need to (1) detect employees who are double-booked with overlapping shifts, and (2) build a per-department coverage timeline to find windows where too few people are on the floor.

// This is a different kind of problem than fetch/map/reduce enrichment — it's interval/sweep-line logic on hardcoded time data. No network calls, no async needed.

// Requirements
// shifts() — returns a hardcoded array of shift objects: { id, employeeName, department, start, end } (start/end as "HH:MM" strings, same day). Include at least one employee with two overlapping shifts, and at least one department with a clear coverage gap.
// parseTimeToMinutes(timeStr) — converts "HH:MM" into minutes since midnight (e.g. "09:30" -> 570).
// findOverlappingShifts(shiftList) — group shifts by employeeName, and for each employee check every pair of their shifts for a time overlap (two intervals overlap if startA < endB && startB < endA). Return an array of conflict objects: { employeeName, shiftA, shiftB }.
// buildCoverageEvents(shiftList, department) — filter shifts to one department, then build a sorted list of +1/-1 events (a "start" event at shift.start, an "end" event at shift.end), sort them by time, and sweep through to produce a timeline: an array of { time, coverage } showing how many employees are on the floor at each point the count changes. Do NOT brute-force every minute — use the sweep-line approach (sort events, accumulate a running count).
// findUnderstaffedWindows(timeline, minRequired) — walk the coverage timeline and return an array of { start, end, coverage } windows where coverage stayed below minRequired.
// result() — returns { conflicts, timelinesByDepartment, understaffedWindows } where timelinesByDepartment is an object keyed by department name, and understaffedWindows is also keyed by department name (using a minRequired of your choice per department, e.g. 2).

// Extra constraints to push you further:
// Do not compare every shift against every other shift across the whole store — only compare shifts belonging to the same employee (for conflicts) or same department (for coverage).
// The sweep-line timeline must be built from sorted start/end events, not by looping minute-by-minute through the day.
// Handle a shift that overlaps itself in the input gracefully (e.g. duplicate shift entries) without reporting a false conflict against itself.

function shifts() {
    return [
        { id: 1, employeeName: "Maria Santos", department: "Sales", start: "09:00", end: "13:00" },
        { id: 2, employeeName: "Maria Santos", department: "Sales", start: "14:00", end: "16:58" },
        { id: 3, employeeName: "John Cruz", department: "Sales", start: "10:00", end: "14:00" },
        { id: 4, employeeName: "Ana Reyes", department: "Sales", start: "13:00", end: "18:00" },
        { id: 5, employeeName: "Mark Tan", department: "Electronics", start: "09:00", end: "12:00" },
        { id: 6, employeeName: "Liza Gomez", department: "Electronics", start: "15:00", end: "18:00" },
        { id: 7, employeeName: "Paolo Diaz", department: "Stockroom", start: "08:00", end: "12:00" },
        { id: 8, employeeName: "Ella Ramos", department: "Stockroom", start: "08:00", end: "10:00" },
        { id: 9, employeeName: "Ben Ortiz", department: "Stockroom", start: "12:00", end: "17:00" },
        { id: 10, employeeName: "Paolo Diaz", department: "Stockroom", start: "12:30", end: "16:00" },
        { id: 11, employeeName: "Ella Ramos", department: "Stockroom", start: "08:00", end: "10:00" }
    ];
}

function parseTimeToMinutes(timeStr) {
    const split = timeStr.split(":");

    if (split.length !== 2){
        return 0;
    }

    const hours = parseFloat(split[0] ?? 0);
    const minutes = parseFloat(split[1] ?? 0);
    return (hours * 60) + minutes;
}

function findOverlappingShifts(shiftList) {
    const uniqueEmployee = [... new Set(shiftList.map(data => data.employeeName))];
    const overlap = [];

    for (const employee of uniqueEmployee) {
        const filteredShift = shiftList.filter(data => data.employeeName === employee);
        let lastStartShift = filteredShift?.[0]?.start;
        let lastEndShift = filteredShift?.[0]?.end;
        
        for (let i = 1; i < filteredShift.length; i++) {
            const endShift = filteredShift[i].end;
            const startShift = filteredShift[i].start;
            // console.log(`${employee} lastEndShift: ${parseTimeToMinutes(lastEndShift)} > startShift: ${parseTimeToMinutes(startShift)} ||| endShift: ${parseTimeToMinutes(endShift)} < lastStartShift: ${parseTimeToMinutes(lastStartShift)}`);
            
            if(parseTimeToMinutes(lastEndShift) > parseTimeToMinutes(startShift) || parseTimeToMinutes(endShift) < parseTimeToMinutes(lastStartShift)){
                const lastShift = filteredShift[i - 1];
                const currentShift = filteredShift[i]
                overlap.push({ employee, lastShift, currentShift});
            }else{
                lastStartShift = filteredShift[i].start;
                lastEndShift = filteredShift[i].end;
            }
        }
    }
    
    return overlap;

    // easy way to group by
    // const groupedEmployee = Object.groupBy(shiftList, shift => shift.employeeName);

}

function buildCoverageEvents(shiftList, department) {
    
}

function result(){
    const timeToMinutes = parseTimeToMinutes("09:30");
    const overlappingShifts = findOverlappingShifts(shifts());
    console.log(overlappingShifts);
    
}

result();