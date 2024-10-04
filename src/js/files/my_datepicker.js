import { documentBody } from "/src/js/files/script.js";

const dateInput = document.querySelector(".datepicker__input");
const yearInput = document.querySelector(".year-input");
const monthInput = document.querySelector(".month-input")
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
const dates = document.querySelector(".dates");

const dropDownBtn = document.querySelector(".dropdown-button");
const dropDownList = document.querySelector(".dropdown-list");
const dropDownListItems = document.querySelectorAll(".dropdown-list__item");

const yearUp = document.querySelector(".year-counter__plus");
const yearDown = document.querySelector(".year-counter__minus");

const currentYear = new Date().getFullYear();

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
  month = monthInput.value;
  displayDates();
});

//handle year input change event
yearInput.addEventListener("change", () => {
  year = yearInput.value;
  displayDates();
});

yearUp.addEventListener("click", function () {
  yearInput.value++;
  year = yearInput.value;
  displayDates();
});

yearDown.addEventListener("click", function () {
  if (yearInput.value > currentYear) {
    yearInput.value--;
    year = yearInput.value;
    displayDates();
  };
});

const updateYearMonth = () => {
  monthInput.value = month;
  yearInput.value = year;

  dropDownListItems.forEach((item) => {

    if (month == item.dataset.value) {
      dropDownBtn.innerText = item.textContent;
      monthInput.value = item.dataset.value;
    };
  });
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
    const todayDate = new Date();
    const button = (todayDate < new Date(year, month, i)) ?
      createButton(i, false) :
      createButton(i, true);

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

//---------------------------------------------------------------------------

//Custom month-input
// Click on the button. Open/close select
//start
//==============================================================
const monthListPopup = document.querySelector('.month-popup');
const datepickerMonthListMobile = document.querySelector(".month-content__list");
const datepickerMonthPopupContent = document.querySelector(".month-content");

datepickerMonthListMobile.insertAdjacentHTML('afterbegin', dropDownList.innerHTML);

datepickerMonthListMobile.childNodes.forEach(el => {
  if (el.nodeType === Node.ELEMENT_NODE) {
    el.classList.add('month-list__item');
  };
});

const mobileMonthListItems = document.querySelectorAll(".month-list__item");

mobileMonthListItems.forEach(function (listItem) {
  listItem.addEventListener('click', function (e) {
    e.stopPropagation();
    dropDownBtn.innerText = this.innerText;
    month = parseInt(listItem.dataset.value);
    // dropDownList.classList.remove("dropdown-list__visible");
    // dropDownBtn.classList.remove("onFocus");
    monthInput.value = this.dataset.value;
    monthListPopup.classList.remove('showMonthPopup')
    console.log("yes")
    displayDates();
  });
});



//===================================================================
console.log(documentBody)
dropDownBtn.addEventListener('click', function () {
  if (documentBody.classList.contains("_pc")) {
    dropDownList.classList.toggle("dropdown-list__visible");
    this.classList.toggle("onFocus");
  } else {
    monthListPopup.classList.add("showMonthPopup");
  }
});

datepickerMonthPopupContent.addEventListener('click', function (e) {
  if (e.target.closest('.month-content__close')) {
    monthListPopup.classList.remove('showMonthPopup')
  }
})


// Selecting a list item. Remember the selected value. Close dropdown
//console.log(dropDownListItems)
dropDownListItems.forEach(function (listItem) {
  listItem.addEventListener('click', function (e) {
    e.stopPropagation();
    dropDownBtn.innerText = this.innerText;
    month = parseInt(listItem.dataset.value);
    dropDownList.classList.remove("dropdown-list__visible");
    dropDownBtn.classList.remove("onFocus");
    monthInput.value = this.dataset.value;

    displayDates();
  });
});

// Click outside the dropdown. Close dropdown

document.addEventListener('click', function (e) {
  if (e.target !== dropDownBtn) {
    dropDownBtn.classList.remove("onFocus");
    dropDownList.classList.remove("dropdown-list__visible");
  }
});

// Click Tab or Escape. Close dropdown

document.addEventListener('keydown', function (e) {
  if (e.key === "Tab" || e.key === "Escape") {
    dropDownBtn.classList.remove("onFocus");
    dropDownBtn.classList.remove('_arrowUp');
    dropDownList.classList.remove("dropdown-list__visible");
  }
});

//===Rotate arrow when focusing on month-input in calendar======

const calendarMonthInput = document.querySelector(".month-input");
const calendarMonthInputWrp = document.querySelector(".month-input__wrapper");

calendarMonthInput.onclick = function () {
  calendarMonthInputWrp.classList.toggle('_arrowUp');
}

calendarMonthInput.onblur = function () {
  calendarMonthInputWrp.classList.remove('_arrowUp');
}

//===Rotate arrow when clicking on dropdown-button in calendar======

const dropDownButton = document.querySelector('.dropdown-button');

dropDownButton.onclick = function () {
  this.classList.toggle('_arrowUp');
}

dropDownButton.onblur = function () {
  this.classList.remove('_arrowUp');
}

//===Outline for year-input when hovering over the year switching arrows======

const changeYearArrows = document.querySelectorAll(".year-counter__plus, .year-counter__minus");
const yearInputBlock = document.querySelector(".year-input");

changeYearArrows.forEach((el) => {
  el.addEventListener("mouseover", function () {
    yearInputBlock.classList.add("year-input_outline");
  });

  el.addEventListener("mouseout", function () {
    yearInputBlock.classList.remove("year-input_outline");
  });
});





