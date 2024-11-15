import { indexPage } from "./constants.js";

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
indexPage && nextBtn.addEventListener("click", () => {
  if (month === 11) year++;
  month = (month + 1) % 12;
  displayDates();
});


//handle prev month nav
indexPage && prevBtn.addEventListener("click", () => {
  if (month === 0) year--;
  month = (month - 1 + 12) % 12;
  displayDates();
});


//handle month input change event
indexPage && monthInput.addEventListener("change", () => {
  month = monthInput.value;
  displayDates();
});


//handle year input change event
indexPage && yearInput.addEventListener("change", () => {
  year = yearInput.value;
  displayDates();
});


indexPage && yearUp.addEventListener("click", function () {
  yearInput.value++;
  year = yearInput.value;
  displayDates();
});


indexPage && yearDown.addEventListener("click", function () {
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
  indexPage && updateYearMonth();

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
    };
  };


  //*display the current month

  //get the last day of the month
  const lastOfMOnth = new Date(year, month + 1, 0);

  if (dates) {
    for (let i = 1; i <= lastOfMOnth.getDate(); i++) {
      const todayDate = new Date();
      const button = (todayDate < new Date(year, month, i)) ?
        createButton(i, false) :
        createButton(i, true);

      button.addEventListener("click", handleDateClick);

      dates.appendChild(button);
    };
  };

  //*display the first week of next month

  const firstOfNextMonth = new Date(year, month + 1, 1);

  if (firstOfNextMonth.getDay() > 0 && dates) {
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

indexPage && displayDates();

//---------------------------------------------------------------------------

//Custom month-input
//==============================================================
const monthListPopup = document.querySelector('.month-popup');
const datepickerMonthListMobile = document.querySelector(".month-content__list");
const datepickerMonthPopupContent = document.querySelector(".month-content");
export const body = document.body;

//Open month-list in dropdown-list or in popup

indexPage && dropDownBtn.addEventListener('click', function () {
  if (body.classList.contains("_pc")) {
    dropDownList.classList.toggle("dropdown-list__visible");
    this.classList.toggle("onFocus");
  } else {
    monthListPopup.classList.add("showModal");
    disableScroll();
  };
});


//Move list-items from main-list to modal-list

export const moveListItems = function (targetList, sourceList, targetClass, sourceClass) {
  indexPage && targetList.insertAdjacentHTML('afterbegin', sourceList.innerHTML);

  indexPage && targetList.childNodes.forEach(el => {
    if (el.nodeType === Node.ELEMENT_NODE) {
      el.classList.add(targetClass);
      el.classList.remove(sourceClass);
    };
  });
};


//Disable page scroll when popup is open
export function disableScroll() {
  let pagePosition = window.scrollY;
  body.style.position = 'fixed';
  body.dataset.position = pagePosition;
  body.style.top = -pagePosition + 'px';
};

//Enable page scroll when popup is closed
export function enableScroll() {
  let pagePosition = parseInt(body.dataset.position, 10);
  body.style.top = 'auto';
  body.style.position = 'relative';
  window.scroll({ top: pagePosition, left: 0 });
  body.removeAttribute('data-position');
};

moveListItems(datepickerMonthListMobile, dropDownList, 'month-list__item', 'dropdown-list__item');

//Close popup with month-list by close-button
indexPage && datepickerMonthPopupContent.addEventListener('click', function (e) {
  if (e.target.closest('.month-content__close')) {
    monthListPopup.classList.remove('showModal');

    enableScroll();
  };
});


// Selecting a list item on mobile. Remember the selected value. Close dropdown
const mobileMonthListItems = document.querySelectorAll(".month-list__item");

indexPage && mobileMonthListItems.forEach(function (listItem) {
  listItem.addEventListener('click', function (e) {
    e.stopPropagation();
    dropDownBtn.innerText = this.innerText;
    month = parseInt(listItem.dataset.value);
    monthInput.value = this.dataset.value;
    monthListPopup.classList.remove('showModal');

    enableScroll();
    displayDates();
  });
});

// Selecting a list item on pc. Remember the selected value. Close dropdown
indexPage && dropDownListItems.forEach(function (listItem) {
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

indexPage && document.addEventListener('click', function (e) {
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

if (calendarMonthInput) {
  calendarMonthInput.onclick = function () {
    calendarMonthInputWrp.classList.toggle('_arrowUp');
  };
};

if (calendarMonthInput) {
  calendarMonthInput.onblur = function () {
    calendarMonthInputWrp.classList.remove('_arrowUp');
  };
};

//===Rotate arrow when clicking on dropdown-button in calendar======

const dropDownButton = document.querySelector('.dropdown-button');

if (dropDownButton) {
  dropDownButton.onclick = function () {
    this.classList.toggle('_arrowUp');
  };
};

if (dropDownButton) {
  dropDownButton.onblur = function () {
    this.classList.remove('_arrowUp');
  };
};
//===================================================================

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





