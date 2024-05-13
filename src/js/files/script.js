// Підключення функціоналу "Чертоги Фрілансера"
import { isMobile } from "./functions.js";
// Підключення списку активних модулів
import { flsModules } from "./modules.js";

const servicesMenuLink = document.querySelectorAll('.services-menu');
const servicesMenuSublist = document.querySelectorAll('.services-menu__list');
console.log(servicesMenuLink[0]);
console.log(servicesMenuSublist[0]);

servicesMenuLink[0].addEventListener("click", function () {
  servicesMenuSublist[0].classList.toggle("_show");
})