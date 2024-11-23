import { PRODUCT_INFORMATION_NOT_FOUND, ERROR_SERVER } from "./constants.js";
import {
  showErrorMessage,
  checkingRelevanceValueBasket,
  getBasketLocalStorage
} from "./utils.js";
import { checkingActiveButtons } from "./load_packages.js";

const cardBody = document.getElementById('card-body');
let productsData = [];

const cardErrorArgs = [
  "packages",
  "Back to packages",
  cardBody
];


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

    console.log(productsData);

    loadProductsDetails(productsData);

  } catch (err) {
    cardBody && showErrorMessage(ERROR_SERVER, ...cardErrorArgs);
    console.log(err);
    return
  }
};

//------------ Take the parameter from the address bar ---------
function getParameterFromUrl(parameter) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(parameter);
};

function loadProductsDetails(data) {

  if (!data || !data.length) {
    cardBody && showErrorMessage(ERROR_SERVER, ...cardErrorArgs);
    return
  }

  checkingRelevanceValueBasket(data);

  const productId = Number(getParameterFromUrl('id'));
  console.log(productId);

  if (!productId) {
    cardBody && showErrorMessage(PRODUCT_INFORMATION_NOT_FOUND, ...cardErrorArgs);
    return;
  };

  const findProduct = data.find(card => card.id === productId);
  console.log(findProduct);
  if (!findProduct) {
    cardBody && showErrorMessage(PRODUCT_INFORMATION_NOT_FOUND, ...cardErrorArgs);
    return;
  };

  const basket = getBasketLocalStorage()
  renderInfoProduct(findProduct);
  checkingActiveButtons(basket);
};


//------------ Render products on card page ---------
function renderInfoProduct(product) {
  const { id, title, price, services, description } = product;

  const productItem =
    `
      <article data-product-id = ${id} class="packages__item item-packages packages-card__item" id="card">
          <div class="item-packages__body packages-card__body">
            
            <div class="item-packages__title packages-card__title">
              <h1>${title}</h1>
            </div>
            <div class="item-packages__price packages-price packages-card__price">
              <span class="packages-price__currency">$</span>
              <span class="packages-price__value">${price}</span>
            </div>
            <ul class="item-packages__list packages-sublist packages-card__sublist"></ul>
            <div class="packages-card__description">
              <p>${description}</P>
            </div>  
            <div class="packages-card__footer">
              <button type="button" class=" button button--transparent item-packages__button card__add">Choose Plan</button>
              <button type="button" class=" button button--transparent item-packages__button button--back card__exit">
              <a href="/#packages">Back to packages</a></button>
            </div>       
            
          </div>        
      </article>    
    `;

  cardBody && cardBody.insertAdjacentHTML('beforeend', productItem);

  services.forEach((service) => {
    const servicesItem =
      `<li class="packages-sublist__item _icon-check-mark">${service}</li>`;

    const packagesSublist = document.querySelector('.packages-sublist');
    packagesSublist && packagesSublist.insertAdjacentHTML('beforeend', servicesItem);
  });
};


//51:00

