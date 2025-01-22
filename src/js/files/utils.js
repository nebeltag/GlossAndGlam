import { indexPage } from "./constants.js";

//======= Error output =================

export function showErrorMessage(message, linkHash, linkText, target) {

  const serverError = target.querySelector(".error");
  if (serverError) return;

  target.textContent == "";
  const msg =
    `<div class="error">
      <p>${message}</p>
      <a href="/#${linkHash}">${linkText}</a>      
    </div>`;

  target.insertAdjacentHTML('afterbegin', msg);
  console.log(message);
}

//======== Get id from Local storage =============

export const basketCount = document.querySelector('.basket__count');

export function getBasketLocalStorage() {
  const cartDataJSON = localStorage.getItem('basket');
  return cartDataJSON ? JSON.parse(cartDataJSON) : [];
}

//======== Add product id to Local storage =============

export function setBasketLocalStorage(basket) {
  localStorage.setItem('basket', JSON.stringify(basket));
  indexPage ? basketCount.textContent = basket.length : null;
};

//=============== Сhecking the relevance of data in Local storage ==========

export function checkingRelevanceValueBasket(productsData) {
  const basket = getBasketLocalStorage();

  basket.forEach((basketProduct, index) => {
    const existsInProducts = productsData.some(item => item.id === Number(basketProduct.id));
    if (!existsInProducts) {
      basket.splice(index, 1);
    };
  });
  setBasketLocalStorage(basket);
}

//================== Get products id, there are in basket ==============

export function getBasketProductsId(basket) {
  return basket.map(basketProducts => basketProducts.id);
};