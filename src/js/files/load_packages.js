import {
  ERROR_SERVER,
  NO_PRODUCTS_IN_THIS_CATEGORY
} from "./constants.js";

import {
  showErrorMessage,
  getBasketLocalStorage,
  setBasketLocalStorage,
  basketCount,
  checkingRelevanceValueBasket
} from "./utils.js";


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
      <article data-product-id = ${id} class="packages__item item-packages">
        <div class="item-packages__body">
          <a href="/card.html?id=${id}" class="item-packages__link">
            <div class="item-packages__title">${title} ${id}</div>
            <div class="item-packages__price packages-price">
              <span class="packages-price__currency">$</span>
              <span class="packages-price__value">${price}</span>
            </div>
            <ul class="item-packages__list packages-sublist"></ul>
          </a>        
          <button type="button" class=" button item-packages__button card__add">Choose Plan</button>
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
  const id = card.dataset.productId;
  const basket = getBasketLocalStorage();

  if (basket.includes(id)) return;

  basket.push(id);
  setBasketLocalStorage(basket);
  checkingActiveButtons(basket);
};


export function checkingActiveButtons(basket) {
  const buttons = document.querySelectorAll('.card__add');

  buttons.forEach(el => {
    const card = el.closest('.item-packages');
    const id = card.dataset.productId;
    const isInBasket = basket.includes(id);

    el.disabled = isInBasket;
    el.classList.toggle('active', isInBasket);
    el.textContent = isInBasket ? 'Plan selected' : 'Choose plan';
  });
};

