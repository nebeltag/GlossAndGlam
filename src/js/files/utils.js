export const indexPage = document.getElementsByClassName('indexPage')[0];
let cardPage;
// if (document.getElementsByClassName('indexPage')[0]) {
//   indexPage = document;
// }

// if (document.getElementsByClassName('cardPage')[0]) {
//   cardPage = document;
// }

// console.log(indexPage);
// console.log(cardPage);

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

export const basketCount = document.querySelector('.basket__count');
console.log(basketCount);

export function getBasketLocalStorage() {
  const cartDataJSON = localStorage.getItem('basket');
  return cartDataJSON ? JSON.parse(cartDataJSON) : [];
}

//======== Add producn id to Local storage =============

export function setBasketLocalStorage(basket) {
  localStorage.setItem('basket', JSON.stringify(basket));
  indexPage ? basketCount.textContent = basket.length : false;
};

//=============== Сhecking the relevance of data in Local storage ==========

export function checkingRelevanceValueBasket(productsData) {
  const basket = getBasketLocalStorage();

  basket.forEach((basketId, index) => {
    const existsInProducts = productsData.some(item => item.id === Number(basketId));
    if (!existsInProducts) {
      basket.splice(index, 1);
    };
  });

  setBasketLocalStorage(basket);
}