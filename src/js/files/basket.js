const openBasketBtn = document.querySelector(".basket-link");
const basket = document.querySelector(".basket");
const closeBasketBtn = document.querySelector(".basket-header__closeBtn");

openBasketBtn.addEventListener("click", function () {
  basket.classList.toggle("_show-cart");
});

closeBasketBtn.addEventListener("click", function () {
  basket.classList.remove("_show-cart");
});