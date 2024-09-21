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

//============Appointment form validation======================
const appointmentContainer = document.querySelector(".appointment__container");
const appointmentForm = document.forms["appointment"];
const submitNameInput = document.querySelector('[name="submit-name"]');
const submitPhoneInput = document.querySelector('[name="submit-phone"]');
const submitEmailInput = document.querySelector('[name="submit-email"]');
const appointmentSubmitBtn = appointmentForm.querySelector(".form-appointment__btn");
const submitInputs = appointmentForm.querySelectorAll('.submit-inputs__item input');

const appointmentValidatedInputs = appointmentForm.querySelectorAll('[data-input="validated__input"]');

//inputs regexps ----------------------
const emailRegexp = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
const nameRegexp = /^\w+\s(\w+\s?){1,4}$/gi;
const phoneRegexp = /^\+\d{1,4}\(\d{1,5}\)\d{4,10}$/g;

// inputs validation function---------
function inputsValidation(e, inputRegexp, validatedInputs, submitButton, disabledClass) {

  const input = e.target;
  //const inputRegexp = e.target.dataset.regexp;
  console.log(inputRegexp)
  const result = inputRegexp.test(input.value);

  (!result) ?
    input.classList.add("input-invalid")
    : input.classList.remove("input-invalid"),
    input.classList.remove("empty");

  checkValidatedInputs(disabledClass, submitButton, validatedInputs);
};

//blocking the appointmentSubmitBtn if there are invalid inputs ---------------

function checkValidatedInputs(disabledClass, submitButton, validatedInputs) {
  const validatedInputsLength = validatedInputs.length;
  console.log(validatedInputsLength);
  let validInputsNumber = 0;
  validatedInputs.forEach(el => {
    (el.classList.contains('input-invalid') || el.classList.contains('empty')) ?
      null : validInputsNumber++;
  });
  console.log(validInputsNumber);

  validatedInputsLength == validInputsNumber ?
    submitButton.disabled = false & submitButton.classList.remove(disabledClass) :
    submitButton.disabled = true & submitButton.classList.add(disabledClass);
};

checkValidatedInputs('appointment-btn__disabled', appointmentSubmitBtn, appointmentValidatedInputs);

//name input validation --------------

submitNameInput.addEventListener('input',
  (e) => inputsValidation(e, nameRegexp, appointmentValidatedInputs, appointmentSubmitBtn, 'appointment-btn__disabled'));

//phone input validation --------------

submitPhoneInput.addEventListener('input',
  (e) => inputsValidation(e, phoneRegexp, appointmentValidatedInputs, appointmentSubmitBtn, 'appointment-btn__disabled'));

//appointment email input validation --------------

submitEmailInput.addEventListener('input',
  (e) => inputsValidation(e, emailRegexp, appointmentValidatedInputs, appointmentSubmitBtn, 'appointment-btn__disabled'));


//checking the submitted data in the form -----------------
function checkSubmitData(e, formName) {
  e.preventDefault();
  const formData = new FormData(formName);
  const values = Object.fromEntries(formData.entries());
  console.log('>>', values);
}

//checking the submitted data in the appointment-form -----------------
appointmentForm.addEventListener('submit', (e) => checkSubmitData(e, appointmentForm));


//show successfuly message after appointment submit -----------------

function createMessageUnder(elem, html, coordsRatio) {

  let message = document.createElement('div');
  message.classList.add('submit-message__success');

  let coords = elem.getBoundingClientRect();
  console.log(coords);
  message.style.left = coords.left + 'px';
  message.style.top = coords.bottom * coordsRatio + 'px';
  message.innerHTML = html;

  return message;
}

appointmentSubmitBtn.addEventListener('click', () => {

  appointmentSubmitBtn.disabled = true & appointmentSubmitBtn.classList.add('appointment-btn__disabled');

  let appointmentUnderMessage = createMessageUnder(appointmentForm, 'Your Appointment Is Successfuly', 0.8);
  document.body.append(appointmentUnderMessage);
  setTimeout(() => appointmentUnderMessage.remove(), 2000);
  setTimeout(() => appointmentSubmitBtn.disabled = false &
    appointmentSubmitBtn.classList.remove('appointment-btn__disabled'), 2000);
});
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

//====================Subscribe email input validation ==============

const subscribeForm = document.forms["subscribe"];
const subscribeEmailInput = subscribeForm.querySelector(".subscribe-body__email");
const subscribeValidatedInputs = subscribeForm.querySelectorAll('[data-input="validated__input"]');
const subscribeSubmitBtn = subscribeForm.querySelector(".subscribe-body__button");

checkValidatedInputs('subscribe-btn__disabled', subscribeSubmitBtn, subscribeValidatedInputs);

subscribeEmailInput.addEventListener('input',
  (e) => inputsValidation(e, emailRegexp, subscribeValidatedInputs, subscribeSubmitBtn, 'subscribe-btn__disabled'));

//checking the submitted data in the subscribe-form -----------------
subscribeForm.addEventListener('submit', (e) => checkSubmitData(e, subscribeForm));

//show successfuly message after subscribe submit -----------------

subscribeSubmitBtn.addEventListener('click', () => {

  subscribeSubmitBtn.disabled = true & subscribeSubmitBtn.classList.add('subscribe-btn__disabled');

  let subscribeUnderMessage = createMessageUnder(subscribeForm, 'You are subscribed to newsletter', 0.8);
  document.body.append(subscribeUnderMessage);
  setTimeout(() => subscribeUnderMessage.remove(), 2000);
  setTimeout(() => subscribeSubmitBtn.disabled = false &
    subscribeSubmitBtn.classList.remove('subscribe-btn__disabled'), 2000);
});


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