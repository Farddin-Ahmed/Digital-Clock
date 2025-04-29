// Select all HTML elements needed for the clock
let hr = document.getElementById("hr");
let min = document.getElementById("min");
let sec = document.getElementById("sec");
let current = document.getElementById("date");
let mon = document.getElementById("mon");
let tue = document.getElementById("tue");
let wed = document.getElementById("wed");
let thu = document.getElementById("thu");
let fri = document.getElementById("fri");
let sat = document.getElementById("sat");
let sun = document.getElementById("sun");
let select = document.getElementById("select");
let ampmbox = document.getElementById("ampmbox"); //AM/PM container
let ap = document.getElementById("ap"); // AM/PM indicator

// Updates the clock's minutes, seconds, date, and active day
// Runs every second
function currenttime() {
  const minute = String(new Date().getMinutes()).padStart(2, "0");
  const second = String(new Date().getSeconds()).padStart(2, "0");
  const day = String(new Date().getDay()).padStart(2, "0");
  const date = String(new Date().getDate()).padStart(2, "0");
  const month = String(new Date().getMonth() + 1).padStart(2, "0");
  const year = String(new Date().getFullYear()).padStart(2, "0");

  // Update time elements in the DOM
  min.innerText = minute;
  sec.innerText = second;
  current.innerText = `${date} - ${month} - ${year}`;

  // Remove 'active' class from all day elements
  mon.classList.remove("active");
  tue.classList.remove("active");
  wed.classList.remove("active");
  thu.classList.remove("active");
  fri.classList.remove("active");
  sat.classList.remove("active");
  sun.classList.remove("active");

  // Add 'active' class to the current day
  // getDay() returns 0 for Sunday, 1 for Monday, etc.
  if (day == "00") {
    sun.classList.add("active");
  } else if (day == "01") {
    mon.classList.add("active");
  } else if (day == "02") {
    tue.classList.add("active");
  } else if (day == "03") {
    wed.classList.add("active");
  } else if (day == "04") {
    thu.classList.add("active");
  } else if (day == "05") {
    fri.classList.add("active");
  } else {
    sat.classList.add("active");
  }
}
let timeIntervalId = setInterval(currenttime, 1000);

// Formats and displays time in 24-hour format (00-23)
function formatTime24Hour() {
  const hour = String(new Date().getHours()).padStart(2, "0");
  hr.innerText = hour;
}
let formatintervel = setInterval(formatTime24Hour, 1000);

// Formats and displays time in 12-hour format (01-12) with AM/PM
function formatTime12Hour() {
  let hours = new Date().getHours();
  let ampm;
  // Determine if it's AM or PM
  if (hours >= 12) {
    ampm = "PM";
  } else {
    ampm = "AM";
  }
  // Convert from 24-hour to 12-hour format
  hours = hours % 12;
  if (!hours) {
    // If hours is falsy (0), set it to 12
    hours = 12;
  } else {
    // If hours is truthy (not 0), keep its current value
    hours = hours;
  }
  // Format with leading zero if needed
  const formathours = String(hours).padStart(2, "0");
  // Update the DOM elements
  hr.innerText = formathours;
  ap.innerText = ampm;
}

// Event listener for the format selector
// Toggles between 12-hour and 24-hour clock formats
select.addEventListener("change", () => {
  const selectvalue = select.value;
  clearInterval(formatintervel);

  if (selectvalue == "12hour") {
    ampmbox.style.display = "flex";
    formatTime12Hour(); // Update immediately
    formatintervel = setInterval(formatTime12Hour, 1000);
  } else {
    ampmbox.style.display = "none";
    formatTime24Hour(); // Update immediately
    formatintervel = setInterval(formatTime24Hour, 1000);
  }
});
