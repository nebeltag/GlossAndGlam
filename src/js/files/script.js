
import { moveListItems, body, disableScroll, enableScroll } from "../files/my_datepicker.js";


//======Add class '_mobile' or '_pc' to body==================
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.
  test(navigator.userAgent)) {
  body.classList.add("_mobile");
} else {
  body.classList.add("_pc");
}

//======On/Off Services submenu in header-nav=================

//const servicesMenuLink = document.querySelectorAll('.services-menu')[0];
const servicesMenuList = document.querySelector('.services-menu__list');
const servicesMenuButton = document.querySelector('.services-menu__button');
const servicesMenuItems = [servicesMenuButton, servicesMenuList];

const showServicesMenu = (e) => {
  (e.target == servicesMenuButton) ?
    (servicesMenuItems.forEach(item => {
      item.classList.toggle('_show-services')
    })) :
    (servicesMenuItems.forEach(item => {
      item.classList.remove('_show-services')
    }));
};

document.addEventListener("click", showServicesMenu);

//==============================================================

//======On/Off search-form in header-action=================

const actionSearch = document.querySelectorAll('.action-search')[0];
const actionSearchForm = document.querySelectorAll('.header-search__form')[0];
const actionSearchInput = document.getElementById('action-search-input');

const showActionSearch = (e) => {
  (e.target == actionSearch) ?
    actionSearchForm.classList.toggle('_show-action-search-form')
    : (e.target == actionSearchInput) ? false
      : actionSearchForm.classList.remove('_show-action-search-form')
}

document.documentElement.addEventListener("click", showActionSearch);

//======Hamburger button=================

const hamburgerButton = document.querySelector(".icon-menu");
const menuList = document.querySelector(".menu__list");

hamburgerButton.addEventListener("click", () => {
  const currentState = hamburgerButton.getAttribute("data-state");

  if (!currentState || currentState == "closed") {
    hamburgerButton.setAttribute("data-state", "opened");
    hamburgerButton.setAttribute("aria-expanded", "true");
  } else {
    hamburgerButton.setAttribute("data-state", "closed");
    hamburgerButton.setAttribute("aria-expanded", "false");
  }
});

menuList.addEventListener("click", (e) => {

  let currentElement = e.target.closest(".menu__link");

  if (currentElement) {
    hamburgerButton.setAttribute("data-state", "closed");
    hamburgerButton.setAttribute("aria-expanded", "false");
  }
});

//==============================================================

//============Current year in footer copyright======================
const currentYearSpan = document.getElementById("copy");
const currentYear = new Date().getFullYear();

currentYearSpan.innerText = currentYear;

//==============================================================


//============Submit services list controls======================

//submit services list On/Off --------------

const submitServicesInput = document.querySelector('[name="submit-services"]');
const submitServicesList = document.querySelector(".submit-services__list");
const submitServices = document.querySelector(".submit-services");

submitServicesInput.addEventListener('focus', () => {
  submitServices.classList.add('services-input__active');
});

submitServicesInput.addEventListener('blur', () => {
  submitServicesList.classList.remove('services-list__visible');
  submitServices.classList.remove('services-arrow__down');
  submitServices.classList.remove('services-input__active');
});

//Add value of services-list-item to input-value --------------

const submitServicesItems = document.querySelectorAll(".services-list__item");
const selectedServiceInput = document.querySelector('[name="selected-service"]');

submitServicesItems.forEach(el => {
  el.addEventListener('click', function (e) {
    submitServicesInput.value = this.innerText;
    selectedServiceInput.value = this.innerText;

    e.stopPropagation();
  });
});

//Services-input down-arrow up & down --------------

submitServices.addEventListener('click', () => {
  submitServices.classList.toggle('services-arrow__down');
});

//Services popup -------------------------------------

const servicesListPopup = document.querySelector('.services-popup');
const appointmentServicesListMobile = document.querySelector(".services-content__list");
const appointmentServicesPopupContent = document.querySelector(".services-content");
const servicesPopupCloseBtn = document.querySelector(".services-content__close");

// appointmentServicesListMobile.insertAdjacentHTML('afterbegin', submitServicesList.innerHTML);

// appointmentServicesListMobile.childNodes.forEach(el => {
//   if (el.nodeType === Node.ELEMENT_NODE) {
//     el.classList.add('services-popuplist__item');
//     el.classList.remove('services-list__item');
//   };
// });

moveListItems(appointmentServicesListMobile, submitServicesList, 'services-popuplist__item', 'services-list__item');

//Open services-list in dropdown-list or in popup
submitServicesInput.addEventListener('click', function () {
  if (body.classList.contains("_pc")) {
    submitServicesList.classList.toggle("services-list__visible");
  } else {
    servicesListPopup.classList.add("showModal");
    disableScroll();
  }
});

//Close popup with services-list by close-button
servicesPopupCloseBtn.addEventListener('click', function (e) {

  servicesListPopup.classList.remove('showModal');
  enableScroll();
});

// Selecting a services-list item on mobile. Remember the selected value. Close popup

appointmentServicesListMobile.addEventListener('click', function (e) {

  const target = e.target;
  if (target.closest(".services-popuplist__item")) {
    servicesListPopup.classList.remove('showModal');
    submitServicesInput.value = target.innerText;
    selectedServiceInput.value = target.innerText;
    enableScroll();
  };

  e.stopPropagation();
});

//==============================================================


//==================== Add to packages-item class "_hovered" when it's hovered  ==============

const packagesItems = document.getElementsByClassName("packages__item");
const packagesList = document.querySelector(".packages__list");

//mute packages-items they are unhovered-------------------- 

packagesList.addEventListener('mouseover', (e) => {

  let currentElement = e.target.closest("article");
  if (currentElement) {
    for (const el of packagesItems) {
      el !== currentElement ?
        el.classList.add('_muted') :
        el.classList.remove('_muted');
    };
  };
});

//unmute packages-items when cursor leave packages-list--------------------
packagesList.addEventListener('mouseout', (e) => {
  for (const el of packagesItems) {
    el.classList.remove('_muted');
  };
});