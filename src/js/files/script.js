// Підключення функціоналу "Чертоги Фрілансера"
import { isMobile } from "./functions.js";
// Підключення списку активних модулів
import { flsModules } from "./modules.js";

//======On/Off Services submenu in header-nav=================

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

const buttons = document.querySelectorAll(".icon-menu");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const currentState = button.getAttribute("data-state");

    if (!currentState || currentState === "closed") {
      button.setAttribute("data-state", "opened");
      button.setAttribute("aria-expanded", "true");
    } else {
      button.setAttribute("data-state", "closed");
      button.setAttribute("aria-expanded", "false");
    }
  });
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
//console.log(submitInputs);
const requiredInputs = document.querySelectorAll('[data-input="required"]');

checkRequiredInputs();

//name input validation --------------

submitNameInput.addEventListener('input', nameInputValidation);

function nameInputValidation(e) {
  const regexp = /^\w+\s(\w+\s?){1,4}$/gi;
  const str = e.target.value;
  const result = regexp.test(str);
  (!result) ?
    submitNameInput.classList.add("input-invalid")
    : submitNameInput.classList.remove("input-invalid"),
    submitNameInput.classList.remove("empty"),
    checkRequiredInputs();
};

//phone input validation --------------
submitPhoneInput.addEventListener('input', phoneInputValidation);

function phoneInputValidation(e) {
  const regexp = /^\+\d{1,4}\(\d{1,5}\)\d{4,10}$/g;
  const str = e.target.value;
  const result = regexp.test(str);

  (!result) ?
    submitPhoneInput.classList.add("input-invalid")
    : submitPhoneInput.classList.remove("input-invalid"),
    submitPhoneInput.classList.remove("empty"),
    checkRequiredInputs();
};

//email input validation --------------
submitEmailInput.addEventListener('input', emailInputValidation);

function emailInputValidation(e) {

  const regexp = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
  const str = e.target.value;

  const result = regexp.test(str);

  (!result) ?
    submitEmailInput.classList.add("input-invalid")
    : submitEmailInput.classList.remove("input-invalid"),
    submitEmailInput.classList.remove("empty"),
    checkRequiredInputs();
};

//blocking the appointmentSubmitBtn if there are invalid inputs ---------------
function checkRequiredInputs() {
  const requiredInputsLength = requiredInputs.length;
  console.log(requiredInputsLength);
  let validInputsNumber = 0;
  requiredInputs.forEach(el => {
    (el.classList.contains('input-invalid') || el.classList.contains('empty')) ?
      null : validInputsNumber++;
  });
  console.log(validInputsNumber);

  requiredInputsLength == validInputsNumber ?
    appointmentSubmitBtn.disabled = false & appointmentSubmitBtn.classList.remove('appointment-btn__disabled') :
    appointmentSubmitBtn.disabled = true & appointmentSubmitBtn.classList.add('appointment-btn__disabled');
}

// if (appointmentSubmitBtn.disabled = true) { appointmentSubmitBtn.classList.add('appointment-btn__disabled') };
// if (appointmentSubmitBtn.disabled = false) { appointmentSubmitBtn.classList.remove('appointment-btn__disabled') };


//checking the submitted data in the form -----------------
console.log(appointmentForm);

appointmentForm.addEventListener('submit', e => {
  e.preventDefault();
  const formData = new FormData(appointmentForm);
  const values = Object.fromEntries(formData.entries());
  console.log('>>', values);
});


//show successfuly message after appointment submit -----------------

function createMessageUnder(elem, html) {

  let message = document.createElement('div');
  message.classList.add('submit-message__success');

  let coords = elem.getBoundingClientRect();
  console.log(coords);
  message.style.left = coords.left + 'px';
  message.style.top = coords.bottom + 'px';
  message.innerHTML = html;

  return message;
}

appointmentSubmitBtn.addEventListener('click', () => {
  let appointmentUnderMessage = createMessageUnder(appointmentForm, 'Your Appointment Is Successfuly');
  document.body.append(appointmentUnderMessage);
  setTimeout(() => appointmentUnderMessage.remove(), 4000);
});



// validation of required inputs by submit-button of form

// appointmentSubmitBtn.addEventListener('click', () => {
//   const regexpName = /^\w+\s(\w+\s?){1,4}$/gi;
//   const strName = submitNameInput.value;
//   const resultName = regexpName.test(strName);
//   (!resultName) ?
//     submitNameInput.classList.add("input-invalid")
//     : submitNameInput.classList.remove("input-invalid");

//   const regexpPhone = /^\+\d{1,4}\(\d{1,5}\)\d{1,10}$/g;
//   const strPhone = submitPhoneInput.value;
//   const resultPhone = regexpPhone.test(strPhone);

//   (!resultPhone) ?
//     submitPhoneInput.classList.add("input-invalid")
//     : submitPhoneInput.classList.remove("input-invalid");

//   const regexpEmail = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
//   const strEmail = submitEmailInput.value;

//   const resultEmail = regexpEmail.test(strEmail);

//   (!resultEmail) ?
//     submitEmailInput.classList.add("input-invalid")
//     : submitEmailInput.classList.remove("input-invalid");
// });

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
// const submitServices = document.querySelector(".submit-services");

submitServices.addEventListener('click', () => {
  submitServices.classList.toggle('services-arrow__down');
})
//==============================================================





