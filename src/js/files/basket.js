import { ERROR_SERVER, NO_ITEMS_CART, indexPage } from "./constants.js";
import {
  showErrorMessage,
  setBasketLocalStorage,
  getBasketLocalStorage,
  checkingRelevanceValueBasket
} from "./utils.js";

import { checkingActiveButtons } from "./load_packages.js";


const openBasketBtn = document.querySelector(".basket-link");
const basket = document.querySelector(".basket");
const closeBasketBtn = document.querySelector(".basket-header__closeBtn");

const basketSimplebarList = document.querySelector(".basket-list");
const basketProductsList = indexPage && basketSimplebarList.querySelector(".simplebar-content");

let productsData = [];

//----------- Open & close basket --------------------

indexPage && openBasketBtn.addEventListener("click", function () {
  basket.classList.toggle("_show-cart");
  getBasketProducts();
});

indexPage && closeBasketBtn.addEventListener("click", function () {
  basket.classList.remove("_show-cart");
});

function closeBasketByError() {
  basket.querySelector(".error").addEventListener("click", function () {
    basket.classList.remove("_show-cart")
  });
}
//----------------------------------------------------

// getProducts();

//-------- Get basket products --------------------
export async function getBasketProducts() {
  try {
    if (!productsData.length) {
      const res = await fetch('/files/data/packages.json');
      if (!res.ok) {
        throw new Error(res.statusText)
      };
      productsData = await res.json();
    };

    indexPage && loadProductBasket(productsData);

  } catch (err) {
    indexPage && showErrorMessage(ERROR_SERVER, "hero", "Back to homepage", basketProductsList);
    indexPage && closeBasketByError();
    console.log(err);
    return
  };
};

//------------- Loading of basket products ---------------

function loadProductBasket(data) {
  if (indexPage) basketProductsList.textContent = "";

  if (!data || !data.length) {
    showErrorMessage(ERROR_SERVER)
    return;
  };

  //checkingRelevanceValueBasket(data); -------отключено для переделки localStorage

  const basket = getBasketLocalStorage();
  console.log(basket);
  if (!basket || !basket.length) {
    showErrorMessage(NO_ITEMS_CART, "packages", "Back to packages list", basketProductsList);
    closeBasketByError();
    return;
  };

  const findProducts = data.filter(item => item = basket.includes(String(item.id)));

  //-------отключено для переделки localStorage
  // if (!findProducts.length) {
  //   showErrorMessage(NO_ITEMS_CART, "packages", "Back to packages list", basketProductsList);
  //   closeBasketByError();
  //   return;
  // };
  // renderProductsBasket(findProducts);
  //-------отключено для переделки localStorage
};

//---------- Remove product from basket -----------------------
indexPage && basketProductsList.addEventListener("click", delBasketProduct);

function delBasketProduct(event) {
  const targetButton = event.target.closest(".basket-item__delete");
  if (!targetButton) return;

  const card = targetButton.closest(".basket-list__item");
  const cardId = card.dataset.productId;
  const basket = getBasketLocalStorage();

  const newBasket = basket.filter(item => item !== cardId);
  setBasketLocalStorage(newBasket);

  getBasketProducts();
  setTimeout(() => { checkingActiveButtons(newBasket) }, 500);
};

//------------- Remove all products from basket ---------------
indexPage && basket.addEventListener("click", clearBasket);

function clearBasket(event) {
  const targetButton = event.target.closest(".clear-basket");
  if (!targetButton) return;

  localStorage.removeItem('basket');
  const newBasket = getBasketLocalStorage();

  getBasketProducts();
  setTimeout(() => { checkingActiveButtons(newBasket) }, 500);
}


//------------- Basket rendering ------------------------
function renderProductsBasket(arr) {
  arr.forEach(product => {
    const { id, title, price } = product;

    const productItem =
      `
      <li class="basket-list__item basket-item" data-product-id="${id}">
            <div class="basket-item__title">${title}</div>
            <div class="basket-item__handler item-handler">
              <div class="item-handler__wrp">
                <button type="button" class="item-handler__decrement _icon-drop-arrow"></button>
                <div class="item-handler__counter">1</div>
                <button type="button" class="item-handler__increment _icon-drop-arrow"></button>
              </div>
            </div>
            <div class="basket-item__sum"><span>&#36 ${price}</span></div>
            <button type="button" class="basket-item__delete"><span></span></button>
          </li>
      `;
    basketProductsList.insertAdjacentHTML("beforeend", productItem);
  });
};