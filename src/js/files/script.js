// Підключення функціоналу "Чертоги Фрілансера"
import { isMobile } from "./functions.js";
// Підключення списку активних модулів
import { flsModules } from "./modules.js";

//======Вкл/Выкл субменю Services в header-nav=================

const servicesMenuLink = document.querySelectorAll('.services-menu')[0];
const servicesMenuSublist = document.querySelectorAll('.services-menu__list')[0];

const servicesMenuItems = [servicesMenuLink, servicesMenuSublist];

const showServicesMenu = (e) => {
  (e.target == servicesMenuLink) ?
    (servicesMenuItems.forEach(item => {
      item.classList.toggle('_show-services')
    })) :
    (servicesMenuItems.forEach(item => {
      item.classList.remove('_show-services')
    }))
}

document.addEventListener("click", showServicesMenu);

//==============================================================

//======Вкл/Выкл search-form в header-action=================

const actionSearch = document.querySelectorAll('.action-search')[0];
const actionSearchForm = document.querySelectorAll('.header-search__form')[0];
const actionSearchInput = document.getElementById('action-search-input');

const showActionSearch = (e) => {
  (e.target == actionSearch) ?
    actionSearchForm.classList.toggle('_show-action-search-form')
    : (e.target == actionSearchInput) ? false
      : actionSearchForm.classList.remove('_show-action-search-form')
}

document.addEventListener("click", showActionSearch);
