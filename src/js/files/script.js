// Підключення функціоналу "Чертоги Фрілансера"
import { isMobile } from "./functions.js";
// Підключення списку активних модулів
import { flsModules } from "./modules.js";

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

submitServicesInput.addEventListener('click', () => {
  submitServicesList.classList.toggle('services-list__visible');
});

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
//==============================================================


//==================== Add to packages-item class "_hovered" when it's hovered  ==============

const packagesItems = document.querySelectorAll(".packages__item");
const packagesList = document.querySelector(".packages__list");

//mute packages-items that are unhovered-------------------- 

packagesList.addEventListener('mouseover', (e) => {

  let currentElement = e.target.closest("article");
  if (currentElement) {
    packagesItems.forEach(el => {
      el !== currentElement ?
        el.classList.add('_muted') :
        el.classList.remove('_muted');
    });
  };
});

//unmute packages-items when cursor leave packages-list--------------------
packagesList.addEventListener('mouseout', (e) => {
  packagesItems.forEach(el => {
    el.classList.remove('_muted');
  })
});