import {
  ERROR_SERVER,
  NO_PRODUCTS_IN_THIS_CATEGORY,
  indexPage
} from "./constants.js";

import {
  showErrorMessage,
  getBasketLocalStorage,
  setBasketLocalStorage,
  basketCount,
  checkingRelevanceValueBasket,
  getBasketProductsId
} from "./utils.js";

import { getBasketProducts, basket } from "./basket.js";


const packagesCards = document.querySelector('.packages__list');
const cardBody = document.getElementById('card-body');
let productsData = [];

getProducts();

//============Get data from packages.json ==========================

async function getProducts() {
  try {
    if (!productsData.length) {
      const res = await fetch('/files/data/packages.json');
      if (!res.ok) {
        throw new Error(res.statusText)
      }
      productsData = await res.json();

    }

  } catch (err) {
    packagesCards && showErrorMessage(ERROR_SERVER, '', packagesCards);
    console.log(err);
    return
  }

  renderPackagesList(productsData);
};

//============Render packages card ==========================

function renderPackagesList(data) {
  if (!data || !data.length) {
    showErrorMessage(NO_PRODUCTS_IN_THIS_CATEGORY);
    return
  };
  createCard(data);

  const basket = getBasketLocalStorage();

  if (basketCount) {
    basketCount.textContent = basket.length;
  };

  checkingActiveButtons(basket);
  checkingRelevanceValueBasket(data);
};

//Create card 
function createCard(data) {
  data.forEach((card, ind) => {
    const { id, title, services, price } = card;

    const cardItem =
      `
      <article data-product-id = ${id} data-single-price="${price}" class="packages__item item-packages">
        <div class="item-packages__body">
          <a href="/card.html?id=${id}" class="item-packages__link">
            <div class="item-packages__title">
              <h3>${title}</h3>
            </div>
            <div class="item-packages__price packages-price">
              <span class="packages-price__currency">&#36</span>
              <span class="packages-price__value">${price}</span>
            </div>
            <ul class="item-packages__list packages-sublist"></ul>
          </a>        
          <button type="button" class=" button button--transparent item-packages__button card__add">Choose Plan</button>
        </div>        
      </article>    
      `
    if (packagesCards) {
      packagesCards.insertAdjacentHTML('beforeend', cardItem);
    };

    services.forEach((service) => {
      const servicesItem =
        `<li class="packages-sublist__item _icon-check-mark">${service}</li>`;

      const packagesSublist = document.querySelectorAll('.packages-sublist')[ind];
      if (packagesSublist) {
        packagesSublist.insertAdjacentHTML('beforeend', servicesItem);
      };
    });
  });
};

//=========== Get packages to basket ===================

packagesCards && packagesCards.addEventListener('click', handleCardClick);

cardBody && cardBody.addEventListener('click', handleCardClick);

function handleCardClick(e) {
  const targetButton = e.target.closest('.card__add');
  if (!targetButton) return;

  const card = targetButton.closest('.item-packages');
  if (!card) return;

  const price = card.dataset.singlePrice;
  const id = card.dataset.productId;
  const basket = getBasketLocalStorage();
  const basketProductsId = getBasketProductsId(basket);

  if (basketProductsId.includes(id)) return;

  //basket.push(id); //-------старый формат localStorage!!
  basket.push({ "id": id, "quantity": 1, "price": price });

  setBasketLocalStorage(basket);
  setTotalProductsValue();
  setTotalProductsPrice();
  getBasketProducts();

  setTimeout(() => { checkingActiveButtons(basket) }, 500);
};

//------------ Disable buttons in packages, that allready in cart  ---------
export function checkingActiveButtons(basket) {
  const buttons = document.querySelectorAll('.card__add');

  buttons.forEach(el => {
    const card = el.closest('.item-packages');
    if (!card) return;

    const id = card.dataset.productId;
    //const basketProductsId = getBasketProductsId(basket);
    const isInBasket = getBasketProductsId(basket).includes(id);
    el.disabled = isInBasket;
    el.classList.toggle('inactive', isInBasket);
    el.textContent = isInBasket ? 'Plan selected' : 'Choose plan';
  });
};

//-------------------------------------------------------

//-------------------- Set total values --------------------
export const basketTotalValue = indexPage && basket.querySelector(".basket-total__quantity span");
export const basketTotalPrice = indexPage && basket.querySelector(".basket-total__price span");

export function setTotalProductsValue() {
  const basket = getBasketLocalStorage();
  const productsTotalValue = basket.reduce((sum, current) => sum + current.quantity, 0);
  if (indexPage) basketTotalValue.innerText = productsTotalValue;
};

export function setTotalProductsPrice() {
  const basket = getBasketLocalStorage();
  const productsTotalPrice = basket.reduce((sum, current) => sum + current.quantity * current.price, 0);
  if (indexPage) basketTotalPrice.innerText = productsTotalPrice;
};

