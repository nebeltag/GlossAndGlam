
import { moveListItems, body, disableScroll, enableScroll } from "../files/my_datepicker.js";
import { indexPage } from "./constants.js";


//======Add class '_mobile' or '_pc' to body==================
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.
  test(navigator.userAgent)) {
  body.classList.add("_mobile");
} else {
  body.classList.add("_pc");
}

//======On/Off Services submenu in header-nav=================

const servicesMenuList = document.querySelector('.services-menu__list');
const servicesMenuButton = document.querySelector('.services-menu__button');
const servicesMenuItems = [servicesMenuButton, servicesMenuList];
const basketButton = document.querySelector('.basket-link');

const showServicesMenu = (e) => {
  (e.target.closest('.services-menu__button')) ?
    (servicesMenuItems.forEach(item => {
      item.classList.toggle('_show-services')
    })) :
    (servicesMenuItems.forEach(item => {
      item.classList.remove('_show-services')
    }));
};

indexPage && document.addEventListener("click", showServicesMenu);

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

indexPage && document.documentElement.addEventListener("click", showActionSearch);

//======Hamburger button=================

const hamburgerButton = document.querySelector(".icon-menu");
const menuList = document.querySelector(".menu__list");

if (hamburgerButton) {
  hamburgerButton.addEventListener("click", () => {
    const currentState = hamburgerButton.getAttribute("data-state");

    if (!currentState || currentState == "closed") {
      hamburgerButton.setAttribute("data-state", "opened");
      hamburgerButton.setAttribute("aria-expanded", "true");
    } else {
      hamburgerButton.setAttribute("data-state", "closed");
      hamburgerButton.setAttribute("aria-expanded", "false");
    };
  });
};

if (menuList) {
  menuList.addEventListener("click", (e) => {

    let currentElement = e.target.closest(".menu__link");

    if (currentElement) {
      hamburgerButton.setAttribute("data-state", "closed");
      hamburgerButton.setAttribute("aria-expanded", "false");
    };
  });
};

//==============================================================

//============Current year in footer copyright======================
const currentYearSpan = document.getElementById("copy");
const currentYear = new Date().getFullYear();

if (currentYearSpan) {
  currentYearSpan.innerText = currentYear;
};
//==============================================================


//============Submit services list controls======================

//submit services list On/Off --------------

const submitServicesInput = document.querySelector('[name="submit-services"]');
const submitServicesList = document.querySelector(".submit-services__list");
const submitServices = document.querySelector(".submit-services");

indexPage && submitServicesInput.addEventListener('focus', () => {
  submitServices.classList.add('services-input__active');
});

indexPage && submitServicesInput.addEventListener('blur', () => {
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


indexPage && submitServices.addEventListener('click', () => {
  submitServices.classList.toggle('services-arrow__down');
});

//Services popup -------------------------------------

const servicesListPopup = document.querySelector('.services-popup');
const appointmentServicesListMobile = document.querySelector(".services-content__list");
const appointmentServicesPopupContent = document.querySelector(".services-content");
const servicesPopupCloseBtn = document.querySelector(".services-content__close");

moveListItems(appointmentServicesListMobile, submitServicesItems, 'services-popuplist__item', 'services-list__item');

//Open services-list in dropdown-list or in popup

indexPage && submitServicesInput.addEventListener('click', function () {
  if (body.classList.contains("_pc")) {
    submitServicesList.classList.toggle("services-list__visible");
  } else {
    servicesListPopup.classList.add("showModal");
    disableScroll();
  };
});


//Close popup with services-list by close-button

indexPage && servicesPopupCloseBtn.addEventListener('click', function (e) {
  servicesListPopup.classList.remove('showModal');
  enableScroll();
});


// Selecting a services-list item on mobile. Remember the selected value. Close popup

indexPage && appointmentServicesListMobile.addEventListener('click', function (e) {

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
const packagesList = document.getElementById("packages-list");

//mute packages-items they are unhovered-------------------- 

indexPage && packagesList.addEventListener('mouseover', (e) => {
  let currentElement = e.target.closest("article");
  if (!currentElement) return;

  for (const el of packagesItems) {
    el !== currentElement ?
      el.classList.add('_muted') :
      el.classList.remove('_muted');
  };

});


//unmute packages-items when cursor leave packages-list--------------------

indexPage && packagesList.addEventListener('mouseout', (e) => {
  for (const el of packagesItems) {
    el.classList.remove('_muted');
  };
});
