//======= Error output =================

export function showErrorMessage(message) {
  const packagesList = document.querySelector('.packages__list');
  const msg =
    `<div class="error">
      <p>${message}</p>      
    </div>`;
  packagesList.insertAdjacentHTML('afterbegin', msg);
  console.log(message);
}

//======== Get id from Local storage =============

export function getBasketLocalStorage() {
  const cartDataJSON = localStorage.getItem('basket');
  return cartDataJSON ? JSON.parse(cartDataJSON) : [];
}

//======== Add producn id to Local storage =============

export function setBasketLocalStorage(basket) {
  const basketCount = document.querySelector('.basket__count');
  localStorage.setItem('basket', JSON.stringify(basket));
  basketCount.textContent = basket.length;
}