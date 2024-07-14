//import { createElement } from "react";

const dateInput = document.querySelector(".datepicker__input");
const yearInput = document.querySelector(".year-input");
const monthInput = document.querySelector(".month-input")
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
const dates = document.querySelector(".dates");

let selectedDate = new Date();
let year = selectedDate.getFullYear();
let month = selectedDate.getMonth();

//handle next month nav
nextBtn.addEventListener("click", () => {
  if (month === 11) year++;
  month = (month + 1) % 12;
  displayDates();
});

//handle prev month nav
prevBtn.addEventListener("click", () => {
  if (month === 0) year--;
  month = (month - 1 + 12) % 12;
  displayDates();
});

//handle month input change event
monthInput.addEventListener("change", () => {
  month = monthInput.selectedIndex;
  displayDates();
});

//handle year input change event
yearInput.addEventListener("change", () => {
  year = yearInput.value;
  displayDates();
});

const updateYearMonth = () => {
  monthInput.selectedIndex = month;
  yearInput.value = year;
};

const handleDateClick = (e) => {
  const button = e.target;

  //remove the 'selected' class from other buttons
  const selected = document.querySelector(".selected");
  selected && selected.classList.remove("selected");

  //add the 'selected' class to current button
  button.classList.add("selected");

  //set the selected date
  selectedDate = new Date(year, month, parseInt(button.textContent));

  //set the selected date to datepicker input
  dateInput.value = selectedDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}

//render the dates in the calendar interface
const displayDates = () => {

  //updates year & month wherever the dates are updated
  updateYearMonth();

  //clear the dates
  dates.innerHTML = "";

  //*display the last week previous month

  //get the last date of previous month
  const lastOfPrevMonth = new Date(year, month, 0);

  if (lastOfPrevMonth.getDay() < 6) {
    for (let i = 0; i <= lastOfPrevMonth.getDay(); i++) {
      const text = lastOfPrevMonth.getDate() - lastOfPrevMonth.getDay() + i;
      const button = createButton(text, true, true);
      dates.appendChild(button);
    }
  };

  //*display the current month

  //get the last day of the month
  const lastOfMOnth = new Date(year, month + 1, 0);

  for (let i = 1; i <= lastOfMOnth.getDate(); i++) {
    // const isToday = selectedDate.getDate() === i &&
    //   selectedDate.getFullYear() === year &&
    //   selectedDate.getMonth() === month;    

    const todayDate = new Date();
    const button = (todayDate < new Date(year, month, i)) ?
      createButton(i, false) :
      createButton(i, true);

    //const button = createButton(i, false);

    button.addEventListener("click", handleDateClick);

    dates.appendChild(button);
  }

  //*display the first week of next month

  const firstOfNextMonth = new Date(year, month + 1, 1);

  if (firstOfNextMonth.getDay() > 0) {
    for (let i = firstOfNextMonth.getDay(); i < 7; i++) {
      const text = firstOfNextMonth.getDate() - firstOfNextMonth.getDay() + i;
      const button = createButton(text, true, true);
      dates.appendChild(button);
    }
  };

}

const createButton = (text, isDisabled = false, isHidden = false) => {

  const currentDate = new Date();

  //check if the current button is the date today
  const isToday =
    currentDate.getDate() === text &&
    currentDate.getFullYear() === year &&
    currentDate.getMonth() === month;

  //check if the current button is selected
  const selected =
    selectedDate.getDate() === text &&
    selectedDate.getFullYear() === year &&
    selectedDate.getMonth() === month;

  const button = document.createElement("button");
  button.setAttribute('type', 'button');
  button.textContent = text;
  button.disabled = isDisabled;
  button.classList.toggle("today", isToday);
  button.classList.toggle("selected", selected);
  button.classList.toggle("hidden", isHidden);
  return button;
}

displayDates();

//Custom month-input