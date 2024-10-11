// import * as modal from "../../js/files/my_datepicker.js";

// const datepickerMonthListMobile = document.querySelector(".month-content__list");
// const datepickerMonthPopupContent = document.querySelector(".month-content");

// let month = new Date().getMonth();

// const moveListItems = function (targetList, sourceList, targetClass, sourceClass) {

//   targetList.insertAdjacentHTML('afterbegin', sourceList.innerHTML);

//   targetList.childNodes.forEach(el => {
//     if (el.nodeType === Node.ELEMENT_NODE) {
//       el.classList.add(targetClass);
//       el.classList.remove(sourceClass);
//     };
//   });
// };

// moveListItems(datepickerMonthListMobile, modal.dropDownList, 'month-list__item', 'dropdown-list__item');

// //Close popup with month-list by close-button
// datepickerMonthPopupContent.addEventListener('click', function (e) {
//   if (e.target.closest('.month-content__close')) {
//     modal.monthListPopup.classList.remove('showModal');
//   }
// });

// const mobileMonthListItems = document.querySelectorAll(".month-list__item");
// console.log(mobileMonthListItems);

// mobileMonthListItems.forEach(function (listItem) {
//   listItem.addEventListener('click', function (e) {
//     e.stopPropagation();
//     console.log(listItem.textContent)
//     modal.dropDownBtn.innerText = "yes";
//     month = parseInt(listItem.dataset.value);
//     modal.monthInput.value = this.dataset.value;
//     modal.monthListPopup.classList.remove('showModal');
//     console.log(modal.monthInput.value)
//     modal.displayDates();
//   });
// });