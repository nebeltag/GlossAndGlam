import { indexPage } from "./constants.js";

//============Form validation======================
const appointmentForm = document.forms["appointment"];

//const appointmentValidatedInputs = appointmentForm.querySelectorAll('[data-regexp]');

//inputs regexps ----------------------
const emailRegexp = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
const nameRegexp = /^\w+\s(\w+\s?){1,4}$/i;
const phoneRegexp = /^\+\d{1,4}\(\d{1,5}\)\d{4,10}$/g;

// inputs validation function---------
function inputsValidation(currentInput, currentForm) {

  let input = currentInput;
  let regexpString = input.dataset.regexp;
  let regexpFlags = input.dataset.regexpFlags;
  let inputRegexp;
  console.log(regexpFlags)

  regexpFlags ?
    inputRegexp = new RegExp(`${regexpString}`, `${regexpFlags}`) :
    inputRegexp = new RegExp(`${regexpString}`);
  console.log(inputRegexp)

  const result = inputRegexp.test(input.value);

  (!result) ?
    input.classList.add("input-invalid")
    : input.classList.remove("input-invalid"),
    input.classList.remove("empty");

  checkValidatedInputs(currentForm);
};

//blocking the SubmitBtn if there are invalid inputs ---------------

function checkValidatedInputs(currentForm) {
  const submitButton = currentForm.querySelector('button[type="submit"]');
  const validatedInputs = currentForm.querySelectorAll('[data-regexp]');
  console.log(validatedInputs)
  const validatedInputsLength = validatedInputs.length;
  console.log(validatedInputsLength);
  let validInputsNumber = 0;
  validatedInputs.forEach(el => {
    (el.classList.contains('input-invalid') || el.classList.contains('empty')) ?
      null :
      validInputsNumber++;
  });
  console.log(validInputsNumber);

  validatedInputsLength === validInputsNumber
    ?
    submitButton.disabled = false
    :
    submitButton.disabled = true;
};


//checking the submitted data in the form -----------------
function checkSubmitData(e, formName) {
  e.preventDefault();
  const formData = new FormData(formName);
  const values = Object.fromEntries(formData.entries());
  console.log('>>', values);
}


//create successfuly message after form submit -----------------

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

//show successfuly message and disable submit button for 2 seconds after form submit

function showMessageUnder(form, message, coords) {

  form.addEventListener('click', (e) => {

    let currentElement = e.target;
    const submitButton = e.currentTarget.querySelector('button[type="submit"');

    if (currentElement.closest('button[type="submit"')) {
      let appointmentUnderMessage = createMessageUnder(form, message, coords);
      document.body.append(appointmentUnderMessage);
      setTimeout(() => appointmentUnderMessage.remove(), 2000);
      setTimeout(() => submitButton.disabled = true, 100);
      setTimeout(() => submitButton.disabled = false, 2000);
    };
  });
};



//============Appointmentform validation======================

//blocking the SubmitBtn if there are invalid inputs ---------------
indexPage && checkValidatedInputs(appointmentForm);


// inputs validation ---------

indexPage && appointmentForm.addEventListener('input', (e) => {

  let currentElement = e.target;

  if (currentElement.hasAttribute('data-regexp')) {
    inputsValidation(currentElement, appointmentForm);
  };
});



//checking the submitted data in a form -----------------

indexPage && appointmentForm.addEventListener('submit', (e) => checkSubmitData(e, appointmentForm));


//show successfuly message after appoitment submit -----------------
indexPage && showMessageUnder(appointmentForm, 'Your Appointment Is Successfuly', 0.83);
//==============================================================


//====================Subscribe email input validation ==============

const subscribeForm = document.forms["subscribe"];

//blocking the SubmitBtn if there are invalid inputs ---------------
indexPage && checkValidatedInputs(subscribeForm);

// inputs validation ---------

indexPage && subscribeForm.addEventListener('input', (e) => {

  let currentElement = e.target;

  if (currentElement.hasAttribute('data-regexp')) {
    inputsValidation(currentElement, subscribeForm);
  };
});


//checking the submitted data in the subscribe-form -----------------

indexPage && subscribeForm.addEventListener('submit', (e) => checkSubmitData(e, subscribeForm));


//show successfuly message after subscribe submit -----------------

indexPage && showMessageUnder(subscribeForm, 'You are subscribed to newsletter', 1);

