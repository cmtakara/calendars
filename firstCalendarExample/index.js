import { isWeekend } from "./date-helpers.js";

const calendar = document.querySelector('#app-calendar');

console.log(calendar)

let today = new Date();
let dd = String(today.getDate()).padStart(2, '0');
let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
let yyyy = today.getFullYear();
let useDate = yyyy + '-' + mm + '-' + dd;
let thisMonth = today.getMonth();
let thisDay = today.getDate();
// this year is yyyy and can be used the same

const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

console.log(useDate);
console.log(thisMonth);
console.log(thisDay);
console.log(yyyy);

let daysToShow = 31;
let startDay = 'Mon';
let offset = 0;

// starting with showing the current month
daysToShow = getNumDays(thisMonth, yyyy);
// testing all months
// daysToShow = getNumDays(11, 2022);
console.log("days to show is: ", daysToShow);

console.log()

startDay = getFirstDayOfMonth(thisMonth, yyyy);
// testing all months
// startDay = getFirstDayOfMonth(11, 2022);
console.log(startDay)

daysOfWeek.forEach(day => 
    calendar.insertAdjacentHTML('beforeend', `<div class="day">${day}</div>`)
)

for(let i = 0; i < offset; i++) {
    calendar.insertAdjacentHTML('beforeend', `<div class="day">blank day</div>`);
}

for (let day = 1; day <= daysToShow; day++) {
    // console.log(day);
    const weekend = isWeekend(day+offset);

    calendar.insertAdjacentHTML('beforeend', `<div class="day ${weekend ? "weekend" : "" }">${day}</div>`);
}






function getFirstDayOfMonth(month, year) {
    let day = new Date(year, month, 1).toString().slice(0,3);
    offset = daysOfWeek.indexOf(day);
    console.log('offset is: ', offset)
    return day;
}
  
// there is no input validation because the expectation is that the input will be controlled by another 
// function and not a user field
// if that changes, add input validation to ensure that month and year are valid whole numbers
function getNumDays(month, year) {
    // finding the number of days in the month
    let numDays = 31;
    // February
    if (month === 1) {
        console.log("it's February but is it a leap year?")
        if (year % 4 === 0 && year % 4 !== 100) {
            numDays = 29;
            console.log('it is a leap year');
            // ignoring the case where century mod 40 is not a leap year
            // that won't happen again until 2400
        }
        else numDays = 28;  //        console.log('it is not a leap year');
    }
    // 30 month days
    // November (11), April (04), June (06), and September (09)
    // subtract 1 because January is 0
    else if (month === 3 || month === 5 || month === 8 || month === 10) {
        // this month has 30 days
        console.log('this month has 30 days')
        numDays = 30;
    }
    else {
        console.log('this month has 31 days')
        numDays = 31;
    }

    console.log(numDays)
    return numDays;
}